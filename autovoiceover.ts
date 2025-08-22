


/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as DOM from './dom';
import { generateVoiceoverApi } from './api';

let currentVideoSource: File | null = null;
let currentVideoUrl: string | null = null;

function resetUI() {
    if (!DOM.voiceoverMainPanel || !DOM.voiceoverActionPanel || !DOM.voiceoverProcessingPanel || !DOM.voiceoverResultsPanel || !DOM.voiceoverPreviewVideo || !DOM.voiceoverPreviewPlaceholder || !DOM.voiceoverFileInput || !DOM.voiceoverUrlInput || !DOM.voiceoverFileName || !DOM.generateVoiceoverButton || !DOM.voiceoverFinalVideo || !DOM.voiceoverProcessingVideo || !DOM.voiceoverGeneratedScript) return;

    currentVideoSource = null;
    currentVideoUrl = null;
    
    // Show input panels
    DOM.voiceoverMainPanel.style.display = 'flex';
    DOM.voiceoverActionPanel.style.display = 'flex';

    // Hide progress and results
    DOM.voiceoverProcessingPanel.style.display = 'none';
    DOM.voiceoverResultsPanel.style.display = 'none';

    // Reset preview
    DOM.voiceoverPreviewVideo.src = '';
    DOM.voiceoverPreviewVideo.style.display = 'none';
    DOM.voiceoverPreviewPlaceholder.style.display = 'block';

    // Reset inputs
    DOM.voiceoverFileInput.value = '';
    DOM.voiceoverUrlInput.value = '';
    DOM.voiceoverFileName.textContent = '';
    
    // Reset generate button
    DOM.generateVoiceoverButton.disabled = true;

    // Reset final and processing videos
    DOM.voiceoverFinalVideo.src = '';
    DOM.voiceoverProcessingVideo.pause();
    DOM.voiceoverProcessingVideo.removeAttribute('src');
    DOM.voiceoverGeneratedScript.textContent = '';
}

function updateProgress(step: number, message: string) {
    if (!DOM.voiceoverProcessingPanel || !DOM.voiceoverStatusMessage) return;

    DOM.voiceoverStatusMessage.textContent = message;

    const steps = DOM.voiceoverProcessingPanel.querySelectorAll<HTMLDivElement>('.progress-step');
    steps.forEach(stepEl => {
        const stepNumber = parseInt(stepEl.dataset.step || '0', 10);
        stepEl.classList.remove('active', 'completed');
        if (stepNumber < step) {
            stepEl.classList.add('completed');
        } else if (stepNumber === step) {
            stepEl.classList.add('active');
        }
    });
}

function handleFileSelect(file: File | null) {
    if (!file || !DOM.voiceoverPreviewVideo || !DOM.voiceoverPreviewPlaceholder || !DOM.generateVoiceoverButton || !DOM.voiceoverFileName) return;
    
    if (!file.type.startsWith('video/')) {
        alert('Please select a valid video file.');
        return;
    }
    
    // Simple size check (e.g., 20MB from HTML)
    if (file.size > 20 * 1024 * 1024) {
        alert('File is too large. Please select a video under 20MB.');
        return;
    }

    currentVideoSource = file;
    currentVideoUrl = URL.createObjectURL(file);
    DOM.voiceoverPreviewVideo.src = currentVideoUrl;
    DOM.voiceoverPreviewVideo.style.display = 'block';
    DOM.voiceoverPreviewPlaceholder.style.display = 'none';
    DOM.generateVoiceoverButton.disabled = false;
    DOM.voiceoverFileName.textContent = file.name;
}

async function handleGenerateClick() {
    if (!currentVideoUrl) {
        alert('Please provide a video source first.');
        return;
    }

    if (!DOM.voiceoverMainPanel || !DOM.voiceoverActionPanel || !DOM.voiceoverProcessingPanel || !DOM.voiceoverResultsPanel || !DOM.generateVoiceoverButton || !DOM.voiceoverProcessingVideo || !DOM.voiceoverPreviewVideo || !DOM.voiceoverGeneratedScript) return;
    
    // Update UI to show progress
    DOM.voiceoverMainPanel.style.display = 'none';
    DOM.voiceoverActionPanel.style.display = 'none';
    DOM.voiceoverProcessingPanel.style.display = 'block';
    DOM.generateVoiceoverButton.disabled = true;

    // Set up and play the processing video
    DOM.voiceoverProcessingVideo.src = DOM.voiceoverPreviewVideo.src;
    
    // Set aspect ratio of container
    const videoContainer = DOM.voiceoverProcessingVideo.parentElement as HTMLDivElement;
    if (videoContainer) {
        const setAspectRatio = () => {
            if (!DOM.voiceoverProcessingVideo) return;
            const video = DOM.voiceoverProcessingVideo;
            const aspectRatio = video.videoWidth / video.videoHeight;
            if (isFinite(aspectRatio)) {
                 videoContainer.style.aspectRatio = `${aspectRatio}`;
            }
            video.removeEventListener('loadedmetadata', setAspectRatio);
        };
        DOM.voiceoverProcessingVideo.addEventListener('loadedmetadata', setAspectRatio);
    }

    DOM.voiceoverProcessingVideo.play().catch(console.error);


    try {
        updateProgress(0, 'Initializing...');
        // Pass the URL to the API
        const result = await generateVoiceoverApi(currentVideoUrl, updateProgress);
        
        // Show results
        if (DOM.voiceoverFinalVideo) DOM.voiceoverFinalVideo.src = result.finalVideoUrl;
        if (DOM.voiceoverDownloadButton) DOM.voiceoverDownloadButton.href = result.finalVideoUrl;
        DOM.voiceoverGeneratedScript.textContent = result.script;
        
        DOM.voiceoverProcessingPanel.style.display = 'none';
        DOM.voiceoverResultsPanel.style.display = 'block';

    } catch (error) {
        console.error('Voiceover generation failed:', error);
        alert(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
        resetUI(); // Go back to start on error
    } finally {
        // Stop the processing video when done
        if (DOM.voiceoverProcessingVideo) {
            DOM.voiceoverProcessingVideo.pause();
        }
    }
}

export function initAutoVoiceover() {
    // Tab switching logic
    DOM.voiceoverUploadTab?.addEventListener('click', () => {
        DOM.voiceoverUploadTab?.classList.add('active');
        DOM.voiceoverUrlTab?.classList.remove('active');
        if (DOM.voiceoverUploadContent) DOM.voiceoverUploadContent.style.display = 'block';
        if (DOM.voiceoverUrlContent) DOM.voiceoverUrlContent.style.display = 'none';
    });
    
    DOM.voiceoverUrlTab?.addEventListener('click', () => {
        DOM.voiceoverUrlTab?.classList.add('active');
        DOM.voiceoverUploadTab?.classList.remove('active');
        if (DOM.voiceoverUrlContent) DOM.voiceoverUrlContent.style.display = 'block';
        if (DOM.voiceoverUploadContent) DOM.voiceoverUploadContent.style.display = 'none';
    });

    // File input handling (click)
    DOM.voiceoverFileInput?.addEventListener('change', (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) handleFileSelect(file);
    });

    // Drag and drop handling
    DOM.voiceoverFileDropZone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        DOM.voiceoverFileDropZone?.classList.add('hover');
    });
    DOM.voiceoverFileDropZone?.addEventListener('dragleave', () => {
        DOM.voiceoverFileDropZone?.classList.remove('hover');
    });
    DOM.voiceoverFileDropZone?.addEventListener('drop', (e) => {
        e.preventDefault();
        DOM.voiceoverFileDropZone?.classList.remove('hover');
        const file = e.dataTransfer?.files?.[0];
        if (file) handleFileSelect(file);
    });

    // URL input handling
    DOM.voiceoverUrlInput?.addEventListener('input', () => {
        const url = DOM.voiceoverUrlInput?.value.trim() || '';
        // Very basic URL validation for UI feedback
        if (url.startsWith('http')) {
            // For simulation, we can't actually use the youtube URL for preview,
            // but we can enable the button.
            // In a real app, you might validate more strictly.
            currentVideoUrl = url;
            if(DOM.generateVoiceoverButton) DOM.generateVoiceoverButton.disabled = false;
            // Note: Previewing a YouTube URL directly is complex due to CORS etc.
            // This simulation will focus on the file upload flow for visual feedback.
        } else {
            currentVideoUrl = null;
            if(DOM.generateVoiceoverButton) DOM.generateVoiceoverButton.disabled = true;
        }
    });

    // Main action button
    DOM.generateVoiceoverButton?.addEventListener('click', handleGenerateClick);

    // Results panel actions
    DOM.voiceoverStartOverButton?.addEventListener('click', resetUI);
}
