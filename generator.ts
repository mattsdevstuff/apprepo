/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { generateContentApi, generatePromptApi } from './api';
import * as DOM from './dom';
import * as State from './state';
import { GeneratedVideo, SavedClip } from './types';
import { setUILoading, displayError, updateStudioNotification } from './ui';
import { blobToBase64 } from './utils';

function createVideoCard(savedClip: SavedClip): HTMLDivElement {
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';

    const videoEl = document.createElement('video');
    videoEl.src = savedClip.url;
    videoEl.autoplay = true;
    videoEl.loop = true;
    videoEl.controls = false;
    videoEl.muted = true;

    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'video-actions';

    const downloadBtn = document.createElement('button');
    downloadBtn.innerText = 'Download';
    downloadBtn.className = 'video-action-button';
    downloadBtn.onclick = () => {
        const a = document.createElement('a');
        a.href = savedClip.url;
        a.download = `video-${Date.now()}.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const addToStudioBtn = document.createElement('button');
    addToStudioBtn.innerText = 'Add to Editor';
    addToStudioBtn.className = 'video-action-button add-to-editor-btn';
    addToStudioBtn.dataset.clipId = String(savedClip.id);

    if (State.savedClips.some(c => c.id === savedClip.id)) {
        addToStudioBtn.innerText = 'Added ✓';
        addToStudioBtn.disabled = true;
    }

    addToStudioBtn.onclick = () => {
        if (!State.savedClips.some(c => c.id === savedClip.id)) {
            State.addSavedClip(savedClip);
            State.incrementNewClipsCount();
            updateStudioNotification();
        }
        
        document.querySelectorAll(`.add-to-editor-btn[data-clip-id='${savedClip.id}']`).forEach(btn => {
            (btn as HTMLButtonElement).innerText = 'Added ✓';
            (btn as HTMLButtonElement).disabled = true;
        });
    };

    actionsContainer.appendChild(downloadBtn);
    actionsContainer.appendChild(addToStudioBtn);
    videoContainer.appendChild(videoEl);
    videoContainer.appendChild(actionsContainer);
    return videoContainer;
}

async function handleGenerationSuccess(videos: GeneratedVideo[]) {
    if (DOM.galleryPlaceholder) DOM.galleryPlaceholder.style.display = 'none';
    
    if (DOM.statusEl) {
      DOM.statusEl.innerHTML = '';
      DOM.statusEl.style.display = 'block';
    }

    if (videos.length === 0) {
        if (DOM.statusEl) DOM.statusEl.innerHTML = '<p>No videos were generated. Please try a different prompt.</p>';
        return;
    }

    for (const v of videos) {
        try {
            const uri = v.video?.uri;
            if (!uri) {
                throw new Error(`Video is missing a URI.`);
            }

            const url = decodeURIComponent(uri);
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch video: ${res.statusText}`);
            const blob = await res.blob();
            const objectURL = URL.createObjectURL(blob);

            const newSavedClip: SavedClip = { id: State.nextClipId, url: objectURL, blob };
            State.incrementNextClipId();

            const latestCard = createVideoCard(newSavedClip);
            DOM.statusEl?.appendChild(latestCard);

            const libraryCard = createVideoCard(newSavedClip);
            DOM.resultsGallery?.prepend(libraryCard);

        } catch (error) {
            console.error(`Error processing video:`, error);
            const message = error instanceof Error ? error.message : 'Unknown error';
            const errorEl = document.createElement('p');
            errorEl.textContent = `Could not load video. (${message})`;
            errorEl.className = 'error';
            DOM.resultsGallery?.prepend(errorEl.cloneNode(true));
            DOM.statusEl?.appendChild(errorEl.cloneNode(true));
        }
    }
}

async function handleGenerateIdeasClick() {
    if (!DOM.ideaInputEl) return;
    const idea = DOM.ideaInputEl.value.trim();
    if (!idea) {
        alert('Please describe your idea in the first text box to generate a detailed prompt.');
        DOM.ideaInputEl.focus();
        return;
    }

    if (DOM.generateIdeasButton) DOM.generateIdeasButton.disabled = true;
    DOM.ideaInputEl.disabled = true;
    const originalButtonContent = DOM.generateIdeasButton?.innerHTML;
    if (DOM.generateIdeasButton) DOM.generateIdeasButton.innerHTML = '<div class="loader"></div> Generating...';

    try {
        const generatedPrompt = await generatePromptApi(idea);
        if (DOM.promptEl) {
            DOM.promptEl.value = generatedPrompt;
            DOM.promptEl.focus();
        }
    } catch (error) {
        console.error("Failed to generate prompt ideas:", error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        alert(`Could not generate a new idea. ${message}`);
    } finally {
        if (DOM.generateIdeasButton) {
          DOM.generateIdeasButton.disabled = false;
          if (originalButtonContent) DOM.generateIdeasButton.innerHTML = originalButtonContent;
        }
        DOM.ideaInputEl.disabled = false;
    }
}

async function handleGenerateClick() {
  if (!DOM.promptEl?.value.trim()) {
    alert('Please enter a prompt.');
    return;
  }
  setUILoading(true);
  if (DOM.quotaErrorEl) DOM.quotaErrorEl.style.display = 'none';

  try {
    const videos = await generateContentApi(DOM.promptEl.value, State.imageBase64, State.projectAspectRatio);
    await handleGenerationSuccess(videos);
  } catch (e) {
    console.error(e);
    const message = e instanceof Error ? e.message : String(e);
    displayError(message);
  } finally {
    setUILoading(false);
  }
}

async function handleFileInputChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      try {
          const b64 = await blobToBase64(file);
          State.setImageBase64(b64);
          State.setImageMimeType(file.type);
          if (DOM.imagePreview) DOM.imagePreview.src = URL.createObjectURL(file);
          if (DOM.imagePreviewContainer) DOM.imagePreviewContainer.style.display = 'block';
      } catch(err) {
          console.error("Error reading file:", err);
          alert("Could not read the selected file.");
      }
    }
}

function handleClearImage() {
    if (DOM.fileInput) DOM.fileInput.value = ''; // Clear the file input
    State.setImageBase64('');
    State.setImageMimeType('');
    if (DOM.imagePreview) DOM.imagePreview.src = '';
    if (DOM.imagePreviewContainer) DOM.imagePreviewContainer.style.display = 'none';
}

export function initGenerator() {
    DOM.generateButton?.addEventListener('click', handleGenerateClick);
    DOM.generateIdeasButton?.addEventListener('click', handleGenerateIdeasClick);
    DOM.fileInput?.addEventListener('change', handleFileInputChange);
    DOM.clearImageButton?.addEventListener('click', handleClearImage);
}
