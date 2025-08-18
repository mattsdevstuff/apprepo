import {
  sequenceDuration, currentClipInPreview, isSeeking, timelineClips, timelineOverlays, 
  type TimelineClip, type TextOverlay
} from './state';
import { formatTime } from './utils';

// Placeholder for functions used but not yet moved
declare function loadClipIntoPreview(clip: TimelineClip, time?: number, forcePlay?: boolean): void;
declare function updateTimelineTextClipElement(overlay: TextOverlay): void;

export function initializeEditor() {
  // DOM Element Selections
  const videoPreview = document.querySelector<HTMLVideoElement>('#video-preview');
  const playPauseButton = document.querySelector<HTMLButtonElement>('#play-pause-button');
  const playIcon = document.querySelector<HTMLElement>('#play-icon');
  const pauseIcon = document.querySelector<HTMLElement>('#pause-icon');
  const currentTimeEl = document.querySelector<HTMLSpanElement>('#current-time');
  const totalDurationEl = document.querySelector<HTMLSpanElement>('#total-duration');
  const timelineTracksContainer = document.querySelector<HTMLDivElement>('#timeline-tracks'); // Needed for updateTimelineUI
  const playhead = document.querySelector<HTMLDivElement>('#playhead'); // Needed for updateTimelineUI

  // Properties Panel
  const propertiesPlaceholder = document.querySelector<HTMLDivElement>('#properties-placeholder');
  const textProperties = document.querySelector<HTMLDivElement>('#text-properties');
  const propTextContent = document.querySelector<HTMLTextAreaElement>('#prop-text-content');
  const propFontFamily = document.querySelector<HTMLSelectElement>('#prop-font-family');
  const propFontColor = document.querySelector<HTMLInputElement>('#prop-font-color');
  const propFontSize = document.querySelector<HTMLInputElement>('#prop-font-size');
  const propFontSizeValue = document.querySelector<HTMLSpanElement>('#prop-font-size-value');
  const videoProperties = document.querySelector<HTMLDivElement>('#video-properties');
  const propVideoVolume = document.querySelector<HTMLInputElement>('#prop-video-volume');
  const propVideoVolumeValue = document.querySelector<HTMLSpanElement>('#prop-video-volume-value');
  const propVideoScale = document.querySelector<HTMLInputElement>('#prop-video-scale');
  const propVideoScaleValue = document.querySelector<HTMLSpanElement>('#prop-video-scale-value');
  const propVideoPosX = document.querySelector<HTMLInputElement>('#prop-video-pos-x');
  const propVideoPosXValue = document.querySelector<HTMLSpanElement>('#prop-video-pos-x-value');
  const propVideoPosY = document.querySelector<HTMLInputElement>('#prop-video-pos-y');
  const propVideoPosYValue = document.querySelector<HTMLSpanElement>('#prop-video-pos-y-value');

  // Functions
  function applyOverlayStyles(overlay: TextOverlay) {
      if (!videoPreviewWrapper) return;
      const el = overlay.element;
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
      
      const onMouseUp = () => {\n          document.removeEventListener(\'mousemove\', onMouseMove);\n          document.removeEventListener(\'mouseup\', onMouseUp);\n          document.body.classList.remove(\'is-dragging-overlay\');\n      };\n\n      document.addEventListener(\'mousemove\', onMouseMove);\n      document.addEventListener(\'mouseup\', onMouseUp);\n  }

  function updatePlaybackStatus(isPlaying: boolean) {
      if (!playIcon || !pauseIcon) return;
      if (isPlaying) {
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'block';
      } else {
          playIcon.style.display = 'block';
          pauseIcon.style.display = 'none';
      }
  }

  function updateTimelineUI() {
      if (isSeeking || !videoPreview) return;

      let globalTime = 0;
      if (currentClipInPreview) {
          globalTime = currentClipInPreview.start + (videoPreview.currentTime - currentClipInPreview.sourceStart);
      }

      // Update time display
      if (currentTimeEl) currentTimeEl.textContent = formatTime(globalTime);
      if (totalDurationEl) totalDurationEl.textContent = formatTime(sequenceDuration);

      // Update playhead
      const percentComplete = sequenceDuration > 0 ? (globalTime / sequenceDuration) * 100 : 0;
      if (playhead) playhead.style.left = `${percentComplete}%`;

      // Update text overlays
      timelineOverlays.forEach(overlay => {
          const shouldShow = globalTime >= overlay.start && globalTime < overlay.end;
          overlay.element.style.display = shouldShow ? 'block' : 'none';
      });

      // Highlight active clip on timeline
      document.querySelectorAll('.timeline-clip.video-clip.active').forEach(el => el.classList.remove('active'));
      if (currentClipInPreview && timelineTracksContainer) {
          const activeClipEl = timelineTracksContainer.querySelector(`.video-clip[data-clip-id="${currentClipInPreview.id}"]`);
          if (activeClipEl) {
              activeClipEl.classList.add('active');
          }
      }
  }

  function handleSelectClip(clipId: number, element: HTMLDivElement) {
    deselectAllItems();
    selectedClipId = clipId;
    element.classList.add('is-selected');
    updatePropertiesPanel();
}

function handleSelectOverlay(overlayId: number, element: HTMLDivElement) {
    deselectAllItems();
    selectedOverlayId = overlayId;
    element.classList.add('is-selected');
    updatePropertiesPanel();
}

function deselectAllItems() {
    selectedClipId = null;
    selectedOverlayId = null;
    document.querySelectorAll('.timeline-clip.is-selected').forEach(el => el.classList.remove('is-selected'));
    document.querySelectorAll('.text-overlay.is-selected').forEach(el => el.classList.remove('is-selected'));
    updatePropertiesPanel();
}

function updatePropertiesPanel() {
    if (!textProperties || !videoProperties || !propertiesPlaceholder) return;
    if (selectedOverlayId !== null) {
        const overlay = timelineOverlays.find(o => o.id === selectedOverlayId);
        if (!overlay) {
            deselectAllItems(); 
            return;
        }
        textProperties.style.display = 'block';
        videoProperties.style.display = 'none';
        propertiesPlaceholder.style.display = 'none';

        // Populate controls
        if (propTextContent) propTextContent.value = overlay.text;
        if (propFontFamily) propFontFamily.value = overlay.fontFamily;
        if (propFontColor) propFontColor.value = overlay.color;
        if (propFontSize) propFontSize.value = String(overlay.fontSize);
        if (propFontSizeValue) propFontSizeValue.textContent = String(overlay.fontSize);

    } else if (selectedClipId !== null) {
        const clip = timelineClips.find(c => c.id === selectedClipId);
        if (!clip) {
            deselectAllItems();
            return;
        }
        textProperties.style.display = 'none';
        videoProperties.style.display = 'block';
        propertiesPlaceholder.style.display = 'none';

        // Populate video controls
        const props = clip.properties;
        if (propVideoVolume) propVideoVolume.value = String(props.volume * 100);
        if (propVideoVolumeValue) propVideoVolumeValue.textContent = `${Math.round(props.volume * 100)}%`;
        if (propVideoScale) propVideoScale.value = String(props.scale * 100);
        if (propVideoScaleValue) propVideoScaleValue.textContent = `${Math.round(props.scale * 100)}%`;
        if (propVideoPosX) propVideoPosX.value = String(props.position.x);
        if (propVideoPosXValue) propVideoPosXValue.textContent = `${props.position.x}%`;
        if (propVideoPosY) propVideoPosYValue.textContent = `${props.position.y}%`;
        
        applyClipTransforms();
    } else {
        // Hide all panels, show placeholder
        textProperties.style.display = 'none';
        videoProperties.style.display = 'none';
        propertiesPlaceholder.style.display = 'block';
    }
}
  // Event Listeners
  videoPreview?.addEventListener('timeupdate', updateTimelineUI);
  videoPreview?.addEventListener('play', () => updatePlaybackStatus(true));
  videoPreview?.addEventListener('pause', () => updatePlaybackStatus(false));
  videoPreview?.addEventListener('ended', () => {
      if (isSeeking || !currentClipInPreview) {
          updatePlaybackStatus(false);
          return;
      }

      const currentIndex = timelineClips.findIndex(c => c.id === currentClipInPreview!.id);
      const nextIndex = currentIndex + 1;

      if (nextIndex < timelineClips.length) {
          loadClipIntoPreview(timelineClips[nextIndex], 0, true);
      } else {
          updatePlaybackStatus(false);
          if (timelineClips.length > 0) {
              loadClipIntoPreview(timelineClips[0], 0, false);
          }
      }
  });

  playPauseButton?.addEventListener('click', () => {
      if (!videoPreview) return;
      if (videoPreview.paused) {
          const globalTime = currentClipInPreview ? currentClipInPreview.start + (videoPreview.currentTime - currentClipInPreview.sourceStart) : 0;
          
          if (sequenceDuration > 0 && Math.abs(globalTime - sequenceDuration) < 0.1) {
              if (timelineClips.length > 0) loadClipIntoPreview(timelineClips[0], 0, true);
              return;
          }

          if (!currentClipInPreview && timelineClips.length > 0) {
              loadClipIntoPreview(timelineClips[0], 0, true);
          } else if (currentClipInPreview){
              videoPreview.play().catch(console.error);
          }
      } else {
          videoPreview.pause();
      }
  });

  // Properties Panel listeners
  const allPropInputs = document.querySelectorAll('#video-properties input, #video-properties select, #text-properties input, #text-properties select, #text-properties textarea');
  allPropInputs.forEach(input => {
    input.addEventListener('input', handlePropertiesChange);
  });
  resetTransformButton?.addEventListener('click', handleResetTransforms);

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
        if (!clip || !propVideoVolume || !propVideoScale || !propVideoPosX || !propVideoPosY) return; // Removed rotation for now

        clip.properties.volume = (parseInt(propVideoVolume.value, 10)) / 100;
        clip.properties.scale = (parseInt(propVideoScale.value, 10)) / 100;
        clip.properties.position.x = parseInt(propVideoPosX.value, 10);
        clip.properties.position.y = parseInt(propVideoPosY.value, 10);

        if (propVideoVolumeValue) propVideoVolumeValue.textContent = `${Math.round(clip.properties.volume * 100)}%`;
        if (propVideoScaleValue) propVideoScaleValue.textContent = `${Math.round(clip.properties.scale * 100)}%`;
        if (propVideoPosXValue) propVideoPosXValue.textContent = `${clip.properties.position.x}%`;
        if (propVideoPosYValue) propVideoPosYValue.textContent = `${clip.properties.position.y}%`;
        
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
}