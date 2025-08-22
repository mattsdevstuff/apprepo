

import {
    getFunctions,
    httpsCallable,
  } from 'firebase/functions';
import { app } from './firebaseConfig';

const functions = getFunctions(app);

// Callable functions
const startVideoGeneration = httpsCallable(functions, 'startVideoGeneration');
const checkVideoGenerationStatus = httpsCallable(functions, 'checkVideoGenerationStatus');
const generateText = httpsCallable(functions, 'generateText');
const getCreditsFunction = httpsCallable(functions, 'getCredits');
const createStripeCheckoutSessionFunction = httpsCallable(functions, 'createStripeCheckoutSession');


async function poll(operationName: string, onProgress: (status: string) => void): Promise<any> {
    let result: any;
    let pollCount = 0;
    const maxPolls = 60; // Poll for a max of 5 minutes (60 polls * 5s interval)
    const pollInterval = 5000;
    
    while (pollCount < maxPolls) {
        pollCount++;

        const pollStatus = `Generation in progress... (Polling ${pollCount}/${maxPolls})`;
        console.log(`[BFF] ${pollStatus}`);
        onProgress(pollStatus);

        const { data } = await checkVideoGenerationStatus({ operationName });
        result = data;

        if (result.done) {
            console.log("[BFF] Polling complete. Operation finished.", result);

            if (result.error) {
                throw new Error(`Video generation failed: ${result.error.message || 'Unknown error'}`);
            }
            
            // The response from a video generation operation is an array of predictions
            const videos = result.response?.predictions || [];

            if (videos.length === 0) {
                throw new Error("API operation finished but returned no videos. The prompt may have been filtered for safety.");
            }

            console.log(`[BFF] Successfully received ${videos.length} video(s).`);
            return videos;
        }

        await new Promise(resolve => setTimeout(resolve, pollInterval));
    }

    throw new Error(`Video generation timed out after ${maxPolls * pollInterval / 1000 / 60} minutes.`);
}

export async function generateContentApi(
    prompt: string, 
    imageBase64: string,
    aspectRatio: string,
    onProgress: (status: string) => void
): Promise<any> {
    try {
        console.log('[BFF] Sending generation request to server...');
        const { data } = await startVideoGeneration({ prompt, imageBase64, aspectRatio });
        const operationId = data.operationId;

        if (!operationId) {
            throw new Error("Server did not return a valid operation ID.");
        }
        
        console.log(`[BFF] Video generation started. Polling with operation ID: ${operationId}`);

        return await poll(operationId, onProgress);
    } catch (error) {
        console.error("[BFF] API Call failed.", error);
        throw error;
    }
}

export async function generatePromptApi(idea: string): Promise<string> {
    try {
        const { data } = await generateText({ idea });
        const generatedPrompt = (data as any).text;

        if (!generatedPrompt) {
            throw new Error('The AI returned an empty response. Please try a different idea.');
        }
        return generatedPrompt;
    } catch (error) {
        console.error("[BFF] Text Generation API Call failed.", error);
        throw error;
    }
}

export async function getCredits(): Promise<number> {
    try {
        const { data } = await getCreditsFunction();
        return (data as any).credits as number;
    } catch (error) {
        console.error("Error fetching credits via callable function:", error);
        throw new Error("Failed to fetch credits");
    }
}

export async function createStripeCheckoutSession(priceId: string): Promise<string> {
    try {
        const { data } = await createStripeCheckoutSessionFunction({ priceId });
        const sessionId = (data as any).sessionId;
        if (!sessionId) {
            throw new Error('Server did not return a session ID.');
        }
        return sessionId;
    } catch (error) {
        console.error("[BFF] Stripe checkout session creation failed.", error);
        throw error;
    }
}

/**
 * [REAL IMPLEMENTATION GUIDE]
 * This function simulates the backend process for generating an AI voiceover.
 * The actual implementation should be a single API call to a backend endpoint
 * (e.g., a Google Cloud Function) that performs the steps outlined below.
 *
 * @param {string} videoUrl - A Blob URL for the video file uploaded by the user.
 *                            The backend will receive this as a file upload.
 * @param {function} onProgress - A callback function to update the frontend UI.
 *                                The backend should use a long-polling or WebSocket
 *                                mechanism to provide real-time progress updates.
 * @returns {Promise<{finalVideoUrl: string, script: string}>} A promise that resolves
 *          to an object containing the URL of the final video and the generated script.
 */
export async function generateVoiceoverApi(
    videoUrl: string,
    onProgress: (step: number, message: string) => void
): Promise<{ finalVideoUrl: string; script: string }> {
    console.log('[BFF] Simulating Auto Voiceover generation for URL:', videoUrl);

    // ==================================================================================
    // ==                  BACKEND IMPLEMENTATION BLUEPRINT START                      ==
    // ==================================================================================
    // The following comments describe the steps a backend developer should take to
    // replace this simulation with a real implementation.

    // --- STEP 1: Backend Endpoint and File Upload ---
    // Create a secure backend endpoint (e.g., an HTTP-triggered Cloud Function)
    // that accepts a multipart/form-data POST request with the video file.
    // 1a. On receiving the file, upload it to a temporary bucket in Google Cloud Storage (GCS).
    //     This provides a stable URI for other services to access.

    // --- STEP 2: Video Analysis with Gemini ---
    // Use the @google/genai SDK on your server to analyze the video content.
    // 2a. Provide the GCS URI of the uploaded video to the Gemini model.
    // 2b. Use a prompt designed to extract a narrative description.
    //
    // Example (using @google/genai on Node.js):
    // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // const videoPart = { inlineData: { mimeType: 'video/mp4', data: videoBase64String }};
    // const prompt = "Analyze this video and provide a concise, engaging description of the visual narrative, key actions, and overall mood. This description will be used to write a voiceover script."
    // const response = await ai.models.generateContent({
    //   model: 'gemini-2.5-flash',
    //   contents: { parts: [videoPart, {text: prompt}] },
    // });
    // const videoDescription = response.text;

    // --- STEP 3: Script Generation with Gemini ---
    // Use the description from Step 2 to generate a voiceover script.
    //
    // Example:
    // const scriptPrompt = `Based on the following video description, write a captivating voiceover script of about 150 words. The tone should be cinematic and inspiring. Description: "${videoDescription}"`;
    // const scriptResponse = await ai.models.generateContent({
    //   model: 'gemini-2.5-flash',
    //   contents: scriptPrompt
    // });
    // const generatedScript = scriptResponse.text;

    // --- STEP 4: Audio Generation with Google Cloud Text-to-Speech ---
    // Use the Google Cloud Text-to-Speech API to convert the script into an audio file.
    // 4a. Send the generated script text to the API.
    // 4b. Choose a suitable voice and language.
    // 4c. Save the resulting audio data (e.g., MP3) to the GCS bucket.
    // See: https://cloud.google.com/text-to-speech/docs/create-audio

    // --- STEP 5: Merging Video and Audio with FFMPEG ---
    // This process is CPU-intensive and should be done on the backend, for example,
    // in the same Cloud Function or a dedicated one. FFMPEG must be available in the
    // execution environment.
    // 5a. Download the original video and the generated audio from GCS to the
    //     function's local filesystem.
    // 5b. Execute the FFMPEG command to merge them.
    //
    // Example FFMPEG command:
    // ffmpeg -i original_video.mp4 -i generated_audio.mp3 -c:v copy -map 0:v:0 -map 1:a:0 -shortest final_video.mp4
    //
    // Command Breakdown:
    // -i original_video.mp4  : Input file 1 (the user's video).
    // -i generated_audio.mp3 : Input file 2 (the AI-generated voiceover).
    // -c:v copy              : Copy the video stream without re-encoding (fast and preserves quality).
    // -map 0:v:0             : Map the video stream from the first input (0:v:0).
    // -map 1:a:0             : Map the audio stream from the second input (1:a:0), replacing any original audio.
    // -shortest              : Finish encoding when the shortest input stream ends (the video).
    //
    // 5c. Upload the resulting 'final_video.mp4' to a permanent GCS bucket.

    // --- STEP 6: Return the Final Result ---
    // 6a. Generate a publicly accessible or signed URL for the final video in GCS.
    // 6b. Return a JSON response to the frontend containing the signed URL and the
    //     generated script.
    //
    // Example Response:
    // res.status(200).json({
    //   finalVideoUrl: "https://storage.googleapis.com/...",
    //   script: "In a world of digital creation..."
    // });

    // ==================================================================================
    // ==                   BACKEND IMPLEMENTATION BLUEPRINT END                       ==
    // ==================================================================================
    
    // --- START FRONTEND SIMULATION ---
    // The code below simulates the asynchronous nature and progress updates of the backend process.
    // This should be REMOVED when the real backend is implemented.
    await new Promise(resolve => setTimeout(resolve, 2000));
    onProgress(1, 'Analyzing Video...');
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    onProgress(2, 'Writing Script...');
    const generatedScript = "In a world of digital creation, one tool stands to change everything. Witness the power of AI as it transforms simple clips into cinematic masterpieces. This isn't just editing; it's the future of storytelling, right at your fingertips.";

    await new Promise(resolve => setTimeout(resolve, 3000));
    onProgress(3, 'Generating Audio...');

    await new Promise(resolve => setTimeout(resolve, 4000));
    onProgress(4, 'Finalizing Video...');

    // In a real scenario, the backend would return a URL to the NEW video.
    // For this simulation, we return the original video URL to demonstrate the flow.
    const finalVideoUrl = videoUrl; 
    
    return { finalVideoUrl, script: generatedScript };
    // --- END FRONTEND SIMULATION ---
}