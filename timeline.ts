/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as DOM from './dom';
import * as State from './state';
import { SavedClip, TimelineClip, TextOverlay } from './types';
import { formatTime } from './utils';
import { loadClipIntoPreview, updatePreviewAspectRatio, handleOverlayDrag } from './preview';
import { updatePropertiesPanel } from './propertiesPanel';
import { handleSelectClip, handleSelectOverlay, deselectAllItems } from './selection';
import { currentTool } from './tools';


export function renderTimelineRuler() {
    if (!DOM.timelineRuler || !DOM.timelineScrollContainer) return;
    DOM.timelineRuler.innerHTML = '';
    if (State.sequenceDuration <= 0) return;

    const rulerWidth = DOM.timelineScrollContainer.offsetWidth;
    const pixelsPerSecond = rulerWidth / State.sequenceDuration;

    let majorTickInterval = 1;
    if (pixelsPerSecond < 10) majorTickInterval = 10;
    else if (pixelsPerSecond < 40) majorTickInterval = 5;

    for (let time = 0; time <= State.sequenceDuration; time += majorTickInterval) {
        const positionPercent = (time / State.sequenceDuration) * 100;
        if (positionPercent > 100) continue;

        const tick = document.createElement('div');
        tick.className = 'ruler-tick major';
        tick.style.left = `${positionPercent}%`;

        const label = document.createElement('span');
        label.textContent = formatTime(time);
        tick.appendChild(label);
        DOM.timelineRuler.appendChild(tick);
    }
}

export function updateTimelineUI() {
    if (State.isSeeking || !DOM.videoPreview) return;

    let globalTime = 0;
    if (State.currentClipInPreview) {
        globalTime = State.currentClipInPreview.start + (DOM.videoPreview.currentTime - State.currentClipInPreview.sourceStart);
    }

    if (DOM.currentTimeEl) DOM.currentTimeEl.textContent = formatTime(globalTime);
    if (DOM.totalDurationEl) DOM.totalDurationEl.textContent = formatTime(State.sequenceDuration);

    const percentComplete = State.sequenceDuration > 0 ? (globalTime / State.sequenceDuration) * 100 : 0;
    if (DOM.playhead) DOM.playhead.style.left = `${percentComplete}%`;

    State.timelineOverlays.forEach(overlay => {
        const shouldShow = globalTime >= overlay.start && globalTime < overlay.end;
        overlay.element.style.display = shouldShow ? 'block' : 'none';
    });

    document.querySelectorAll('.timeline-clip.video-clip.active').forEach(el => el.classList.remove('active'));
    if (State.currentClipInPreview && DOM.timelineTracksContainer) {
        const activeClipEl = DOM.timelineTracksContainer.querySelector(`.video-clip[data-clip-id="${State.currentClipInPreview.id}"]`);
        if (activeClipEl) {
            activeClipEl.classList.add('active');
        }
    }
}

export function repackClips() {
    let currentTime = 0;
    State.timelineClips.forEach(clip => {
        clip.start = currentTime;
        clip.end = currentTime + clip.duration;
        currentTime += clip.duration;
    });
    const contentDuration = currentTime;
    if (State.sequenceDuration < contentDuration) {
        State.setSequenceDuration(Math.ceil(contentDuration));
    }
    renderTimelineRuler();
}

function resetEditorView() {
    if (!DOM.videoPreview) return;
    DOM.videoPreview.pause();
    DOM.videoPreview.src = '';
    DOM.videoPreview.style.display = 'none';
    if (DOM.editorPlaceholder) DOM.editorPlaceholder.style.display = 'block';
    if (DOM.playPauseButton) DOM.playPauseButton.disabled = true;
    if (DOM.addTextButton) DOM.addTextButton.disabled = true;
    if (DOM.playhead) DOM.playhead.style.display = 'none';
    
    State.setCurrentClipInPreview(null);
    State.setSequenceDuration(0);
    
    State.timelineOverlays.forEach(o => o.element.remove());
    State.timelineOverlays.length = 0;
    
    State.setProjectAspectRatio('9:16');
    updatePreviewAspectRatio();
    renderTimelineTracks();
    updateTimelineUI();
}

function removeClipFromTimeline(clipIdToRemove: number) {
    State.removeTimelineClip(clipIdToRemove);

    if (State.selectedClipId === clipIdToRemove) {
        deselectAllItems();
    }

    if (State.timelineClips.length === 0) {
        resetEditorView();
        return;
    }
    
    if (State.currentClipInPreview?.id === clipIdToRemove) {
        loadClipIntoPreview(State.timelineClips[0]);
    }

    repackClips();
    renderTimelineTracks();
    updateTimelineUI();
}

async function generateClipThumbnails(videoUrl: string, duration: number, numThumbnails = 5, sourceStart = 0): Promise<string[]> {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.crossOrigin = "anonymous";
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const thumbnails: string[] = [];
        if (!ctx) return resolve([]);

        video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            video.currentTime = sourceStart + 0.01;
        };

        let loadedThumbnails = 0;
        video.onseeked = () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            thumbnails.push(canvas.toDataURL('image/jpeg', 0.7));
            loadedThumbnails++;
            
            if (loadedThumbnails >= numThumbnails) {
                video.src = "";
                resolve(thumbnails);
            } else {
                const nextTime = sourceStart + (duration / (numThumbnails > 1 ? (numThumbnails - 1) : 1)) * loadedThumbnails;
                video.currentTime = Math.min(nextTime, sourceStart + duration - 0.01);
            }
        };
        
        video.onerror = (err) => {
            console.error("Error generating thumbnails.", err);
            resolve([]);
        };

        video.src = videoUrl;
    });
}

function renderThumbnailsOnClip(clipEl: HTMLDivElement, thumbnails: string[]) {
    clipEl.innerHTML = '';
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

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-clip-btn';
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    removeBtn.onclick = (e) => {
        e.stopPropagation();
        removeClipFromTimeline(parseInt(clipEl.dataset.clipId!, 10));
    };
    clipEl.appendChild(removeBtn);
}


export function updateTimelineTextClipElement(overlay: TextOverlay) {
    if (State.sequenceDuration === 0) return;
    const left = (overlay.start / State.sequenceDuration) * 100;
    const width = ((overlay.end - overlay.start) / State.sequenceDuration) * 100;
    overlay.clipElement.style.left = `${left}%`;
    overlay.clipElement.style.width = `${width}%`;
    
    const textNode = Array.from(overlay.clipElement.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
    if (textNode) {
        textNode.textContent = overlay.text;
    } else {
        overlay.clipElement.prepend(document.createTextNode(overlay.text));
    }
}

export function renderTimelineTracks() {
    if (!DOM.timelineTracksContainer || !DOM.timelineTrackHeaders) return;
    DOM.timelineTracksContainer.innerHTML = '';
    DOM.timelineTrackHeaders.innerHTML = '';

    if (State.tracks.length === 0) {
        DOM.timelineTracksContainer.innerHTML = `<div class="timeline-track"><div class="timeline-placeholder">Add a track to get started</div></div>`;
        return;
    }

    State.tracks.forEach(track => {
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
        
        DOM.timelineTrackHeaders.appendChild(trackHeader);

        const trackEl = document.createElement('div');
        trackEl.className = 'timeline-track';
        trackEl.dataset.trackId = String(track.id);
        trackEl.dataset.trackType = track.type;

        if (track.type === 'video') {
            const clipsOnTrack = State.timelineClips.filter(c => c.trackId === track.id);
            if (clipsOnTrack.length === 0) {
                trackEl.innerHTML = `<div class="timeline-placeholder">Drag clips from the Media Bin here</div>`;
            }
            clipsOnTrack.forEach(clip => {
                const clipEl = document.createElement('div');
                clipEl.className = 'timeline-clip video-clip';
                if (clip.id === State.selectedClipId) clipEl.classList.add('is-selected');
                clipEl.draggable = true;
                clipEl.dataset.clipId = String(clip.id);
                
                const left = (clip.start / State.sequenceDuration) * 100;
                const width = (clip.duration / State.sequenceDuration) * 100;
                clipEl.style.left = `${left}%`;
                clipEl.style.width = `${width}%`;

                if (clip.thumbnails && clip.thumbnails.length > 0) {
                    renderThumbnailsOnClip(clipEl, clip.thumbnails);
                } else {
                    clipEl.textContent = `Loading Clip #${clip.id + 1}...`;
                }

                const leftHandle = document.createElement('div');
                leftHandle.className = 'resize-handle left';
                leftHandle.addEventListener('mousedown', (e) => handleVideoClipResize(e, clip));
                clipEl.appendChild(leftHandle);
        
                const rightHandle = document.createElement('div');
                rightHandle.className = 'resize-handle right';
                rightHandle.addEventListener('mousedown', (e) => handleVideoClipResize(e, clip));
                clipEl.appendChild(rightHandle);
                
                clipEl.addEventListener('click', () => handleSelectClip(clip.id, clipEl));
                clipEl.addEventListener('dragstart', (e) => handleTimelineClipDragStart(e, clip));
                clipEl.addEventListener('dragend', handleTimelineClipDragEnd);

                trackEl.appendChild(clipEl);
            });
        } else { // Text track
            const overlaysOnTrack = State.timelineOverlays.filter(o => o.trackId === track.id);
            overlaysOnTrack.forEach(overlay => {
                updateTimelineTextClipElement(overlay);
                if (overlay.id === State.selectedOverlayId) {
                    overlay.clipElement.classList.add('is-selected');
                }
                overlay.clipElement.addEventListener('mousedown', handleGenericClipMouseDown);
                overlay.clipElement.addEventListener('click', () => handleSelectOverlay(overlay.id, overlay.clipElement));
                trackEl.appendChild(overlay.clipElement);
            });
        }
        DOM.timelineTracksContainer.appendChild(trackEl);
    });
}

async function addClipToTimeline(clip: SavedClip, trackId: number, index: number) {
    const tempVideo = document.createElement('video');
    tempVideo.src = clip.url;

    tempVideo.addEventListener('loadedmetadata', async () => {
        const duration = tempVideo.duration;
        const newClipData: TimelineClip = {
            ...clip,
            trackId: trackId,
            duration,
            sourceDuration: duration,
            sourceStart: 0,
            start: 0, end: 0, thumbnails: [],
            properties: { volume: 1, scale: 1, position: { x: 0, y: 0}, rotation: 0 }
        };

        if (State.timelineClips.length === 0) {
            State.setProjectAspectRatio('9:16');
            State.setSequenceDuration(Math.ceil(duration));
            updatePreviewAspectRatio();
        }

        State.addTimelineClip(newClipData, index);
        repackClips();

        if (State.timelineClips.length === 1) {
            loadClipIntoPreview(State.timelineClips[0]);
            if (DOM.editorPlaceholder) DOM.editorPlaceholder.style.display = 'none';
            if (DOM.videoPreview) DOM.videoPreview.style.display = 'block';
            if (DOM.playPauseButton) DOM.playPauseButton.disabled = false;
            if (DOM.addTextButton) DOM.addTextButton.disabled = false;
            if (DOM.playhead) DOM.playhead.style.display = 'block';
        }
        
        renderTimelineTracks();
        updateTimelineUI();

        const thumbnails = await generateClipThumbnails(newClipData.url, duration, 5, 0);
        newClipData.thumbnails = thumbnails;
        const clipEl = DOM.timelineTracksContainer?.querySelector(`.video-clip[data-clip-id="${newClipData.id}"]`);
        if (clipEl) {
            renderThumbnailsOnClip(clipEl as HTMLDivElement, thumbnails);
        }
    }, { once: true });
}

// --- Event Handlers ---

function handleTimelineSeek(e: MouseEvent) {
    if (currentTool === 'split') {
        handleSplitterClick(e);
        return;
    }
    const targetEl = e.target as HTMLElement;
    if (targetEl.closest('.timeline-clip')) return;
    
    deselectAllItems();
    
    if (State.sequenceDuration === 0 || !DOM.timelineRuler || !DOM.videoPreview) return;

    const timelineRect = DOM.timelineRuler.getBoundingClientRect();
    const clickX = e.clientX - timelineRect.left;
    const clickPercent = Math.max(0, Math.min(1, clickX / timelineRect.width));
    const targetTime = clickPercent * State.sequenceDuration;

    const targetClip = State.timelineClips.find(clip => targetTime >= clip.start && targetTime < clip.end);
    
    if (targetClip) {
        const localTime = targetTime - targetClip.start;
        if (State.currentClipInPreview?.id !== targetClip.id) {
            loadClipIntoPreview(targetClip, localTime, !DOM.videoPreview.paused);
        } else {
            DOM.videoPreview.currentTime = targetClip.sourceStart + localTime;
            updateTimelineUI();
        }
    }
}

function handleVideoClipResize(e: MouseEvent, clip: TimelineClip) {
    e.preventDefault();
    e.stopPropagation();
    if (!DOM.timelineTracksContainer) return;

    const target = e.target as HTMLElement;
    const resizeDirection = target.classList.contains('left') ? 'left' : 'right';
    document.body.classList.add('is-resizing');

    const startX = e.clientX;
    const originalClipData = { start: clip.start, duration: clip.duration, sourceStart: clip.sourceStart };
    const pixelsToSeconds = (pixels: number) => (pixels / DOM.timelineTracksContainer!.offsetWidth) * State.sequenceDuration;

    const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaTime = pixelsToSeconds(moveEvent.clientX - startX);

        if (resizeDirection === 'right') {
            const newDuration = originalClipData.duration + deltaTime;
            clip.duration = Math.max(0.1, Math.min(newDuration, clip.sourceDuration - clip.sourceStart));
        } else {
            let allowedDelta = deltaTime;
            if (originalClipData.duration - allowedDelta < 0.1) allowedDelta = originalClipData.duration - 0.1;
            if (originalClipData.start + allowedDelta < 0) allowedDelta = -originalClipData.start;
            if (originalClipData.sourceStart + allowedDelta < 0) allowedDelta = -originalClipData.sourceStart;
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

function handleGenericClipMouseDown(e: MouseEvent) {
    const clipElement = (e.currentTarget as HTMLElement);
    const handle = (e.target as HTMLElement);
    if (!handle.classList.contains('resize-handle')) return;
    
    e.preventDefault();
    e.stopPropagation();

    const overlayId = parseInt(clipElement.dataset.overlayId!, 10);
    const overlay = State.timelineOverlays.find(o => o.id === overlayId);
    if (!overlay || !DOM.timelineTracksContainer) return;
    
    document.body.classList.add('is-resizing');
    const resizeDirection = handle.classList.contains('left') ? 'left' : 'right';
    const startX = e.clientX;
    const originalClipData = { start: overlay.start, end: overlay.end };
    const pixelsToSeconds = (pixels: number) => (pixels / DOM.timelineTracksContainer!.offsetWidth) * State.sequenceDuration;

    const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaTime = pixelsToSeconds(moveEvent.clientX - startX);
        if (resizeDirection === 'right') {
            const newEnd = originalClipData.end + deltaTime;
            overlay.end = Math.max(overlay.start + 0.1, Math.min(newEnd, State.sequenceDuration));
        } else {
            const newStart = originalClipData.start + deltaTime;
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

function handleTimelineClipDragStart(e: DragEvent, clip: TimelineClip) {
    e.stopPropagation();
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', String(clip.id));
      e.dataTransfer.setData('source', 'timeline');
    }
    State.setDraggedTimelineClipId(clip.id);
    setTimeout(() => (e.target as HTMLElement).classList.add('is-ghost'), 0);
}

function handleTimelineClipDragEnd(e: DragEvent) {
    (e.target as HTMLElement).classList.remove('is-ghost');
    State.setDraggedTimelineClipId(null);
}

function getInsertionMarker(): HTMLDivElement {
    let marker = document.getElementById('insertion-marker') as HTMLDivElement;
    if (!marker) {
        marker = document.createElement('div');
        marker.id = 'insertion-marker';
        marker.className = 'insertion-marker';
        DOM.timelineScrollContainer?.appendChild(marker);
    }
    return marker;
}

function handleTimelineDragOver(e: DragEvent) {
    e.preventDefault();
    if (!DOM.timelineScrollContainer || !DOM.timelineTracksContainer) return;
    const marker = getInsertionMarker();
    const targetEl = e.target as HTMLElement;
    const trackEl = targetEl.closest<HTMLElement>('.timeline-track');
    
    document.querySelectorAll('.timeline-track.drop-disallowed').forEach(el => el.classList.remove('drop-disallowed'));
    if (!trackEl) {
        marker.style.display = 'none';
        State.setDropIndex(-1);
        return;
    }
    const isVideoDrop = e.dataTransfer?.getData('source') !== 'text'; // Simplified check
    if (isVideoDrop && trackEl.dataset.trackType === 'text') {
        marker.style.display = 'none';
        trackEl.classList.add('drop-disallowed');
        State.setDropIndex(-1);
        return;
    }
    
    DOM.timelineScrollContainer.classList.add('drop-target-active');
    marker.style.display = 'block';
    marker.style.top = `${trackEl.offsetTop}px`;

    if (State.sequenceDuration === 0) {
        State.setDropIndex(0);
        marker.style.left = '0px';
        return;
    }
    
    const timelineWidth = DOM.timelineTracksContainer.offsetWidth;
    const dropX = e.clientX - DOM.timelineTracksContainer.getBoundingClientRect().left;

    let insertAtIndex = State.timelineClips.length;
    for (let i = 0; i < State.timelineClips.length; i++) {
        const clip = State.timelineClips[i];
        if (clip.id === State.draggedTimelineClipId) continue;
        const clipMidPos = ((clip.start + clip.duration / 2) / State.sequenceDuration) * timelineWidth;
        if (dropX < clipMidPos) {
            insertAtIndex = i;
            break;
        }
    }
    State.setDropIndex(insertAtIndex);

    let markerPositionPx = 0;
    if (insertAtIndex < State.timelineClips.length) {
        markerPositionPx = (State.timelineClips[insertAtIndex].start / State.sequenceDuration) * timelineWidth;
    } else if (State.timelineClips.length > 0) {
        const lastClip = State.timelineClips[State.timelineClips.length - 1];
        markerPositionPx = (lastClip.end / State.sequenceDuration) * timelineWidth;
    }
    marker.style.left = `${markerPositionPx}px`;
}

function handleTimelineDrop(e: DragEvent) {
    e.preventDefault();
    DOM.timelineScrollContainer?.classList.remove('drop-target-active');
    document.querySelectorAll('.timeline-track.drop-disallowed').forEach(el => el.classList.remove('drop-disallowed'));
    getInsertionMarker().style.display = 'none';

    const source = e.dataTransfer?.getData('source');
    const clipId = parseInt(e.dataTransfer?.getData('text/plain')!, 10);
    const trackEl = (e.target as HTMLElement).closest<HTMLElement>('.timeline-track');
    
    if (isNaN(clipId) || !trackEl) return State.setDropIndex(-1);
    
    const trackId = parseInt(trackEl.dataset.trackId!, 10);
    let indexToInsert = State.dropIndex > -1 ? State.dropIndex : State.timelineClips.length;

    if (source === 'timeline') {
        const clipToMove = State.timelineClips.find(c => c.id === clipId);
        if (!clipToMove) return;
        clipToMove.trackId = trackId;
        const originalIndex = State.timelineClips.findIndex(c => c.id === clipId);
        State.timelineClips.splice(originalIndex, 1);
        if (originalIndex < indexToInsert) indexToInsert--;
        State.timelineClips.splice(indexToInsert, 0, clipToMove);
        repackClips();
        renderTimelineTracks();
        updateTimelineUI();
    } else {
        const clip = State.savedClips.find(c => c.id === clipId);
        if (clip) {
            addClipToTimeline(clip, trackId, indexToInsert);
        }
    }
    State.setDropIndex(-1);
}

function handleSplitterClick(e: MouseEvent) {
    if (State.sequenceDuration === 0 || !DOM.timelineRuler) return;
    const clickedClipEl = (e.target as HTMLElement).closest('.timeline-clip');
    if (!clickedClipEl) return;

    const clickX = e.clientX - DOM.timelineRuler.getBoundingClientRect().left;
    const splitTime = (clickX / DOM.timelineRuler.offsetWidth) * State.sequenceDuration;
    
    if (clickedClipEl.classList.contains('video-clip')) {
        const clipId = parseInt((clickedClipEl as HTMLElement).dataset.clipId!, 10);
        splitVideoClip(clipId, splitTime);
    } else if (clickedClipEl.classList.contains('text-clip')) {
        const overlayId = parseInt((clickedClipEl as HTMLElement).dataset.overlayId!, 10);
        splitTextOverlay(overlayId, splitTime);
    }
}

async function splitVideoClip(clipId: number, splitTime: number) {
    const clipIndex = State.timelineClips.findIndex(c => c.id === clipId);
    if (clipIndex === -1) return;
    const clipToSplit = State.timelineClips[clipIndex];
    if (splitTime <= clipToSplit.start + 0.1 || splitTime >= clipToSplit.end - 0.1) return;

    deselectAllItems();
    const durationA = splitTime - clipToSplit.start;
    const newClipPartB: TimelineClip = {
        ...clipToSplit, id: State.nextClipId,
        start: splitTime, end: clipToSplit.end,
        duration: clipToSplit.end - splitTime,
        sourceStart: clipToSplit.sourceStart + durationA,
        thumbnails: [],
    };
    State.incrementNextClipId();
    clipToSplit.end = splitTime;
    clipToSplit.duration = durationA;
    clipToSplit.thumbnails = [];

    State.addTimelineClip(newClipPartB, clipIndex + 1);
    renderTimelineTracks();
    updateTimelineUI();

    const [thumbsA, thumbsB] = await Promise.all([
        generateClipThumbnails(clipToSplit.url, clipToSplit.duration, 5, clipToSplit.sourceStart),
        generateClipThumbnails(newClipPartB.url, newClipPartB.duration, 5, newClipPartB.sourceStart)
    ]);
    clipToSplit.thumbnails = thumbsA;
    newClipPartB.thumbnails = thumbsB;
    renderTimelineTracks();
}

function splitTextOverlay(overlayId: number, splitTime: number) {
    const overlayIndex = State.timelineOverlays.findIndex(o => o.id === overlayId);
    if (overlayIndex === -1) return;
    const overlayToSplit = State.timelineOverlays[overlayIndex];
    if (splitTime <= overlayToSplit.start + 0.1 || splitTime >= overlayToSplit.end - 0.1) return;

    deselectAllItems();
    const originalEnd = overlayToSplit.end;
    overlayToSplit.end = splitTime;

    const newOverlay = State.addTextOverlay({ start: splitTime, end: originalEnd, trackId: overlayToSplit.trackId });
    if (newOverlay) {
        newOverlay.text = overlayToSplit.text;
        newOverlay.fontFamily = overlayToSplit.fontFamily;
        newOverlay.color = overlayToSplit.color;
        newOverlay.fontSize = overlayToSplit.fontSize;
        newOverlay.position = { ...overlayToSplit.position };
        newOverlay.element.addEventListener('mousedown', (e) => handleOverlayDrag(e, newOverlay));
        DOM.videoPreviewWrapper?.appendChild(newOverlay.element);
    }
    
    renderTimelineTracks();
    updateTimelineUI();
}

export function initTimeline() {
    DOM.timelineScrollContainer?.addEventListener('mousedown', handleTimelineSeek);
    DOM.timelineRuler?.addEventListener('mousedown', handleTimelineSeek);
    DOM.timelineScrollContainer?.addEventListener('dragover', handleTimelineDragOver);
    DOM.timelineScrollContainer?.addEventListener('drop', handleTimelineDrop);
    DOM.timelineScrollContainer?.addEventListener('dragleave', (e) => {
        if (e.relatedTarget && DOM.timelineScrollContainer?.contains(e.relatedTarget as Node)) return;
        DOM.timelineScrollContainer?.classList.remove('drop-target-active');
        document.querySelectorAll('.timeline-track.drop-disallowed').forEach(el => el.classList.remove('drop-disallowed'));
        getInsertionMarker().style.display = 'none';
        State.setDropIndex(-1);
    });
}