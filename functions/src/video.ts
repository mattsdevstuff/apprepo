
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { getFirestore } from 'firebase-admin/firestore';
import { GoogleAuth } from 'google-auth-library';
import axios, { AxiosError } from 'axios';

const PROJECT_ID = process.env.GCLOUD_PROJECT || "app-project-468120";
const LOCATION_ID = 'us-central1';
const API_ENDPOINT = 'us-central1-aiplatform.googleapis.com';
const MODEL_ID = 'veo-2.0-generate-001';

async function getAccessToken() {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/cloud-platform'
  });
  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();
  return accessToken.token;
}

interface Instance {
    prompt: string;
    image?: {
        bytesBase64Encoded: string;
    };
}

export const startVideoGeneration = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'The user is not authenticated.');
  }
  const uid = request.auth.uid;
  const { prompt, imageBase64, aspectRatio } = request.data;

  if (!prompt || typeof prompt !== 'string') {
    throw new HttpsError('invalid-argument', 'The function requires a "prompt" argument of type string.');
  }
  if (!aspectRatio || typeof aspectRatio !== 'string') {
      throw new HttpsError('invalid-argument', 'The function requires an "aspectRatio" argument of type string.');
  }

  try {
    const accessToken = await getAccessToken();
    const url = `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/publishers/google/models/${MODEL_ID}:predictLongRunning`;

    // Construct the instance payload, adding the image if it exists
    const instance: Instance = { prompt };
    if (imageBase64 && typeof imageBase64 === 'string') {
        instance.image = { bytesBase64Encoded: imageBase64 };
    }

    const requestBody = {
      instances: [instance],
      parameters: {
        "aspectRatio": aspectRatio, // Use the aspect ratio from the client
        "sampleCount": 1,
        "durationSeconds": "8",
        "personGeneration": "allow_all",
        "enablePromptRewriting": true,
        "addWatermark": true,
        "includeRaiReason": true,
        "resolution": "720p",
      }
    };

    const response = await axios.post(url, requestBody, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const operationId = response.data.name;

    if (!operationId) {
      throw new HttpsError('internal', 'Did not receive an operation ID from Vertex AI.');
    }

    // Store the operation ID in Firestore
    const db = getFirestore();
    await db.collection('users').doc(uid).collection('operations').doc(operationId).set({
      status: 'processing',
      createdAt: new Date(),
      prompt: prompt
    });

    return { operationId };

  } catch (error: unknown) {
    console.error('Error starting video generation:', error);
    let errorMessage = 'An unknown error occurred.';
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        errorMessage = axiosError.response?.data?.error?.message || axiosError.message;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }
    throw new HttpsError('internal', `Failed to start video generation: ${errorMessage}`);
  }
});

export const checkVideoGenerationStatus = onCall(async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'The user is not authenticated.');
    }

    const operationName = request.data.operationName;
    if (!operationName || typeof operationName !== 'string') {
      throw new HttpsError('invalid-argument', 'The function requires an "operationName" argument of type string.');
    }

    try {
      const accessToken = await getAccessToken();
      const url = `https://${API_ENDPOINT}/v1/${operationName}`;

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;

    } catch (error: unknown) {
      console.error('Error checking video generation status:', error);
      let errorMessage = 'An unknown error occurred.';
      if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<any>;
          errorMessage = axiosError.response?.data?.error?.message || axiosError.message;
      } else if (error instanceof Error) {
          errorMessage = error.message;
      }
      throw new HttpsError('internal', `Failed to check video generation status: ${errorMessage}`);
    }
  });