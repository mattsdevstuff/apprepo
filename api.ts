/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { GeneratedVideo } from './types';
import { sleep } from './utils';
import * as DOM from './dom';

// --- API Calls (Now proxied through our backend) ---
export async function generateContentApi(prompt: string, imageBase64: string, aspectRatio: string): Promise<GeneratedVideo[]> {

    try {
        // 1. Start the generation via our backend
        console.log('[BFF] Sending generation request to server...');
        const startResponse = await fetch('/api/generate-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: prompt,
                imageBase64: imageBase64,
                aspectRatio: aspectRatio,
            }),
        });

        if (!startResponse.ok) {
            const errorData = await startResponse.json().catch(() => ({}));
            throw new Error(`Server Error (${startResponse.status}): ${errorData?.error?.message || startResponse.statusText}`);
        }

        const { pollUrl } = await startResponse.json();
        if (!pollUrl) {
            throw new Error("Server did not return a valid poll URL.");
        }
        
        console.log(`[BFF] Video generation started. Polling at: ${pollUrl}`);

        // 2. Poll our backend for the result
        let result: any;
        let pollCount = 0;
        const maxPolls = 60; // Poll for a max of 5 minutes (60 polls * 5s interval)
        const pollInterval = 5000;
        
        while (pollCount < maxPolls) {
            pollCount++;

            const pollStatus = `Generation in progress... (Polling ${pollCount}/${maxPolls})`;
            console.log(`[BFF] ${pollStatus}`);
            const statusPara = DOM.statusEl?.querySelector('p');
            if (statusPara) {
                statusPara.textContent = pollStatus;
            }

            const pollResponse = await fetch(pollUrl);

            if (!pollResponse.ok) {
                const errorData = await pollResponse.json().catch(() => ({}));
                throw new Error(`Polling failed (${pollResponse.status}): ${errorData?.error?.message || pollResponse.statusText}`);
            }

            result = await pollResponse.json();

            if (result.done) {
                console.log("[BFF] Polling complete. Operation finished.", result);

                if (result.error) {
                    throw new Error(`Video generation failed: ${result.error.message || 'Unknown error'}`);
                }
                
                const videos = result.response?.generatedVideos || [];

                if (videos.length === 0) {
                    throw new Error("API operation finished but returned no videos. The prompt may have been filtered for safety.");
                }

                console.log(`[BFF] Successfully received ${videos.length} video(s).`);
                return videos;
            }

            await sleep(pollInterval);
        }

        throw new Error(`Video generation timed out after ${maxPolls * pollInterval / 1000 / 60} minutes.`);

    } catch (error) {
        console.error("[BFF] API Call failed.", error);
        throw error;
    }
}

export async function generatePromptApi(idea: string): Promise<string> {
    const response = await fetch('/api/generate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Server Error (${response.status}): ${errorData?.error?.message || response.statusText}`);
    }
    
    const { text: generatedPrompt } = await response.json();
    if (!generatedPrompt) {
        throw new Error('The AI returned an empty response. Please try a different idea.');
    }
    return generatedPrompt;
}
