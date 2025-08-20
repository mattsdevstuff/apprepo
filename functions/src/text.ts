
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import { VertexAI } from '@google-cloud/vertexai';

const PROJECT_ID = process.env.GCLOUD_PROJECT || "app-project-468120";
const LOCATION = 'us-central1';

const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const generativeModel = vertexAI.getGenerativeModel({
  model: 'gemini-1.0-pro-001',
});

export const generateText = onCall(async (request) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'The user is not authenticated.');
    }
  
    const idea = request.data.idea;
    if (!idea || typeof idea !== 'string') {
      throw new HttpsError('invalid-argument', 'The function requires an "idea" argument of type string.');
    }

    const prompt = `Generate a short, engaging YouTube Shorts video prompt based on the following idea: "${idea}". The prompt should be suitable for a text-to-video AI model.`;
  
    try {
      const result = await generativeModel.generateContent(prompt);
      if (!result.response.candidates || result.response.candidates.length === 0) {
        throw new Error('No candidates received from the model.');
      }
      const text = result.response.candidates[0].content.parts[0].text;
      if (!text) {
        throw new Error('No text received from the model.');
      }
      return { text };
    } catch (error: unknown) {
      console.error('Error generating text with Vertex AI:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      throw new HttpsError('internal', `Failed to generate text: ${errorMessage}`);
    }
  });
