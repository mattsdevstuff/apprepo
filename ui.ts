


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

export function updateDashboardStats(credits: number) {
    if (DOM.dashboardCreditBalance) {
        DOM.dashboardCreditBalance.innerHTML = `<i class="fa-solid fa-coins"></i> ${credits}`;
    }
}

export function switchTool(tool: 'dashboard' | 'video-creator' | 'auto-voiceover' | 'video-editor') {
    if (!DOM.dashboardToolView || !DOM.videoCreatorToolView || !DOM.autoVoiceoverToolView || !DOM.videoEditorToolView) return;

    // Hide all views first
    DOM.dashboardToolView.style.display = 'none';
    DOM.videoCreatorToolView.style.display = 'none';
    DOM.autoVoiceoverToolView.style.display = 'none';
    DOM.videoEditorToolView.style.display = 'none';

    if (tool === 'dashboard') {
        DOM.dashboardToolView.style.display = 'block';
    } else if (tool === 'video-creator') {
        DOM.videoCreatorToolView.style.display = 'block';
    } else if (tool === 'auto-voiceover') {
        DOM.autoVoiceoverToolView.style.display = 'block';
    } else if (tool === 'video-editor') {
        DOM.videoEditorToolView.style.display = 'flex';
        State.resetNewClipsCount();
        renderMediaBin();
        renderTimelineTracks();
    }

    DOM.navLinks?.forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-tool') === tool);
    });
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

export function openCreditsModal() {
    if (DOM.creditsModal) {
        // Handle credit balance display
        if (DOM.userActions?.style.display === 'flex' && DOM.creditBalanceDisplay && DOM.modalCreditBalanceDisplay) {
            DOM.modalCreditBalanceDisplay.innerHTML = DOM.creditBalanceDisplay.innerHTML;
            DOM.modalCreditBalanceDisplay.style.display = 'flex';
        } else if (DOM.modalCreditBalanceDisplay) {
            DOM.modalCreditBalanceDisplay.style.display = 'none';
        }

        DOM.creditsModal.style.display = 'flex';
        // Use a microtask delay to ensure the display property is applied before adding the class
        queueMicrotask(() => {
            DOM.creditsModal?.classList.add('show');
        });
    }
}


export function closeCreditsModal() {
    if (DOM.creditsModal) {
        DOM.creditsModal.classList.remove('show');
        // Set display to none after the transition ends
        const handleTransitionEnd = (event: TransitionEvent) => {
            // Ensure we only trigger on the overlay's transition, not its children
            if (event.target === DOM.creditsModal && !DOM.creditsModal?.classList.contains('show')) {
                DOM.creditsModal.style.display = 'none';
                DOM.creditsModal.removeEventListener('transitionend', handleTransitionEnd);
            }
        };
        DOM.creditsModal.addEventListener('transitionend', handleTransitionEnd);
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
    // Sidebar Toggle
    DOM.sidebarToggle?.addEventListener('click', () => {
        DOM.sidebar?.classList.toggle('collapsed');
        const isCollapsed = DOM.sidebar?.classList.contains('collapsed');
        const toggleIcon = DOM.sidebarToggle?.querySelector('i');
        if (toggleIcon) {
            toggleIcon.className = isCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left';
        }
    });

    // Tool navigation
    DOM.navLinks?.forEach(link => {
        link.addEventListener('click', () => {
            const tool = link.dataset.tool as 'dashboard' | 'video-creator' | 'auto-voiceover' | 'video-editor';
            if (tool) {
                switchTool(tool);
            }
        });
    });

    // User profile dropdown
    DOM.userProfileTrigger?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpening = !DOM.userProfileDropdown?.classList.contains('show');
        DOM.userProfileDropdown?.classList.toggle('show');
        DOM.userProfileTrigger.setAttribute('aria-expanded', String(isOpening));
    });

    DOM.buyCreditsButton?.addEventListener('click', openCreditsModal);

    window.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;

        // Generic modal closer using data-attribute
        if (target.hasAttribute('data-close-modal')) {
             if (DOM.creditsModal?.classList.contains('show')) {
                closeCreditsModal();
             }
        }
        
        // Handling for simpler modals without animation
        if (target === DOM.settingsModal) closeSettingsModal();
        if (target === DOM.errorModal) closeErrorModal();

        // Close dropdowns if click is outside
        if (!DOM.userProfileTrigger?.contains(target) && !DOM.userProfileDropdown?.contains(target)) {
            DOM.userProfileDropdown?.classList.remove('show');
            DOM.userProfileTrigger?.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Add escape key listener for all modals
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (DOM.settingsModal?.style.display !== 'none') closeSettingsModal();
            if (DOM.creditsModal?.classList.contains('show')) closeCreditsModal();
            if (DOM.errorModal?.style.display !== 'none') closeErrorModal();
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
