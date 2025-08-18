/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as DOM from './dom';
import * as State from './state';
import { SavedClip } from './types';

export function renderMediaBin() {
    if (!DOM.mediaBin) return;
    DOM.mediaBin.innerHTML = '';
    if (State.savedClips.length === 0) {
        DOM.mediaBin.innerHTML = `
            <div class="placeholder">
              Add clips from the Generator to see them here.
            </div>`;
        return;
    }

    State.savedClips.forEach(clip => {
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
        DOM.mediaBin.appendChild(clipEl);
    });
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
            id: State.nextClipId,
            url: objectURL,
            blob: file,
        };
        State.incrementNextClipId();
        State.addSavedClip(newSavedClip);
    }
    
    renderMediaBin();

    input.value = '';
}

function handleMediaBinDragStart(e: DragEvent) {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains('media-clip') && e.dataTransfer) {
        e.dataTransfer.setData('text/plain', target.dataset.clipId!);
        e.dataTransfer.setData('source', 'media-bin');
        target.classList.add('is-dragging');
    }
}

function handleMediaBinDragEnd(e: DragEvent) {
    const target = e.target as HTMLDivElement;
    if (target.classList.contains('media-clip')) {
        target.classList.remove('is-dragging');
    }
}

export function initMediaBin() {
    DOM.uploadVideoInput?.addEventListener('change', handleVideoUpload);
    DOM.mediaBin?.addEventListener('dragstart', handleMediaBinDragStart);
    DOM.mediaBin?.addEventListener('dragend', handleMediaBinDragEnd);
}
