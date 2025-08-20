
import {
    getFunctions,
    httpsCallable,
  } from 'firebase/functions';
import { app } from './firebaseConfig';

const functions = getFunctions(app);

// Callable functions
const startVideoGeneration = httpsCallable(functions, 'startVideoGeneration');
const checkVideoGenerationStatus = httpsCallable(functions, 'checkVideoGenerationStatus');
const generateText = httpsCallable(functions, 'generateText'); // Assuming a function named 'generateText'

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
