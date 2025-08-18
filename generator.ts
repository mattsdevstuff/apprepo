// generator.ts
// This file will contain the logic for the video generator view.
import { imageBase64, imageMimeType, savedClips, nextClipId, newClipsCount, projectAspectRatio, type GeneratedVideo, type SavedClip } from './state';
import { blobToBase64, sleep } from './utils';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebaseConfig';

export async function initializeGenerator(
  displayError: (message: string) => void,
  updateStudioNotification: () => void,
  renderMediaBin: () => void
) {
  // --- DOM Element References (Generator View) ---\n  const generatorView = document.querySelector<HTMLDivElement>('#generator-view');
  const ideaInputEl = document.querySelector<HTMLTextAreaElement>('#idea-input');
  const promptEl = document.querySelector<HTMLTextAreaElement>('#prompt-input');
  const fileInput = document.querySelector<HTMLInputElement>('#file-input');
  const imagePreviewContainer = document.querySelector<HTMLDivElement>('#image-preview-container');
  const imagePreview = document.querySelector<HTMLImageElement>('#image-preview');
  const clearImageButton = document.querySelector<HTMLButtonElement>('#clear-image-button');
  const generateButton = document.querySelector<HTMLButtonElement>('#generate-button');
  const statusEl = document.querySelector<HTMLDivElement>('#status');
  const resultsGallery = document.querySelector<HTMLDivElement>('#results-gallery');
  const galleryPlaceholder = document.querySelector<HTMLDivElement>('#gallery-placeholder');
  const quotaErrorEl = document.querySelector<HTMLDivElement>('#quota-error');
  const controlsContainer = document.querySelector<HTMLDivElement>('.controls');
  const generateIdeasButton = document.querySelector<HTMLButtonElement>('#generate-ideas-button');

  // --- UI Logic (Generator) ---\n  function setUILoading(isLoading: boolean) {
    if (generateButton) generateButton.disabled = isLoading;
    controlsContainer?.querySelectorAll('input, textarea, select, button').forEach(el => (el as HTMLInputElement).disabled = isLoading);

    if (isLoading && statusEl) {
      statusEl.innerHTML = `
        <div>
          <div class="loader"></div>
          <p>Generating video, please wait...</p>
          <p style="font-size: 0.9em; color: var(--text-muted-color)">(This may take a minute or two)</p>
        </div>`;
      statusEl.style.display = 'flex';
    }
  }

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

    if (savedClips.some(c => c.id === savedClip.id)) {
      addToStudioBtn.innerText = 'Added ✓';
      addToStudioBtn.disabled = true;
    }

    addToStudioBtn.onclick = () => {
      if (!savedClips.some(c => c.id === savedClip.id)) {
        savedClips.push(savedClip);
        newClipsCount++;
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
    if (galleryPlaceholder) galleryPlaceholder.style.display = 'none';

    if (statusEl) {
      statusEl.innerHTML = '';
      statusEl.style.display = 'block';
    }

    if (videos.length === 0) {
      if (statusEl) statusEl.innerHTML = '<p>No videos were generated. Please try a different prompt.</p>';
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

        const newSavedClip: SavedClip = { id: nextClipId++, url: objectURL, blob };

        const latestCard = createVideoCard(newSavedClip);
        statusEl?.appendChild(latestCard);

        const libraryCard = createVideoCard(newSavedClip);
        resultsGallery?.prepend(libraryCard);

      } catch (error) {
        console.error(`Error processing video:`, error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        const errorEl = document.createElement('p');
        errorEl.textContent = `Could not load video. (${message})`;
        errorEl.className = 'error';
        resultsGallery?.prepend(errorEl.cloneNode(true));
        statusEl?.appendChild(errorEl.cloneNode(true));
      }
    }
  }


  // --- API Calls (Now proxied through our backend) ---\n  async function generateContentApi(): Promise<GeneratedVideo[]> {
    const promptText = promptEl?.value || '';

    try {
      // 1. Start the generation via our backend
      console.log('[BFF] Sending generation request to server...');
      const startResponse = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          imageBase64: imageBase64,
          aspectRatio: projectAspectRatio,
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
        const statusPara = statusEl?.querySelector('p');
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


  // --- Main Handlers (Generator) ---\n  async function handleGenerateIdeasClick() {
    if (!ideaInputEl) return;
    const idea = ideaInputEl.value.trim();
    if (!idea) {
      alert('Please describe your idea in the first text box to generate a detailed prompt.');
      ideaInputEl.focus();
      return;
    }

    if (generateIdeasButton) generateIdeasButton.disabled = true;
    ideaInputEl.disabled = true;
    const originalButtonContent = generateIdeasButton?.innerHTML;
    if (generateIdeasButton) generateIdeasButton.innerHTML = '<div class="loader"></div> Generating...';

    try {
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

      if (generatedPrompt && promptEl) {
        promptEl.value = generatedPrompt;
        promptEl.focus();
      } else {
        throw new Error('The AI returned an empty response. Please try a different idea.');
      }

    } catch (error) {
      console.error("Failed to generate prompt ideas:", error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      alert(`Could not generate a new idea. ${message}`);
    } finally {
      if (generateIdeasButton) {
        generateIdeasButton.disabled = false;
        if (originalButtonContent) generateIdeasButton.innerHTML = originalButtonContent;
      }
      ideaInputEl.disabled = false;
    }
  }

  async function handleGenerateClick() {
    if (!promptEl?.value.trim()) {
      alert('Please enter a prompt.');
      return;
    }
    setUILoading(true);
    if (quotaErrorEl) quotaErrorEl.style.display = 'none';

    try {
      const videos = await generateContentApi();
      await handleGenerationSuccess(videos);
    } catch (e) {
      console.error(e);
      const message = e instanceof Error ? e.message : String(e);
      displayError(message);
    } finally {
      // Re-enable controls, but don't touch the status message which was set by success/error handlers.\n      setUILoading(false);
    }
  }

  async function handleVideoUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    const files = input.files;

    if (!files || files.length === 0) {
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith('video/')) {
        console.warn(`Skipping non-video file: ${file.name}`);
        continue;
      }

      const objectURL = URL.createObjectURL(file);

      const newSavedClip: SavedClip = {
        id: nextClipId++,
        url: objectURL,
        blob: file,
      };

      savedClips.push(newSavedClip);
    }

    renderMediaBin();

    input.value = '';
  }

  // --- Event Listeners (Generator) ---\n  fileInput?.addEventListener('change', async (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      try {
        imageBase64 = await blobToBase64(file);
        imageMimeType = file.type;
        if (imagePreview) imagePreview.src = URL.createObjectURL(file);
        if (imagePreviewContainer) imagePreviewContainer.style.display = 'block';
      } catch (err) {
        console.error("Error reading file:", err);
        alert("Could not read the selected file.");
      }
    }
  });

  clearImageButton?.addEventListener('click', () => {
    if (fileInput) fileInput.value = ''; // Clear the file input\n    imageBase64 = '';
    imageMimeType = '';
    if (imagePreview) imagePreview.src = '';
    if (imagePreviewContainer) imagePreviewContainer.style.display = 'none';
  });

  generateButton?.addEventListener('click', handleGenerateClick);
  generateIdeasButton?.addEventListener('click', handleGenerateIdeasClick);
}