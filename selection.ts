/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as State from './state';
import { updatePropertiesPanel } from './propertiesPanel';

export function deselectAllItems() {
    State.setSelectedClipId(null);
    State.setSelectedOverlayId(null);
    document.querySelectorAll('.timeline-clip.is-selected').forEach(el => el.classList.remove('is-selected'));
    document.querySelectorAll('.text-overlay.is-selected').forEach(el => el.classList.remove('is-selected'));
    updatePropertiesPanel();
}

export function handleSelectClip(clipId: number, element: HTMLDivElement) {
    deselectAllItems();
    State.setSelectedClipId(clipId);
    element.classList.add('is-selected');
    updatePropertiesPanel();
}

export function handleSelectOverlay(overlayId: number, element: HTMLDivElement) {
    deselectAllItems();
    State.setSelectedOverlayId(overlayId);
    element.classList.add('is-selected');
    updatePropertiesPanel();
}
