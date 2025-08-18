/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { SavedClip, TimelineClip, TextOverlay, Track, TrackType } from './types';
import { renderTimelineTracks } from './timeline';
import { deselectAllItems } from './selection';

// --- State ---
export let imageBase64 = '';
export let imageMimeType = '';
export let timelineOverlays: TextOverlay[] = [];
export let nextOverlayId = 0;
export let sequenceDuration = 0;
export let savedClips: SavedClip[] = [];
export let nextClipId = 0;
export let newClipsCount = 0;
export let timelineClips: TimelineClip[] = [];
export let currentClipInPreview: TimelineClip | null = null;
export let isSeeking = false;
export let dropIndex = -1;
export let selectedClipId: number | null = null;
export let selectedOverlayId: number | null = null;
export let draggedTimelineClipId: number | null = null;
export let projectAspectRatio = '9:16';
export let tracks: Track[] = [{ id: 0, type: 'video' }];
export let nextTrackId = 1;

// --- State Setters/Modifiers ---

export const setImageBase64 = (val: string) => imageBase64 = val;
export const setImageMimeType = (val: string) => imageMimeType = val;
export const setSequenceDuration = (val: number) => sequenceDuration = val;
export const addSavedClip = (clip: SavedClip) => savedClips.push(clip);
export const incrementNextClipId = () => nextClipId++;
export const incrementNewClipsCount = () => newClipsCount++;
export const resetNewClipsCount = () => newClipsCount = 0;
export const setCurrentClipInPreview = (clip: TimelineClip | null) => currentClipInPreview = clip;
export const setIsSeeking = (val: boolean) => isSeeking = val;
export const setDropIndex = (val: number) => dropIndex = val;
export const setSelectedClipId = (id: number | null) => selectedClipId = id;
export const setSelectedOverlayId = (id: number | null) => selectedOverlayId = id;
export const setDraggedTimelineClipId = (id: number | null) => draggedTimelineClipId = id;
export const setProjectAspectRatio = (val: string) => projectAspectRatio = val;

export function addTimelineClip(clip: TimelineClip, index: number) {
    timelineClips.splice(index, 0, clip);
}

export function removeTimelineClip(clipId: number) {
    timelineClips = timelineClips.filter(c => c.id !== clipId);
}

export function addTrack(type: TrackType) {
    tracks.push({ id: nextTrackId++, type });
    renderTimelineTracks();
}

export function deleteTrack(trackId: number) {
    tracks = tracks.filter(t => t.id !== trackId);
    
    // Remove associated clips and overlays
    timelineClips = timelineClips.filter(c => c.trackId !== trackId);
    const overlaysToRemove = timelineOverlays.filter(o => o.trackId === trackId);
    overlaysToRemove.forEach(o => o.element.remove());
    timelineOverlays = timelineOverlays.filter(o => o.trackId !== trackId);
    
    if (selectedClipId && timelineClips.every(c => c.id !== selectedClipId)) {
        deselectAllItems();
    }
    if (selectedOverlayId && timelineOverlays.every(o => o.id !== selectedOverlayId)) {
        deselectAllItems();
    }

    renderTimelineTracks();
}

export function addTextOverlay(props: {start: number, end: number, trackId: number}): TextOverlay | null {
    const id = nextOverlayId++;
    const overlay: TextOverlay = {
        id,
        trackId: props.trackId,
        text: 'New Caption',
        start: props.start,
        end: props.end,
        element: document.createElement('div'),
        clipElement: document.createElement('div'),
        fontFamily: 'Google Sans',
        color: '#ffffff',
        fontSize: 40,
        position: { top: '50%', left: '50%' },
    };

    overlay.element.className = 'text-overlay';
    overlay.element.textContent = overlay.text;

    overlay.clipElement.className = 'timeline-clip text-clip';
    overlay.clipElement.textContent = overlay.text;
    overlay.clipElement.dataset.overlayId = String(id);
    
    const leftHandle = document.createElement('div');
    leftHandle.className = 'resize-handle left';
    overlay.clipElement.appendChild(leftHandle);
    const rightHandle = document.createElement('div');
    rightHandle.className = 'resize-handle right';
    overlay.clipElement.appendChild(rightHandle);
    
    timelineOverlays.push(overlay);
    renderTimelineTracks();
    return overlay;
}
