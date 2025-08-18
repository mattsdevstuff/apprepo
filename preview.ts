/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as DOM from './dom';
import * as State from './state';
import { TextOverlay, TimelineClip } from './types';
import { updateTimelineUI } from './timeline';
import { handleSelectOverlay } from './selection';

export function updatePreviewAspectRatio() {
    if (!DOM.videoPreviewWrapper) return;
    DOM.videoPreviewWrapper.style.aspectRatio = State.projectAspectRatio.replace(':', ' / ');
    // Recalculate overlay positions as viewport has changed
    State.timelineOverlays.forEach(applyOverlayStyles);
}

export function applyClipTransforms() {
    if (!State.currentClipInPreview || !DOM.videoPreview) return;
    const props = State.currentClipInPreview.properties;
    
    DOM.videoPreview.volume = props.volume;

    const translateX = `${props.position.x}%`;
    const translateY = `${props.position.y}%`;
    
    DOM.videoPreview.style.transform = `translate(${translateX}, ${translateY}) scale(${props.scale}) rotate(${props.rotation}deg)`;
}

export function updatePlaybackStatus(isPlaying: boolean) {
    if (!DOM.playIcon || !DOM.pauseIcon) return;
    if (isPlaying) {
        DOM.playIcon.style.display = 'none';
        DOM.pauseIcon.style.display = 'block';
    } else {
        DOM.playIcon.style.display = 'block';
        DOM.pauseIcon.style.display = 'none';
    }
}

export function loadClipIntoPreview(clip: TimelineClip, time = 0, forcePlay = false) {
    if (!DOM.videoPreview) return;
    const shouldPlay = forcePlay || !DOM.videoPreview.paused;
    State.setIsSeeking(true);
    
    DOM.videoPreview.pause();

    DOM.videoPreview.src = clip.url;
    State.setCurrentClipInPreview(clip);
    applyClipTransforms();

    DOM.videoPreview.addEventListener('loadeddata', () => {
        if (!DOM.videoPreview) return;
        DOM.videoPreview.currentTime = clip.sourceStart + time;
        if (shouldPlay) {
            DOM.videoPreview.play().catch(e => {
                console.error("Playback failed:", e);
                updatePlaybackStatus(false);
            });
        }
        State.setIsSeeking(false);
        updateTimelineUI();
    }, { once: true });
}

// --- Text Overlay Logic ---

export function applyOverlayStyles(overlay: TextOverlay) {
    if (!DOM.videoPreviewWrapper) return;
    const el = overlay.element;
    el.style.fontFamily = overlay.fontFamily;
    el.style.color = overlay.color;
    
    const videoHeight = DOM.videoPreviewWrapper.offsetHeight;
    const responsiveSize = (overlay.fontSize / 500) * videoHeight;
    el.style.fontSize = `${responsiveSize}px`;

    el.style.left = overlay.position.left;
    el.style.top = overlay.position.top;
    el.style.transform = 'translate(-50%, -50%)';
}

export function handleOverlayDrag(e: MouseEvent, overlay: TextOverlay) {
    e.preventDefault();
    document.body.classList.add('is-dragging-overlay');
    if (!DOM.videoPreviewWrapper) return;

    const wrapperRect = DOM.videoPreviewWrapper.getBoundingClientRect();

    const onMouseMove = (moveEvent: MouseEvent) => {
        const x = moveEvent.clientX - wrapperRect.left;
        const y = moveEvent.clientY - wrapperRect.top;

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
    if (!DOM.videoPreview) return;
    
    let targetTrackId: number;
    const firstTextTrack = State.tracks.find(t => t.type === 'text');
    if (firstTextTrack) {
        targetTrackId = firstTextTrack.id;
    } else {
        targetTrackId = State.nextTrackId;
        State.addTrack('text');
    }

    const currentTime = State.currentClipInPreview ? State.currentClipInPreview.start + (DOM.videoPreview.currentTime - State.currentClipInPreview.sourceStart) : 0;
    const start = currentTime;
    const end = Math.min(start + 4, State.sequenceDuration);

    const newOverlay = State.addTextOverlay({ start, end, trackId: targetTrackId });
    if (!newOverlay) return;

    newOverlay.element.addEventListener('mousedown', (e) => handleOverlayDrag(e, newOverlay));
    DOM.videoPreviewWrapper?.appendChild(newOverlay.element);
    applyOverlayStyles(newOverlay);
    
    handleSelectOverlay(newOverlay.id, newOverlay.clipElement);
    updateTimelineUI();
}

export function initPreview() {
    DOM.addTextButton?.addEventListener('click', createNewTextOverlay);
}