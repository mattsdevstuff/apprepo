/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as DOM from './dom';
import * as State from './state';
import { renderMediaBin } from './mediaBin';
import { renderTimelineRuler, renderTimelineTracks, repackClips, updateTimelineUI } from './timeline';
import { applyOverlayStyles } from './preview';

// --- UI Logic ---
export function setUILoading(isLoading: boolean) {
  if (DOM.generateButton) DOM.generateButton.disabled = isLoading;
  DOM.controlsContainer?.querySelectorAll('input, textarea, select, button').forEach(el => (el as HTMLInputElement).disabled = isLoading);
  
  if (isLoading && DOM.statusEl) {
    DOM.statusEl.innerHTML = `
      <div>
        <div class="loader"></div>
        <p>Generating video, please wait...</p>
        <p style="font-size: 0.9em; color: var(--text-muted-color)">(This may take a minute or two)</p>
      </div>`;
    DOM.statusEl.style.display = 'flex';
  }
}

export function displayError(message: string) {
    if (DOM.statusEl) {
      DOM.statusEl.innerHTML = `<p class="error">${message}</p>`;
      DOM.statusEl.style.display = 'flex';
    }

    let title = "An Unknown Error Occurred";
    let body = `<p>An unexpected error occurred:</p><p><code>${message}</code></p>`;
    // ... (rest of the detailed error parsing logic from original file)
    
    if (DOM.errorModalBody) DOM.errorModalBody.innerHTML = body;
    const modalTitle = DOM.errorModal?.querySelector('.modal-title');
    if (modalTitle) (modalTitle as HTMLElement).textContent = title;
    if (DOM.errorModal) DOM.errorModal.style.display = 'flex';
}

export function switchView(viewId: 'generator-view' | 'editor-view') {
  if (viewId === 'generator-view') {
    if (DOM.generatorView) DOM.generatorView.style.display = 'block';
    if (DOM.editorView) DOM.editorView.style.display = 'none';
    DOM.generatorTabButton?.classList.add('active');
    DOM.studioTabButton?.classList.remove('active');
  } else {
    if (DOM.generatorView) DOM.generatorView.style.display = 'none';
    if (DOM.editorView) DOM.editorView.style.display = 'flex';
    DOM.generatorTabButton?.classList.remove('active');
    DOM.studioTabButton?.classList.add('active');
    State.resetNewClipsCount();
    updateStudioNotification();
    renderMediaBin();
    renderTimelineTracks();
  }
  document.body.classList.toggle('generator-active', viewId === 'generator-view');
}

export function updateStudioNotification() {
  if (!DOM.studioNotificationBadge) return;
  if (State.newClipsCount > 0) {
    DOM.studioNotificationBadge.style.display = 'block';
    DOM.studioNotificationBadge.textContent = String(State.newClipsCount);
  } else {
    DOM.studioNotificationBadge.style.display = 'none';
  }
}

// --- Modals ---
export function openSettingsModal() {
    if (DOM.settingsModal && DOM.settingDuration) {
        DOM.settingDuration.value = String(State.sequenceDuration > 0 ? State.sequenceDuration : 15);
        DOM.settingsModal.style.display = 'flex';
    }
}

export function closeSettingsModal() {
    if (DOM.settingsModal) {
        DOM.settingsModal.style.display = 'none';
    }
}

export function closeCreditsModal() {
    if (DOM.creditsModal) {
        DOM.creditsModal.style.display = 'none';
    }
}

export function saveSettings() {
    if (DOM.settingDuration) {
        const newDuration = parseInt(DOM.settingDuration.value, 10);
        if (!isNaN(newDuration) && newDuration > 0 && newDuration <= 60) {
            const contentDuration = State.timelineClips.reduce((acc, clip) => acc + clip.duration, 0);
            State.setSequenceDuration(Math.max(newDuration, Math.ceil(contentDuration)));
            
            repackClips();
            renderTimelineTracks();
            renderTimelineRuler();
            updateTimelineUI();
        } else {
            alert("Please enter a valid duration between 1 and 60 seconds.");
        }
    }
    closeSettingsModal();
}

export function closeErrorModal() {
    if (DOM.errorModal) {
        DOM.errorModal.style.display = 'none';
    }
}

export function initUI() {
    // Simple dropdown toggle for user profile
    DOM.userProfileTrigger?.addEventListener('click', (e) => {
        e.stopPropagation();
        DOM.userProfileDropdown?.classList.toggle('show');
    });

    DOM.buyCreditsButton?.addEventListener('click', () => {
        if (DOM.creditsModal) {
            DOM.creditsModal.style.display = 'flex';
        }
    });

    DOM.creditsCancelButton?.addEventListener('click', closeCreditsModal);

    window.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).classList.contains('modal')) {
            closeSettingsModal();
            closeCreditsModal();
            closeErrorModal();
        }

        if (!DOM.userProfileTrigger?.contains(e.target as Node) && !DOM.userProfileDropdown?.contains(e.target as Node)) {
            DOM.userProfileDropdown?.classList.remove('show');
        }
    });
}

// --- Resizer Logic ---
export function initResizers() {
    const MIN_PANEL_WIDTH = 150;
    const MIN_PREVIEW_WIDTH = 300;
    const MIN_TIMELINE_HEIGHT = 80;
    const MIN_EDITOR_BODY_HEIGHT = 200;

    const createResizer = (resizerEl: HTMLElement | null, onDrag: (dx: number, dy: number) => void) => {
        resizerEl?.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const startX = e.clientX;
            const startY = e.clientY;
            
            const onMouseMove = (moveEvent: MouseEvent) => {
                onDrag(moveEvent.clientX - startX, moveEvent.clientY - startY);
            };

            const onMouseUp = () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
                document.body.className = document.body.className.replace(/is-resizing(-\w)?/g, '');
            };

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        });
    };

    createResizer(DOM.resizerV1, (dx) => {
        document.body.classList.add('is-resizing-v');
        if (!DOM.mediaPanel || !DOM.editorBody || !DOM.toolsPanel) return;
        const newLeftWidth = (DOM.mediaPanel.offsetWidth || 0) + dx;
        if (newLeftWidth >= MIN_PANEL_WIDTH && DOM.editorBody.offsetWidth - newLeftWidth - DOM.toolsPanel.offsetWidth >= MIN_PREVIEW_WIDTH) {
            DOM.mediaPanel.style.width = `${newLeftWidth}px`;
            DOM.mediaPanel.style.flexBasis = 'auto';
        }
    });

    createResizer(DOM.resizerV2, (dx) => {
        document.body.classList.add('is-resizing-v');
        if (!DOM.toolsPanel || !DOM.editorBody || !DOM.mediaPanel) return;
        const newRightWidth = (DOM.toolsPanel.offsetWidth || 0) - dx;
        if (newRightWidth >= MIN_PANEL_WIDTH && DOM.editorBody.offsetWidth - newRightWidth - DOM.mediaPanel.offsetWidth >= MIN_PREVIEW_WIDTH) {
            DOM.toolsPanel.style.width = `${newRightWidth}px`;
            DOM.toolsPanel.style.flexBasis = 'auto';
        }
    });

    createResizer(DOM.resizerH, (_, dy) => {
        document.body.classList.add('is-resizing-h');
        const editorMainContent = DOM.editorBody?.parentElement as HTMLElement;
        if (!editorMainContent || !DOM.timelineContainer) return;
        const newBottomHeight = (DOM.timelineContainer.offsetHeight || 0) - dy;
        if (newBottomHeight > MIN_TIMELINE_HEIGHT && newBottomHeight < (editorMainContent.offsetHeight - MIN_EDITOR_BODY_HEIGHT)) {
            DOM.timelineContainer.style.height = `${newBottomHeight}px`;
            DOM.timelineContainer.style.flexBasis = 'auto';
            State.timelineOverlays.forEach(applyOverlayStyles);
            renderTimelineRuler();
        }
    });
}
