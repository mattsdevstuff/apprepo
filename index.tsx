/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { initAuth } from './auth';
import * as DOM from './dom';
import { initGenerator } from './generator';
import { initMediaBin } from './mediaBin';
import { initPreview, updatePlaybackStatus, loadClipIntoPreview } from './preview';
import { initPropertiesPanel } from './propertiesPanel';
import { handleSelectOverlay } from './selection';
import * as State from './state';
import { initTimeline, updateTimelineUI, repackClips } from './timeline';
import { initTools } from './tools';
import { initUI, switchView, initResizers, openSettingsModal, saveSettings, closeSettingsModal, closeErrorModal, updateStudioNotification } from './ui';

window.addEventListener('DOMContentLoaded', () => {
    document.title = 'AI YouTube Shorts Creator';

    // --- Initializations ---
    initUI();
    initAuth();
    initGenerator();
    initMediaBin();
    initPreview();
    initPropertiesPanel();
    initTimeline();
    initTools();
    initResizers();

    // --- Global Event Listeners (Orchestration) ---

    // Tab Switching
    DOM.generatorTabButton?.addEventListener('click', () => switchView('generator-view'));
    DOM.studioTabButton?.addEventListener('click', () => switchView('editor-view'));
    
    // Playback Control
    DOM.playPauseButton?.addEventListener('click', () => {
        if (!DOM.videoPreview) return;
        if (DOM.videoPreview.paused) {
            const globalTime = State.currentClipInPreview ? State.currentClipInPreview.start + (DOM.videoPreview.currentTime - State.currentClipInPreview.sourceStart) : 0;
            
            // If at the end, restart from the beginning
            if (State.sequenceDuration > 0 && Math.abs(globalTime - State.sequenceDuration) < 0.1) {
                if (State.timelineClips.length > 0) loadClipIntoPreview(State.timelineClips[0], 0, true);
                return;
            }

            // If no clip is loaded, load the first one and play
            if (!State.currentClipInPreview && State.timelineClips.length > 0) {
                loadClipIntoPreview(State.timelineClips[0], 0, true);
            } else if (State.currentClipInPreview){
                DOM.videoPreview.play().catch(console.error);
            }
        } else {
            DOM.videoPreview.pause();
        }
    });

    // Video Preview Listeners
    DOM.videoPreview?.addEventListener('timeupdate', updateTimelineUI);
    DOM.videoPreview?.addEventListener('play', () => updatePlaybackStatus(true));
    DOM.videoPreview?.addEventListener('pause', () => updatePlaybackStatus(false));
    DOM.videoPreview?.addEventListener('ended', () => {
        if (State.isSeeking || !State.currentClipInPreview) {
            updatePlaybackStatus(false);
            return;
        }

        const currentIndex = State.timelineClips.findIndex(c => c.id === State.currentClipInPreview!.id);
        const nextIndex = currentIndex + 1;

        if (nextIndex < State.timelineClips.length) {
            loadClipIntoPreview(State.timelineClips[nextIndex], 0, true);
        } else {
            updatePlaybackStatus(false);
            if (State.timelineClips.length > 0) {
                // Loop back to the start but don't play
                loadClipIntoPreview(State.timelineClips[0], 0, false);
            }
        }
    });
    
    // Track Management
    DOM.addVideoTrackButton?.addEventListener('click', () => State.addTrack('video'));
    DOM.addTextTrackButton?.addEventListener('click', () => State.addTrack('text'));
    DOM.timelineTrackHeaders?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('delete-track-btn')) {
            const trackId = parseInt(target.dataset.trackId!, 10);
            State.deleteTrack(trackId);
            repackClips();
            updateTimelineUI();
        }
    });

    // Modal Listeners
    DOM.sequenceSettingsButton?.addEventListener('click', openSettingsModal);
    DOM.settingsSaveButton?.addEventListener('click', saveSettings);
    DOM.settingsCancelButton?.addEventListener('click', closeSettingsModal);
    DOM.errorModalClose?.addEventListener('click', closeErrorModal);

    // Misc
    DOM.exportVideoButton?.addEventListener('click', () => {
      alert('Export functionality is not yet implemented!');
    });


    // --- Final Setup ---
    updateStudioNotification();
    switchView('generator-view');
});
