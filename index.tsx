/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { initializeEditor } from './editor';
import {
  imageBase64, imageMimeType, timelineOverlays, nextOverlayId, sequenceDuration, savedClips, nextClipId, newClipsCount, timelineClips, currentClipInPreview, isSeeking, dropIndex, selectedClipId, selectedOverlayId, draggedTimelineClipId, projectAspectRatio, currentTool, tracks, nextTrackId, 
  type GeneratedVideo, type TrackType, type Track, type TextOverlay, type SavedClip, type TimelineClip
} from './state';

    trackId: number;
    start: number;
    end: number;
    duration: number; // Duration on the timeline
    sourceStart: number; // The start time of the clip within its source video
    sourceDuration: number; // The original, immutable duration of the source video
    thumbnails?: string[];
    properties: {
        volume: number; // 0 to 1
        scale: number; // multiplier, e.g., 1 = 100%
        position: { x: number; y: number; }; // in percent, from -50 to 50
        rotation: number; // in degrees, from -180 to 180
    }
}

// Assuming these are staying in utils
import { blobToBase64, formatTime, sleep } from './utils';
// Assuming these are staying in utils
let imageBase64 = '';
let imageMimeType = '';
let timelineOverlays: TextOverlay[] = [];
let nextOverlayId = 0;
let sequenceDuration = 0; // Total duration of the sequence, user-configurable
let savedClips: SavedClip[] = [];
let nextClipId = 0;
let newClipsCount = 0;
let timelineClips: TimelineClip[] = [];
let currentClipInPreview: TimelineClip | null = null;
let isSeeking = false;
let dropIndex = -1; // -1 means no valid drop index calculated yet
let selectedClipId: number | null = null;
let selectedOverlayId: number | null = null;
let draggedTimelineClipId: number | null = null;
let projectAspectRatio = '9:16';
let currentTool: 'select' | 'split' = 'select';
import { auth, initializeAuth } from './auth';
import { app } from './firebaseConfig'; // Assuming firebaseConfig is in the same directory
import { initializeModals } from './modals'; // Assuming modals.ts is in the same directory
import { initializeGenerator } from './generator';

// New track state
let tracks: Track[] = [
    { id: 0, type: 'video' } // Start with one video track
];
let nextTrackId = 1;


// --- Utility Functions ---
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      // Return only the base64 part
      resolve(url.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(blob);
  });
}

function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// --- App Initialization ---
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired.');
  document.title = 'AI YouTube Shorts Creator';

  // --- DOM Element References ---
  // Tabs
  const generatorTabButton = document.querySelector<HTMLButtonElement>('#generator-tab-button');
  const studioTabButton = document.querySelector<HTMLButtonElement>('#studio-tab-button');
  const studioNotificationBadge = document.querySelector<HTMLSpanElement>('#studio-notification-badge');
  const headerAuthStatus = document.querySelector<HTMLDivElement>('.header-auth-status'); // Select the new container
  const authSection = document.querySelector<HTMLDivElement>('#auth-section');

  // Add new element references

  console.log('headerAuthStatus element:', headerAuthStatus);

  const userInfoDisplay = document.querySelector<HTMLDivElement>('.user-info-display');
  const userNameEl = document.querySelector<HTMLSpanElement>('#user-name');
  const signOutButton = document.querySelector<HTMLButtonElement>('#sign-out-button');
  // Generator View

  // Editor View
  const editorView = document.querySelector<HTMLDivElement>('#editor-view');
  const editorBody = document.querySelector<HTMLDivElement>('.editor-body');
  const mediaPanel = document.querySelector<HTMLDivElement>('.media-panel');
  const previewPanel = document.querySelector<HTMLDivElement>('.preview-panel');
  const toolsPanel = document.querySelector<HTMLDivElement>('.tools-panel');
  const mediaBin = document.querySelector<HTMLDivElement>('#media-bin');
  const uploadVideoInput = document.querySelector<HTMLInputElement>('#upload-video-input');
  const editorPlaceholder = document.querySelector<HTMLDivElement>('#editor-placeholder');
  const addTextButton = document.querySelector<HTMLButtonElement>('#add-text-button');
  const exportVideoButton = document.querySelector<HTMLButtonElement>('#export-video-button');
  const selectToolButton = document.querySelector<HTMLButtonElement>('#select-tool-button');
  const splitToolButton = document.querySelector<HTMLButtonElement>('#split-tool-button');

  // New Timeline elements
  const timelineContainer = document.querySelector<HTMLDivElement>('#timeline-container');
  const timelineRuler = document.querySelector<HTMLDivElement>('#timeline-ruler');
  const timelineTrackHeaders = document.querySelector<HTMLDivElement>('#timeline-track-headers');
  const timelineScrollContainer = document.querySelector<HTMLDivElement>('#timeline-scroll-container');
  const timelineTracksContainer = document.querySelector<HTMLDivElement>('#timeline-tracks');
  const playhead = document.querySelector<HTMLDivElement>('#playhead');
  const splitIndicator = document.querySelector<HTMLDivElement>('#split-indicator');
  const addVideoTrackButton = document.querySelector<HTMLButtonElement>('#add-video-track-button');
  const addTextTrackButton = document.querySelector<HTMLButtonElement>('#add-text-track-button');

  const resizerH = document.querySelector<HTMLDivElement>('#resizer-h');

  // --- UI Logic ---

  function displayError(message: string) {
      // Also show a simple inline status message
      if (statusEl) {
        statusEl.innerHTML = `<p class="error">${message}</p>`;
        statusEl.style.display = 'flex';
      }

      let title = "An Unknown Error Occurred";
      let body = `<p>An unexpected error was encountered. Please check the console for details.</p>`;
      let suggestions: string[] = [];

      // Improve error parsing
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes('quota')) {
          title = "Quota Exceeded";
          body = `<p>You have exceeded your generation quota for the video API.</p>`;
          suggestions = [
              "Please check your Google Cloud project's quotas and billing status.",
              "If you are on a free tier, you may need to upgrade or wait for the quota to reset."
          ];
      } else if (lowerMessage.includes('api key not valid') || message.includes('403')) {
          title = "Invalid API Key";
          body = `<p>The API key provided is not valid or lacks the necessary permissions.</p>`;
          suggestions = [
              "Ensure the <code>GEMINI_API_KEY</code> is set correctly in your environment.",
              "Verify the key is enabled and has the 'Generative Language API' or 'Vertex AI API' enabled in your Google Cloud project.",
              "Make sure there are no billing issues with your associated account."
          ];
      } else if (message.includes('500') || message.includes('internal server error')) {
          title = "Internal Server Error";
          body = `<p>The server encountered a temporary error while processing your request. This is usually not an issue with your setup.</p>
                <p>The error message was: code>${message}</code></p>`;
          suggestions = [
              "Try generating the video again in a few moments.",
              "If the problem persists, the service may be experiencing a temporary outage.",
              "Try a simpler prompt to see if a complex request is causing the issue."
          ];
      } else if (lowerMessage.includes('filtered for safety')) {
          title = "Prompt Rejected";
          body = `<p>The API operation finished but returned no videos because the prompt may have been filtered for safety reasons.</p>`;
          suggestions = [
              "Please modify your prompt to be more compliant with the safety policy and try again."
          ];
      } else {
          body = `<p>An unexpected error occurred:</p><p><code>${message}</code></p>`;
          suggestions = [
              "Check the browser's developer console (F12) for more detailed error logs.",
              "Ensure your internet connection is stable."
          ];
      }

      let suggestionsHTML = '';
      if (suggestions.length > 0) {
          suggestionsHTML = `<div class="suggestions">
              <p><strong>What you can try:</strong></p>
              <ul>
                  ${suggestions.map(s => `<li>${s}</li>`).join('')}
              </ul>
          </div>`;
      }

      if (errorModalBody) errorModalBody.innerHTML = body + suggestionsHTML;
      const modalTitle = errorModal?.querySelector('.modal-title');
      if (modalTitle) (modalTitle as HTMLElement).innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color: var(--error-color);"></i> ${title}`;

  function switchView(viewId: 'generator-view' | 'editor-view') {
    if (viewId === 'generator-view') {
      if (editorView) editorView.style.display = 'none';
      generatorTabButton?.classList.add('active');
    } else {
      if (generatorView) generatorView.style.display = 'none';
      if (editorView) editorView.style.display = 'flex';
      generatorTabButton?.classList.remove('active');
      studioTabButton?.classList.add('active');
      newClipsCount = 0;
      updateStudioNotification();
      renderMediaBin();
      renderTimelineTracks();
    }
    document.body.classList.toggle('generator-active', viewId === 'generator-view');
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

  // --- UI Logic (Studio) ---
  function updateStudioNotification() {
    if (!studioNotificationBadge) return;
    if (newClipsCount > 0) {
      studioNotificationBadge.style.display = 'block';
      studioNotificationBadge.textContent = String(newClipsCount);
    } else {
      studioNotificationBadge.style.display = 'none';
    }
  }


  function applyClipTransforms() {
      if (!currentClipInPreview || !videoPreview) return;
      const props = currentClipInPreview.properties;
      
      videoPreview.volume = props.volume;

      const translateX = `${props.position.x}%`;
      const translateY = `${props.position.y}%`;
      
      videoPreview.style.transform = `translate(${translateX}, ${translateY}) scale(${props.scale}) rotate(${props.rotation}deg)`;
  }

  function repackClips() {
      let currentTime = 0;
      timelineClips.forEach(clip => {
          clip.start = currentTime;
          clip.end = currentTime + clip.duration;
          currentTime += clip.duration;
      });
      const contentDuration = currentTime;
      // The sequence can be longer than the content, but not shorter.
      if (sequenceDuration < contentDuration) {
          sequenceDuration = Math.ceil(contentDuration);
      }
      renderTimelineRuler();
  }


  function resetEditorView() {
      // Removed videoPreview logic as it's now in editor.ts
      // The editor.ts initializeEditor function will handle the initial state
      // of the preview player.
      if (playPauseButton) playPauseButton.disabled = true;
      if (addTextButton) addTextButton.disabled = true;
      if (playhead) playhead.style.display = 'none';
      currentClipInPreview = null;
      sequenceDuration = 0;
      timelineOverlays = [];
      if (videoPreviewWrapper) {
          // Clear overlays but preserve essential children
          videoPreviewWrapper.innerHTML = '';
          if (editorPlaceholder) videoPreviewWrapper.appendChild(editorPlaceholder);
          if (videoPreview) videoPreviewWrapper.appendChild(videoPreview);
      }
      // Removed aspect ratio update, will be handled in editor.ts
      updatePreviewAspectRatio();
      renderTimelineTracks();
      updateTimelineUI();
  }

  function removeClipFromTimeline(clipIdToRemove: number) {
      timelineClips = timelineClips.filter(c => c.id !== clipIdToRemove);

      if (selectedClipId === clipIdToRemove) {
          selectedClipId = null;
          updatePropertiesPanel();
      }

      if (timelineClips.length === 0) {
          resetEditorView();
          return;
      }
      
      // If the currently playing clip was removed, load the first one
      if (currentClipInPreview?.id === clipIdToRemove) {
          loadClipIntoPreview(timelineClips[0]);
      }

      repackClips();
      renderTimelineTracks();
      updateTimelineUI();
  }

  async function generateClipThumbnails(videoUrl: string, duration: number, numThumbnails = 5, sourceStart = 0): Promise<string[]> {
      return new Promise((resolve) => {
          const video = document.createElement('video');
          video.crossOrigin = "anonymous"; // Needed for canvas
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const thumbnails: string[] = [];
          if (!ctx) {
              resolve([]);
              return;
          }

          video.onloadedmetadata = () => {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              // Start seeking after metadata is loaded
              const startTime = sourceStart + 0.01;
              video.currentTime = startTime; // Start at a tiny offset
          };

          let loadedThumbnails = 0;
          video.onseeked = () => {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              thumbnails.push(canvas.toDataURL('image/jpeg', 0.7));
              loadedThumbnails++;
              
              if (loadedThumbnails >= numThumbnails) {
                  video.src = ""; // Cleanup
                  resolve(thumbnails);
              } else {
                  const nextTime = sourceStart + (duration / (numThumbnails > 1 ? (numThumbnails - 1) : 1)) * loadedThumbnails;
                  // Ensure not seeking past the end of the sub-clip's duration
                  video.currentTime = Math.min(nextTime, sourceStart + duration - 0.01);
              }
          };
          
          video.onerror = (err) => {
              console.error("Error loading video for thumbnail generation.", err);
              resolve([]); // Resolve with empty array on error
          };

          video.src = videoUrl;
      });
  }


  async function addClipToTimeline(clip: SavedClip, trackId: number, index: number) {
      const tempVideo = document.createElement('video');
      tempVideo.src = clip.url;

      tempVideo.addEventListener('loadedmetadata', () => {
          const duration = tempVideo.duration;
          const newClipData: TimelineClip = {
              ...clip,
              trackId: trackId,
              duration,
              sourceDuration: duration,
              sourceStart: 0,
              start: 0, // placeholder
              end: 0,   // placeholder
              thumbnails: [],
              properties: {
                  volume: 1,
                  scale: 1,
                  position: { x: 0, y: 0},
                  rotation: 0
              }
          };

          // If this is the first clip, set up the project settings
          if (timelineClips.length === 0) {
              projectAspectRatio = '9:16';
              sequenceDuration = Math.ceil(duration);
              updatePreviewAspectRatio();
          }

          timelineClips.splice(index, 0, newClipData);
          repackClips();

          if (timelineClips.length === 1) {
              loadClipIntoPreview(timelineClips[0]);
              if (editorPlaceholder) editorPlaceholder.style.display = 'none';
              if (videoPreview) videoPreview.style.display = 'block';
              if (playPauseButton) playPauseButton.disabled = false;
              if (addTextButton) addTextButton.disabled = false;
              if (playhead) playhead.style.display = 'block';
          }
          
          renderTimelineTracks();
          updateTimelineUI();

          // Asynchronously generate and render thumbnails
          generateClipThumbnails(newClipData.url, duration, 5, 0).then(thumbnails => {
              newClipData.thumbnails = thumbnails;
              const clipEl = timelineTracksContainer?.querySelector(`.video-clip[data-clip-id="${newClipData.id}"]`);
              if (clipEl) {
                  renderThumbnailsOnClip(clipEl as HTMLDivElement, thumbnails, newClipData);
              }
          });


  function loadClipIntoPreview(clip: TimelineClip, time = 0, forcePlay = false) { // This function will be moved later

      videoPreview.addEventListener('loadeddata', () => {
          if (!videoPreview) return;
          videoPreview.currentTime = clip.sourceStart + time;
          if (shouldPlay) {
              videoPreview.play().catch(e => {
                  console.error("Playback failed:", e);
                  updatePlaybackStatus(false);
              });
          }
          isSeeking = false;
          updateTimelineUI(); // Force an immediate UI update
      }, { once: true });

      videoPreview.src = clip.url;
  }

  function renderMediaBin() {
      if (!mediaBin) return;
      mediaBin.innerHTML = '';
      if (savedClips.length === 0) {
          mediaBin.innerHTML = `
              <div class="placeholder">
                Add clips from the Generator to see them here.
              </div>`;
          return;
      }

      savedClips.forEach(clip => {
          const clipEl = document.createElement('div');
          clipEl.className = 'media-clip';
          clipEl.draggable = true;
          clipEl.dataset.clipId = String(clip.id);

          const videoEl = document.createElement('video');
          videoEl.src = clip.url;
          videoEl.muted = true;
          videoEl.loop = true;
          videoEl.oncanplay = () => videoEl.play(); // Autoplay thumbnail

          const titleEl = document.createElement('div');
          titleEl.className = 'media-clip-title';
          titleEl.textContent = `Clip #${clip.id + 1}`;
          
          clipEl.appendChild(videoEl);
          clipEl.appendChild(titleEl);
          mediaBin.appendChild(clipEl);
      });
  }

  function getInsertionMarker(): HTMLDivElement {
      let marker = document.getElementById('insertion-marker') as HTMLDivElement;
      if (!marker) {
          marker = document.createElement('div');
          marker.id = 'insertion-marker';
          marker.className = 'insertion-marker';
          timelineScrollContainer?.appendChild(marker);
      }
      return marker;
  }

  // DRAG & DROP for timeline clips
  function handleTimelineClipDragStart(e: DragEvent, clip: TimelineClip) {
      e.stopPropagation(); // Prevent parent handlers
      if (e.dataTransfer) {
        e.dataTransfer.setData('text/plain', String(clip.id));
        e.dataTransfer.setData('source', 'timeline');
      }
      draggedTimelineClipId = clip.id;
      setTimeout(() => {
          (e.target as HTMLElement).classList.add('is-ghost');
      }, 0);
  }

  function handleTimelineClipDragEnd(e: DragEvent) {
      (e.target as HTMLElement).classList.remove('is-ghost');
      draggedTimelineClipId = null;
  }

  function handleVideoClipResize(e: MouseEvent, clip: TimelineClip) {
      e.preventDefault();
      e.stopPropagation();
      if (!timelineTracksContainer) return;

      const target = e.target as HTMLElement;
      const resizeDirection = target.classList.contains('left') ? 'left' : 'right';
      document.body.classList.add('is-resizing');

      const timelineWidth = timelineTracksContainer.offsetWidth;
      const startX = e.clientX;

      const originalClipData = {
          start: clip.start,
          duration: clip.duration,
          sourceStart: clip.sourceStart,
      };

      const pixelsToSeconds = (pixels: number) => (pixels / timelineWidth) * sequenceDuration;

      const onMouseMove = (moveEvent: MouseEvent) => {
          const deltaX = moveEvent.clientX - startX;
          const deltaTime = pixelsToSeconds(deltaX);

          if (resizeDirection === 'right') {
              const newDuration = originalClipData.duration + deltaTime;
              // Clamp duration: min 0.1s, max is remaining source video
              clip.duration = Math.max(0.1, Math.min(newDuration, clip.sourceDuration - clip.sourceStart));
          } else { // 'left'
              let allowedDelta = deltaTime;
              
              // Constraint: Can't make duration < 0.1s
              if (originalClipData.duration - allowedDelta < 0.1) {
                  allowedDelta = originalClipData.duration - 0.1;
              }
              // Constraint: Can't make timeline start < 0
              if (originalClipData.start + allowedDelta < 0) {
                  allowedDelta = -originalClipData.start;
              }
              // Constraint: Can't make sourceStart < 0
              if (originalClipData.sourceStart + allowedDelta < 0) {
                  allowedDelta = -originalClipData.sourceStart;
              }

              clip.start = originalClipData.start + allowedDelta;
              clip.sourceStart = originalClipData.sourceStart + allowedDelta;
              clip.duration = originalClipData.duration - allowedDelta;
          }

          repackClips();
          renderTimelineTracks();
          updateTimelineUI();
      };

      const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
          document.body.classList.remove('is-resizing');
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
  }


  function renderThumbnailsOnClip(clipEl: HTMLDivElement, thumbnails: string[], clip: TimelineClip) {
      clipEl.innerHTML = ''; // Clear previous content (like text)
      clipEl.style.padding = '0';

      const thumbnailContainer = document.createElement('div');
      thumbnailContainer.className = 'thumbnail-strip';

      thumbnails.forEach(thumbUrl => {
          const frame = document.createElement('div');
          frame.className = 'thumbnail-frame';
          frame.style.backgroundImage = `url(${thumbUrl})`;
          thumbnailContainer.appendChild(frame);
      });
      
      clipEl.appendChild(thumbnailContainer);

      // Re-add remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-clip-btn';
      removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      removeBtn.onclick = (e) => {
          e.stopPropagation();
          removeClipFromTimeline(parseInt(clipEl.dataset.clipId!, 10));
      };
      clipEl.appendChild(removeBtn);

      // Add resize handles
      const leftHandle = document.createElement('div');
      leftHandle.className = 'resize-handle left';
      leftHandle.addEventListener('mousedown', (e) => handleVideoClipResize(e, clip));
      clipEl.appendChild(leftHandle);

      const rightHandle = document.createElement('div');
      rightHandle.className = 'resize-handle right';
      rightHandle.addEventListener('mousedown', (e) => handleVideoClipResize(e, clip));
      clipEl.appendChild(rightHandle);
  }


  function renderTimelineTracks() {
      if (!timelineTracksContainer || !timelineTrackHeaders) return;
      timelineTracksContainer.innerHTML = '';
      timelineTrackHeaders.innerHTML = '';

      if (tracks.length === 0 && timelineClips.length === 0) {
          const placeholderTrack = document.createElement('div');
          placeholderTrack.className = 'timeline-track';
          placeholderTrack.innerHTML = `<div class="timeline-placeholder">Add a track to get started</div>`;
          timelineTracksContainer.appendChild(placeholderTrack);
          return;
      }

      tracks.forEach(track => {
          // Render Header
          const trackHeader = document.createElement('div');
          trackHeader.className = 'track-header';
          const iconClass = track.type === 'video' ? 'fa-video' : 'fa-font';
          trackHeader.innerHTML = `<span>${track.type.charAt(0).toUpperCase()}${track.type.slice(1,2)}</span> <i class="fa-solid ${iconClass}"></i>`;
          
          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'delete-track-btn';
          deleteBtn.innerHTML = `&times;`;
          deleteBtn.title = `Delete ${track.type} track`;
          deleteBtn.dataset.trackId = String(track.id);
          trackHeader.appendChild(deleteBtn);
          
          timelineTrackHeaders.appendChild(trackHeader);

          // Render Track
          const trackEl = document.createElement('div');
          trackEl.className = 'timeline-track';
          trackEl.dataset.trackId = String(track.id);
          trackEl.dataset.trackType = track.type;

          if (track.type === 'video') {
              const clipsOnTrack = timelineClips.filter(c => c.trackId === track.id);
              if (clipsOnTrack.length === 0) {
                  trackEl.innerHTML = `<div class="timeline-placeholder">Drag clips from the Media Bin here</div>`;
              }
              clipsOnTrack.forEach(clip => {
                  const clipEl = document.createElement('div');
                  clipEl.className = 'timeline-clip video-clip';
                  if (clip.id === selectedClipId) clipEl.classList.add('is-selected');
                  clipEl.draggable = true;
                  clipEl.dataset.clipId = String(clip.id);
                  
                  const left = (clip.start / sequenceDuration) * 100;
                  const width = (clip.duration / sequenceDuration) * 100;
                  clipEl.style.left = `${left}%`;
                  clipEl.style.width = `${width}%`;

                  if (clip.thumbnails && clip.thumbnails.length > 0) {
                      renderThumbnailsOnClip(clipEl, clip.thumbnails, clip);
                  } else {
                      clipEl.textContent = `Loading Clip #${clip.id + 1}...`;
                  }
                  
                  // clipEl.addEventListener('click', () => handleSelectClip(clip.id, clipEl)); // Moved to editor.ts
                  clipEl.addEventListener('dragstart', (e) => handleTimelineClipDragStart(e, clip));
                  clipEl.addEventListener('dragend', handleTimelineClipDragEnd);

                  trackEl.appendChild(clipEl);
              });
          } else { // Text track
              const overlaysOnTrack = timelineOverlays.filter(o => o.trackId === track.id);
              overlaysOnTrack.forEach(overlay => {
                  updateTimelineTextClipElement(overlay);
                  if (overlay.id === selectedOverlayId) {
                      overlay.clipElement.classList.add('is-selected');
                      }
                  trackEl.appendChild(overlay.clipElement);
              });
          }
          timelineTracksContainer.appendChild(trackEl);
      });
  }


  function renderTimelineRuler() {
      if (!timelineRuler || !timelineScrollContainer) return;
      timelineRuler.innerHTML = '';
      if (sequenceDuration <= 0) return;

      const rulerWidth = timelineScrollContainer.offsetWidth;
      const pixelsPerSecond = rulerWidth / sequenceDuration;

      // Determine a suitable interval for major ticks (aim for around 80px apart)
      let majorTickInterval = 1;
      if (pixelsPerSecond < 10) majorTickInterval = 10;
      else if (pixelsPerSecond < 40) majorTickInterval = 5;

      for (let time = 0; time <= sequenceDuration; time += majorTickInterval) {
          const positionPercent = (time / sequenceDuration) * 100;
          if (positionPercent > 100) continue;

          const tick = document.createElement('div');
          tick.className = 'ruler-tick major';
          tick.style.left = `${positionPercent}%`;

          const label = document.createElement('span');
          label.textContent = formatTime(time);
          tick.appendChild(label);
          timelineRuler.appendChild(tick);
      }
  }
      el.style.fontFamily = overlay.fontFamily;
      el.style.color = overlay.color;
      
      const videoHeight = videoPreviewWrapper.offsetHeight;
      const responsiveSize = (overlay.fontSize / 500) * videoHeight;
      el.style.fontSize = `${responsiveSize}px`;

      el.style.left = overlay.position.left;
      el.style.top = overlay.position.top;
      el.style.transform = 'translate(-50%, -50%)';
  }

  function handleOverlayDrag(e: MouseEvent, overlay: TextOverlay) {
      e.preventDefault();
      document.body.classList.add('is-dragging-overlay');
      if (!videoPreviewWrapper) return;

      const wrapperRect = videoPreviewWrapper.getBoundingClientRect();

      const onMouseMove = (moveEvent: MouseEvent) => {
          const x = moveEvent.clientX - wrapperRect.left;
          const y = moveEvent.clientY - wrapperRect.top;

          // Clamp values to be within the wrapper bounds
          const clampedX = Math.max(0, Math.min(x, wrapperRect.width));
          const clampedY = Math.max(0, Math.min(y, wrapperRect.height));

          const newLeft = (clampedX / wrapperRect.width) * 100;
          const newTop = (clampedY / wrapperRect.height) * 100;
          
          overlay.position.left = `${newLeft}%`;
          overlay.position.top = `${newTop}%`;
          
          applyOverlayStyles(overlay);
      };
      
      const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
          document.body.classList.remove('is-dragging-overlay');
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
  }

  function createNewTextOverlay() {
      if (!videoPreview) return;
      
      let targetTrackId: number;
      const firstTextTrack = tracks.find(t => t.type === 'text');
      if (firstTextTrack) {
          targetTrackId = firstTextTrack.id;
      } else {
          // If no text track exists, create one
          targetTrackId = nextTrackId;
          addTrack('text'); // This function now handles adding to state and re-rendering
      }

      const currentTime = currentClipInPreview ? currentClipInPreview.start + (videoPreview.currentTime - currentClipInPreview.sourceStart) : 0;
      const start = currentTime;
      const end = Math.min(start + 4, sequenceDuration);

      const id = nextOverlayId++;
      const overlay: TextOverlay = {
          id,
          trackId: targetTrackId,
          text: 'New Caption',
          start,
          end,
          element: document.createElement('div'),
          clipElement: document.createElement('div'),
          fontFamily: 'Google Sans',
          color: '#ffffff',
          fontSize: 40,
          position: { top: '50%', left: '50%' },
      };

      overlay.element.className = 'text-overlay';
      overlay.element.textContent = overlay.text;
      overlay.element.addEventListener('mousedown', (e) => handleOverlayDrag(e, overlay));
      videoPreviewWrapper?.appendChild(overlay.element);
      applyOverlayStyles(overlay);

      overlay.clipElement.className = 'timeline-clip text-clip';
      overlay.clipElement.textContent = overlay.text;
      overlay.clipElement.dataset.overlayId = String(id);
      overlay.clipElement.addEventListener('mousedown', handleGenericClipMouseDown);
      overlay.clipElement.addEventListener('click', () => handleSelectOverlay(overlay.id, overlay.clipElement));


      const leftHandle = document.createElement('div');
      leftHandle.className = 'resize-handle left';
      overlay.clipElement.appendChild(leftHandle);
      const rightHandle = document.createElement('div');
      rightHandle.className = 'resize-handle right';
      overlay.clipElement.appendChild(rightHandle);

      timelineOverlays.push(overlay);
      renderTimelineTracks();
      updateTimelineUI();

      handleSelectOverlay(id, overlay.clipElement);
  }

          
      } else {
          // Hide all panels, show placeholder
          textProperties.style.display = 'none';
          videoProperties.style.display = 'none';
          propertiesPlaceholder.style.display = 'block';
      }
  }

  // --- Resizer Logic ---
  function initResizers() {
      const MIN_PANEL_WIDTH = 150;
      const MIN_PREVIEW_WIDTH = 300;
      const MIN_TIMELINE_HEIGHT = 80;
      const MIN_EDITOR_BODY_HEIGHT = 200;

      // Vertical Resizer 1 (Left)
      resizerV1?.addEventListener('mousedown', (e) => {
          e.preventDefault();
          document.body.classList.add('is-resizing-v');

          const startX = e.clientX;
          const startLeftWidth = mediaPanel?.offsetWidth || 0;

          const onMouseMove = (moveEvent: MouseEvent) => {
              if (!mediaPanel || !editorBody || !toolsPanel) return;
              const dx = moveEvent.clientX - startX;
              const newLeftWidth = startLeftWidth + dx;
              
              if (newLeftWidth < MIN_PANEL_WIDTH) return;
              if (editorBody.offsetWidth - newLeftWidth - toolsPanel.offsetWidth < MIN_PREVIEW_WIDTH) return;
              
              mediaPanel.style.flexBasis = `${newLeftWidth}px`;
          };

          const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
              document.body.classList.remove('is-resizing-v');
          };

          window.addEventListener('mousemove', onMouseMove);
          window.addEventListener('mouseup', onMouseUp);
      });
      
      // Vertical Resizer 2 (Right)
      resizerV2?.addEventListener('mousedown', (e) => {
          e.preventDefault();
          document.body.classList.add('is-resizing-v');

          const startX = e.clientX;
          const startRightWidth = toolsPanel?.offsetWidth || 0;

          const onMouseMove = (moveEvent: MouseEvent) => {
              if (!toolsPanel || !editorBody || !mediaPanel) return;
              const dx = moveEvent.clientX - startX;
              const newRightWidth = startRightWidth - dx;

              if (newRightWidth < MIN_PANEL_WIDTH) return;
              if (editorBody.offsetWidth - newRightWidth - mediaPanel.offsetWidth < MIN_PREVIEW_WIDTH) return;

              toolsPanel.style.flexBasis = `${newRightWidth}px`;
          };

          const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
              document.body.classList.remove('is-resizing-v');
          };

          window.addEventListener('mousemove', onMouseMove);
          window.addEventListener('mouseup', onMouseUp);
      });

      // Horizontal Resizer Logic
      resizerH?.addEventListener('mousedown', (e) => {
          e.preventDefault();
          document.body.classList.add('is-resizing-h');

          const startY = e.clientY;
          const startBottomHeight = timelineContainer?.offsetHeight || 0;
          const editorMainContent = editorBody?.parentElement as HTMLElement;
          if (!editorMainContent || !timelineContainer) return;

          const onMouseMove = (moveEvent: MouseEvent) => {
              const dy = moveEvent.clientY - startY;
              const newBottomHeight = startBottomHeight - dy;
              
              if (newBottomHeight > MIN_TIMELINE_HEIGHT && newBottomHeight < (editorMainContent.offsetHeight - MIN_EDITOR_BODY_HEIGHT)) {
                  timelineContainer.style.flexBasis = `${newBottomHeight}px`;
                  timelineOverlays.forEach(applyOverlayStyles);
                  renderTimelineRuler();
              }
          };

          const onMouseUp = () => {
              window.removeEventListener('mousemove', onMouseMove);
              window.removeEventListener('mouseup', onMouseUp);
              document.body.classList.remove('is-resizing-h');
          };

          window.addEventListener('mousemove', onMouseMove);
          window.addEventListener('mouseup', onMouseUp);
      });
  }
    
    // Timeline Seeking
    function handleTimelineSeek(e: MouseEvent) {
        if (currentTool === 'split') {
            handleSplitterClick(e);
            return;
        }

        const targetEl = e.target as HTMLElement;

        // Prevent seek when interacting with a clip directly (its own handlers will fire)
        if (targetEl.closest('.timeline-clip')) {
            return;
        }
        
        // If clicking on the background, deselect any active item
        deselectAllItems();
        
        if (sequenceDuration === 0 || !timelineRuler || !videoPreview) return;

        const timelineRect = timelineRuler.getBoundingClientRect();
        const clickX = e.clientX - timelineRect.left;
        const timelineWidth = timelineRuler.offsetWidth;
        const clickPercent = Math.max(0, Math.min(1, clickX / timelineWidth));
        const targetTime = clickPercent * sequenceDuration;

        const targetClip = timelineClips.find(clip => targetTime >= clip.start && targetTime < clip.end);
        
        // Keep track of playback state to resume if it was playing
        const wasPlaying = videoPreview ? !videoPreview.paused : false;

        if (targetClip) {
            const localTime = targetTime - targetClip.start;
            if (currentClipInPreview?.id !== targetClip.id) {
                loadClipIntoPreview(targetClip, localTime, wasPlaying);
            } else if (videoPreview) {
                videoPreview.currentTime = targetClip.sourceStart + localTime;
                updateTimelineUI();
            }
        }
    }
  
    // A generic mousedown handler for timeline clips (text clips specifically)
    // It will handle resizing.
    function handleGenericClipMouseDown(e: MouseEvent) {
        const clipElement = (e.currentTarget as HTMLElement);
        const handle = (e.target as HTMLElement);

        // Only act if a resize handle was clicked
        if (!handle.classList.contains('resize-handle')) {
            return;
        }
        
        e.preventDefault();
        e.stopPropagation();

        const overlayIdStr = clipElement.dataset.overlayId;
        if (!overlayIdStr) return;
        const overlayId = parseInt(overlayIdStr, 10);
        const overlay = timelineOverlays.find(o => o.id === overlayId);

        if (!overlay || !timelineTracksContainer) return;
        
        document.body.classList.add('is-resizing');

        const resizeDirection = handle.classList.contains('left') ? 'left' : 'right';
        const timelineWidth = timelineTracksContainer.offsetWidth;
        const startX = e.clientX;

        const originalClipData = {
            start: overlay.start,
            end: overlay.end
        };

        const pixelsToSeconds = (pixels: number) => (pixels / timelineWidth) * sequenceDuration;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX;
            const deltaTime = pixelsToSeconds(deltaX);

            if (resizeDirection === 'right') {
                const newEnd = originalClipData.end + deltaTime;
                // Clamp end time between (start + 0.1s) and sequenceDuration
                overlay.end = Math.max(overlay.start + 0.1, Math.min(newEnd, sequenceDuration));
            } else { // 'left'
                const newStart = originalClipData.start + deltaTime;
                // Clamp start time between 0 and (end - 0.1s)
                overlay.start = Math.max(0, Math.min(newStart, overlay.end - 0.1));
            }
            updateTimelineTextClipElement(overlay);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.body.classList.remove('is-resizing');
            updateTimelineUI();
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
    
    // Properties Panel Listeners
    function handlePropertiesChange() {
        if (selectedOverlayId !== null) {
            const overlay = timelineOverlays.find(o => o.id === selectedOverlayId);
            if (!overlay || !propTextContent || !propFontFamily || !propFontColor || !propFontSize) return;

            overlay.text = propTextContent.value;
            overlay.fontFamily = propFontFamily.value;
            overlay.color = propFontColor.value;
            overlay.fontSize = parseInt(propFontSize.value, 10);
            
            if (propFontSizeValue) propFontSizeValue.textContent = String(overlay.fontSize);
            
            overlay.element.textContent = overlay.text;
            updateTimelineTextClipElement(overlay);
            applyOverlayStyles(overlay);

        } else if (selectedClipId !== null) {
            const clip = timelineClips.find(c => c.id === selectedClipId);
            if (!clip || !propVideoVolume || !propVideoScale || !propVideoPosX || !propVideoPosY || !propVideoRotation) return;

            clip.properties.volume = (parseInt(propVideoVolume.value, 10)) / 100;
            clip.properties.scale = (parseInt(propVideoScale.value, 10)) / 100;
            clip.properties.position.x = parseInt(propVideoPosX.value, 10);
            clip.properties.position.y = parseInt(propVideoPosY.value, 10);
            clip.properties.rotation = parseInt(propVideoRotation.value, 10);

            if (propVideoVolumeValue) propVideoVolumeValue.textContent = `${Math.round(clip.properties.volume * 100)}%`;
            if (propVideoScaleValue) propVideoScaleValue.textContent = `${Math.round(clip.properties.scale * 100)}%`;
            if (propVideoPosXValue) propVideoPosXValue.textContent = `${clip.properties.position.x}%`;
            if (propVideoPosYValue) propVideoPosYValue.textContent = `${clip.properties.position.y}%`;
            if (propVideoRotationValue) propVideoRotationValue.textContent = `${clip.properties.rotation}°`;
            
            applyClipTransforms();
        }
    }
    
    function handleResetTransforms() {
        if (selectedClipId !== null) {
            const clip = timelineClips.find(c => c.id === selectedClipId);
            if (!clip) return;
            clip.properties.scale = 1;
            clip.properties.position = { x: 0, y: 0 };
            clip.properties.rotation = 0;
            updatePropertiesPanel(); 
            applyClipTransforms();
        }
    }

    // --- Track Management ---
    function addTrack(type: TrackType) {
        tracks.push({ id: nextTrackId++, type });
        renderTimelineTracks();
    }

    function deleteTrack(trackId: number) {
        // Confirmation might be a good idea in a real app
        tracks = tracks.filter(t => t.id !== trackId);

        // Remove associated clips and overlays
        timelineClips = timelineClips.filter(c => c.trackId !== trackId);
        const overlaysToRemove = timelineOverlays.filter(o => o.trackId === trackId);
        overlaysToRemove.forEach(o => o.element.remove()); // Remove from DOM
        timelineOverlays = timelineOverlays.filter(o => o.trackId !== trackId);
        
        if (selectedClipId && timelineClips.every(c => c.id !== selectedClipId)) {
            deselectAllItems();
        }
        if (selectedOverlayId && timelineOverlays.every(o => o.id !== selectedOverlayId)) {
            deselectAllItems();
        }

        renderTimelineTracks();
        repackClips();
        updateTimelineUI();
    }

    // --- Tooling Logic ---
    function setTool(tool: 'select' | 'split') {
        currentTool = tool;
        selectToolButton?.classList.toggle('active', tool === 'select');
        splitToolButton?.classList.toggle('active', tool === 'split');
        timelineScrollContainer?.classList.toggle('split-mode', tool === 'split');
        
        // Hide indicator if we switch away from split tool
        if (tool !== 'split' && splitIndicator) {
            splitIndicator.style.display = 'none';
        }
    }

    function handleSplitterClick(e: MouseEvent) {
        if (sequenceDuration === 0 || !timelineRuler) return;
        const targetEl = e.target as HTMLElement;
        const clickedClipEl = targetEl.closest('.timeline-clip');
        if (!clickedClipEl) return;

        const timelineRect = timelineRuler.getBoundingClientRect();
        const clickX = e.clientX - timelineRect.left;
        const timelineWidth = timelineRuler.offsetWidth;
        const clickPercent = Math.max(0, Math.min(1, clickX / timelineWidth));
        const splitTime = clickPercent * sequenceDuration;
        
        if (clickedClipEl.classList.contains('video-clip')) {
            const clipId = parseInt((clickedClipEl as HTMLElement).dataset.clipId!, 10);
            splitVideoClip(clipId, splitTime);
        } else if (clickedClipEl.classList.contains('text-clip')) {
            const overlayId = parseInt((clickedClipEl as HTMLElement).dataset.overlayId!, 10);
            splitTextOverlay(overlayId, splitTime);
        }

        // Revert to select tool after splitting for a better workflow
        setTool('select');
    }
    
    function splitVideoClip(clipId: number, splitTime: number) {
        const clipIndex = timelineClips.findIndex(c => c.id === clipId);
        if (clipIndex === -1) return;

        const clipToSplit = timelineClips[clipIndex];
        
        // Prevent splitting too close to the edges
        if (splitTime <= clipToSplit.start + 0.1 || splitTime >= clipToSplit.end - 0.1) {
            return;
        }

        deselectAllItems();

        const durationA = splitTime - clipToSplit.start;
        const durationB = clipToSplit.end - splitTime;
        const sourceStartB = clipToSplit.sourceStart + durationA;

        // Create the new clip for the second part
        const newClipPartB: TimelineClip = {
            ...clipToSplit, // Copies blob, url, sourceDuration, properties etc.
            id: nextClipId++,
            start: splitTime,
            end: clipToSplit.end,
            duration: durationB,
            sourceStart: sourceStartB,
            thumbnails: [], // Thumbnails will be generated
        };

        // Modify the original clip to become the first part
        clipToSplit.end = splitTime;
        clipToSplit.duration = durationA;
        clipToSplit.thumbnails = []; // Clear old thumbnails

        // Insert the new clip into the timeline
        timelineClips.splice(clipIndex + 1, 0, newClipPartB);
        
        // Re-render the timeline immediately with placeholders
        renderTimelineTracks();
        updateTimelineUI();

        // Asynchronously generate thumbnails for both new parts
        const regenerateThumbnails = async () => {
            const [thumbsA, thumbsB] = await Promise.all([
                generateClipThumbnails(clipToSplit.url, clipToSplit.duration, 5, clipToSplit.sourceStart),
                generateClipThumbnails(newClipPartB.url, newClipPartB.duration, 5, newClipPartB.sourceStart)
            ]);

            clipToSplit.thumbnails = thumbsA;
            newClipPartB.thumbnails = thumbsB;
            
            // Re-render just the affected clips with new thumbnails
            const clipAEl = timelineTracksContainer?.querySelector(`.video-clip[data-clip-id="${clipToSplit.id}"]`);
            if (clipAEl) renderThumbnailsOnClip(clipAEl as HTMLDivElement, thumbsA, clipToSplit);
            
            const clipBEl = timelineTracksContainer?.querySelector(`.video-clip[data-clip-id="${newClipPartB.id}"]`);
            if (clipBEl) renderThumbnailsOnClip(clipBEl as HTMLDivElement, thumbsB, newClipPartB);
        };
        regenerateThumbnails();
    }

    function splitTextOverlay(overlayId: number, splitTime: number) {
        const overlayIndex = timelineOverlays.findIndex(o => o.id === overlayId);
        if (overlayIndex === -1) return;

        const overlayToSplit = timelineOverlays[overlayIndex];

        if (splitTime <= overlayToSplit.start + 0.1 || splitTime >= overlayToSplit.end - 0.1) {
            return;
        }
        
        deselectAllItems();
        
        const originalEnd = overlayToSplit.end;
        overlayToSplit.end = splitTime;

        // Create the new overlay for the second part
        const newOverlay: TextOverlay = {
            ...overlayToSplit, // Copy text, font, color, etc.
            id: nextOverlayId++,
            start: splitTime,
            end: originalEnd,
            element: document.createElement('div'),
            clipElement: document.createElement('div'),
        };

        // Configure the new preview element
        newOverlay.element.className = 'text-overlay';
        newOverlay.element.textContent = newOverlay.text;
        newOverlay.element.addEventListener('mousedown', (e) => handleOverlayDrag(e, newOverlay));
        videoPreviewWrapper?.appendChild(newOverlay.element);
        applyOverlayStyles(newOverlay);

        // Configure the new timeline clip element
        newOverlay.clipElement.className = 'timeline-clip text-clip';
        newOverlay.clipElement.textContent = newOverlay.text;
        newOverlay.clipElement.dataset.overlayId = String(newOverlay.id);
        newOverlay.clipElement.addEventListener('mousedown', handleGenericClipMouseDown);
        newOverlay.clipElement.addEventListener('click', () => handleSelectOverlay(newOverlay.id, newOverlay.clipElement));
        const leftHandle = document.createElement('div');
        leftHandle.className = 'resize-handle left';
        newOverlay.clipElement.appendChild(leftHandle);
        const rightHandle = document.createElement('div');
        rightHandle.className = 'resize-handle right';
        newOverlay.clipElement.appendChild(rightHandle);

        timelineOverlays.splice(overlayIndex + 1, 0, newOverlay);

        renderTimelineTracks();
        updateTimelineUI();
    }
    
    function handleTimelineMouseMove(e: MouseEvent) {
        if (currentTool !== 'split' || !splitIndicator || !timelineScrollContainer) {
            return;
        }
    
        const timelineRect = timelineScrollContainer.getBoundingClientRect();
        const mouseX = e.clientX - timelineRect.left;
        const clampedX = Math.max(0, Math.min(mouseX, timelineRect.width));
        splitIndicator.style.left = `${clampedX}px`;
    }


  // --- Event Listeners ---
  // Tab Listeners
  generatorTabButton?.addEventListener('click', () => switchView('generator-view'));

  studioTabButton?.addEventListener('click', () => switchView('editor-view'));


    // Generator Listeners (Moved to generator.ts)
    // Placeholder - actual listeners initialized in generator.ts
 initializeGenerator(displayError, updateStudioNotification, renderMediaBin).catch(err => {
          console.error("Error reading file:", err);
          alert("Could not read the selected file.");
      }
    }
  });

  clearImageButton?.addEventListener('click', () => {
    if (fileInput) fileInput.value = ''; // Clear the file input
    imageBase64 = '';
    imageMimeType = '';
    if (imagePreview) imagePreview.src = '';
    if (imagePreviewContainer) imagePreviewContainer.style.display = 'none';
  });



  // Editor Listeners
  uploadVideoInput?.addEventListener('change', handleVideoUpload);
  addTextButton?.addEventListener('click', createNewTextOverlay);
  exportVideoButton?.addEventListener('click', () => {
    alert('Export functionality is not yet implemented!');
  });
  selectToolButton?.addEventListener('click', () => setTool('select'));
  splitToolButton?.addEventListener('click', () => setTool('split'));
  addVideoTrackButton?.addEventListener('click', () => addTrack('video'));
  addTextTrackButton?.addEventListener('click', () => addTrack('text'));
  timelineTrackHeaders?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('delete-track-btn')) {
          const trackId = parseInt(target.dataset.trackId!, 10);
          deleteTrack(trackId);
      }
  });


  // Media Bin Drag and Drop
  mediaBin?.addEventListener('dragstart', (e) => {
      const target = e.target as HTMLDivElement;
      if (target.classList.contains('media-clip') && e.dataTransfer) {
          e.dataTransfer.setData('text/plain', target.dataset.clipId!);
          e.dataTransfer.setData('source', 'media-bin');
          target.classList.add('is-dragging');
      }
  });

  mediaBin?.addEventListener('dragend', (e) => {
      const target = e.target as HTMLDivElement;
      if (target.classList.contains('media-clip')) {
          target.classList.remove('is-dragging');
      }
  });

  timelineScrollContainer?.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!timelineScrollContainer) return;

      const marker = getInsertionMarker();
      const source = e.dataTransfer?.getData('source');
      const targetEl = e.target as HTMLElement;
      const trackEl = targetEl.closest<HTMLElement>('.timeline-track');

      document.querySelectorAll('.timeline-track.drop-disallowed').forEach(el => el.classList.remove('drop-disallowed'));

      if (!trackEl) {
          marker.style.display = 'none';
          dropIndex = -1;
          return;
      }

      // Disallow dropping videos onto text tracks
      const isVideoSource = source === 'media-bin' || (source === 'timeline' && draggedTimelineClipId !== null);
      if (isVideoSource && trackEl.dataset.trackType === 'text') {
          marker.style.display = 'none';
          trackEl.classList.add('drop-disallowed');
          dropIndex = -1;
          return;
      }
      
      timelineScrollContainer.classList.add('drop-target-active');
      marker.style.display = 'block';
      marker.style.top = `${trackEl.offsetTop}px`;


      if (sequenceDuration === 0) {
          dropIndex = 0;
          marker.style.left = '0px';
          return;
      }
      
      if (!timelineTracksContainer) return;

      const timelineRect = timelineTracksContainer.getBoundingClientRect();
      const timelineWidth = timelineRect.width;
      if (timelineWidth === 0) return;
      const dropX = e.clientX - timelineRect.left;

      let insertAtIndex = timelineClips.length;
      let smallestDistance = Infinity;

      for (let i = 0; i < timelineClips.length; i++) {
          const clip = timelineClips[i];
          if (clip.id === draggedTimelineClipId) continue;
          const clipStartPos = (clip.start / sequenceDuration) * timelineWidth;
          const clipEndPos = (clip.end / sequenceDuration) * timelineWidth;
          const clipMidPos = clipStartPos + (clipEndPos - clipStartPos) / 2;
          if (dropX < clipMidPos) {
              insertAtIndex = i;
              break;
          }
      }
      dropIndex = insertAtIndex;

      let markerPositionPx = 0;
      if (dropIndex < timelineClips.length) {
          const draggedClipOriginalIndex = timelineClips.findIndex(c => c.id === draggedTimelineClipId);
          const effectiveDropIndex = (draggedTimelineClipId !== null && draggedClipOriginalIndex < dropIndex) ? dropIndex - 1 : dropIndex;

          if (timelineClips[effectiveDropIndex]?.id === draggedTimelineClipId && effectiveDropIndex + 1 < timelineClips.length) {
              markerPositionPx = (timelineClips[effectiveDropIndex+1].start / sequenceDuration) * timelineWidth;
          } else {
              markerPositionPx = (timelineClips[dropIndex].start / sequenceDuration) * timelineWidth;
          }

      } else {
          let lastClipEnd = 0;
          if (timelineClips.length > 0) {
              const lastClip = timelineClips[timelineClips.length - 1];
              lastClipEnd = lastClip.id === draggedTimelineClipId ? lastClip.start : lastClip.end;
          }
          markerPositionPx = (lastClipEnd / sequenceDuration) * timelineWidth;
      }
      marker.style.left = `${markerPositionPx}px`;
  });


  timelineScrollContainer?.addEventListener('dragleave', (e) => {
      if (e.relatedTarget && timelineScrollContainer?.contains(e.relatedTarget as Node)) {
          return;
      }
      timelineScrollContainer?.classList.remove('drop-target-active');
      document.querySelectorAll('.timeline-track.drop-disallowed').forEach(el => el.classList.remove('drop-disallowed'));
      getInsertionMarker().style.display = 'none';
      dropIndex = -1;
  });

  timelineScrollContainer?.addEventListener('drop', (e) => {
      e.preventDefault();
      timelineScrollContainer?.classList.remove('drop-target-active');
      document.querySelectorAll('.timeline-track.drop-disallowed').forEach(el => el.classList.remove('drop-disallowed'));
      getInsertionMarker().style.display = 'none';

      const source = e.dataTransfer?.getData('source');
      const clipIdStr = e.dataTransfer?.getData('text/plain');
      const targetEl = e.target as HTMLElement;
      const trackEl = targetEl.closest<HTMLElement>('.timeline-track');
      
      if (!clipIdStr || !trackEl) {
          dropIndex = -1;
          return;
      }

      const trackId = parseInt(trackEl.dataset.trackId!, 10);
      const trackType = trackEl.dataset.trackType;

      const clipId = parseInt(clipIdStr, 10);
      let indexToInsert = dropIndex > -1 ? dropIndex : timelineClips.length;
      
      const isVideoSource = source === 'media-bin' || (source === 'timeline' && draggedTimelineClipId !== null);
      if (isVideoSource && trackType !== 'video') {
        dropIndex = -1;
        return; // Don't allow drop
      }


      if (source === 'timeline') {
          const clipToMove = timelineClips.find(c => c.id === clipId);
          if (!clipToMove) return;

          // Assign to new track and re-order
          clipToMove.trackId = trackId;
          const originalIndex = timelineClips.findIndex(c => c.id === clipId);
          timelineClips.splice(originalIndex, 1);
          if (originalIndex < indexToInsert) {
              indexToInsert--;
          }
          timelineClips.splice(indexToInsert, 0, clipToMove);
          repackClips();
          renderTimelineTracks();
          updateTimelineUI();
      } else {
          const clip = savedClips.find(c => c.id === clipId);
          if (clip) {
              addClipToTimeline(clip, trackId, indexToInsert);
          }
      }
      dropIndex = -1;
  });

  timelineScrollContainer?.addEventListener('mousedown', handleTimelineSeek);
  timelineRuler?.addEventListener('mousedown', handleTimelineSeek);
  
  timelineScrollContainer?.addEventListener('mousemove', handleTimelineMouseMove);
  timelineScrollContainer?.addEventListener('mouseenter', () => {
      if (currentTool === 'split' && splitIndicator) {
          splitIndicator.style.display = 'block';
      }
  });
  timelineScrollContainer?.addEventListener('mouseleave', () => {
      if (splitIndicator) {
          splitIndicator.style.display = 'none';
      }
  });

  // Initialize Modals (needs displayError, repackClips, renderTimelineTracks, renderTimelineRuler, updateTimelineUI)
 initializeModals(displayError, repackClips, renderTimelineTracks, renderTimelineRuler, updateTimelineUI).catch(error => {
 console.error("Error initializing modals:", error);
 });
  // Final initializations
  initResizers();
  updateStudioNotification();
  switchView('generator-view');

  // Auth Listeners (Moved inside DOMContentLoaded)
  // Adding a slight timeout to ensure all DOM elements are definitely available
  setTimeout(() => {
      const googleSignInButton = document.querySelector<HTMLButtonElement>('#google-sign-in-button');
      // Ensure these are selected correctly now they are potentially inside a larger element
      const signOutButton = document.querySelector<HTMLButtonElement>('#sign-out-button'); // Re-select here as it might be in the new container
      const userNameEl = document.querySelector<HTMLSpanElement>('#user-name');
      const authSection = document.querySelector<HTMLDivElement>('#auth-section');
      const userInfoDisplay = document.querySelector<HTMLDivElement>('.user-info-display');
      const creditBalanceDisplay = document.querySelector<HTMLSpanElement>('#credit-balance'); // Need this here too

      if (googleSignInButton) {
          // Add the editor initialization call here after all necessary DOM elements are selected
          // Pass the dependent functions as arguments
          initializeEditor(displayError, updateStudioNotification, loadClipIntoPreview, applyOverlayStyles, updatePreviewAspectRatio, applyClipTransforms, repackClips, resetEditorView, removeClipFromTimeline, deselectAllItems, generateClipThumbnails, addClipToTimeline, renderMediaBin, getInsertionMarker, handleTimelineClipDragStart, handleTimelineClipDragEnd, handleVideoClipResize, renderThumbnailsOnClip, renderTimelineTracks, renderTimelineRuler, updatePlaybackStatus, updateTimelineUI, handleOverlayDrag, createNewTextOverlay, updatePropertiesPanel, updateTimelineTextClipElement, initResizers, handleTimelineSeek, handleGenericClipMouseDown, handlePropertiesChange, handleResetTransforms, addTrack, deleteTrack, setTool, handleSplitterClick, splitVideoClip, splitTextOverlay, handleTimelineMouseMove);

          googleSignInButton.addEventListener('click', () => signInWithPopup(auth, new GoogleAuthProvider()).catch(console.error));
              }

      if (userInfoDisplay && userNameEl && authSection && userProfilePictureEl && creditBalanceDisplay && signOutButton) {
          initializeAuth(userInfoDisplay, userNameEl, authSection, userProfilePictureEl, creditBalanceDisplay, signOutButton).catch(error => {
                console.error("Error initializing auth state:", error);
              }
          }

    }, 0); // Add a small timeout to ensure DOM is fully ready
 });