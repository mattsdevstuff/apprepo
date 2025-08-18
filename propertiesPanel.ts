/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as DOM from './dom';
import * as State from './state';
import { applyClipTransforms, applyOverlayStyles } from './preview';
import { updateTimelineTextClipElement } from './timeline';

export function updatePropertiesPanel() {
    if (!DOM.textProperties || !DOM.videoProperties || !DOM.propertiesPlaceholder) return;

    const selectedOverlay = State.timelineOverlays.find(o => o.id === State.selectedOverlayId);
    const selectedClip = State.timelineClips.find(c => c.id === State.selectedClipId);

    if (selectedOverlay) {
        DOM.textProperties.style.display = 'block';
        DOM.videoProperties.style.display = 'none';
        DOM.propertiesPlaceholder.style.display = 'none';

        if (DOM.propTextContent) DOM.propTextContent.value = selectedOverlay.text;
        if (DOM.propFontFamily) DOM.propFontFamily.value = selectedOverlay.fontFamily;
        if (DOM.propFontColor) DOM.propFontColor.value = selectedOverlay.color;
        if (DOM.propFontSize) DOM.propFontSize.value = String(selectedOverlay.fontSize);
        if (DOM.propFontSizeValue) DOM.propFontSizeValue.textContent = String(selectedOverlay.fontSize);

    } else if (selectedClip) {
        DOM.textProperties.style.display = 'none';
        DOM.videoProperties.style.display = 'block';
        DOM.propertiesPlaceholder.style.display = 'none';

        const props = selectedClip.properties;
        if (DOM.propVideoVolume) DOM.propVideoVolume.value = String(props.volume * 100);
        if (DOM.propVideoVolumeValue) DOM.propVideoVolumeValue.textContent = `${Math.round(props.volume * 100)}%`;
        if (DOM.propVideoScale) DOM.propVideoScale.value = String(props.scale * 100);
        if (DOM.propVideoScaleValue) DOM.propVideoScaleValue.textContent = `${Math.round(props.scale * 100)}%`;
        if (DOM.propVideoPosX) DOM.propVideoPosX.value = String(props.position.x);
        if (DOM.propVideoPosXValue) DOM.propVideoPosXValue.textContent = `${props.position.x}%`;
        if (DOM.propVideoPosY) DOM.propVideoPosY.value = String(props.position.y);
        if (DOM.propVideoPosYValue) DOM.propVideoPosYValue.textContent = `${props.position.y}%`;
        if (DOM.propVideoRotation) DOM.propVideoRotation.value = String(props.rotation);
        if (DOM.propVideoRotationValue) DOM.propVideoRotationValue.textContent = `${props.rotation}°`;
        
    } else {
        DOM.textProperties.style.display = 'none';
        DOM.videoProperties.style.display = 'none';
        DOM.propertiesPlaceholder.style.display = 'block';
    }
}

function handlePropertiesChange() {
    const selectedOverlay = State.timelineOverlays.find(o => o.id === State.selectedOverlayId);
    const selectedClip = State.timelineClips.find(c => c.id === State.selectedClipId);

    if (selectedOverlay) {
        if (!DOM.propTextContent || !DOM.propFontFamily || !DOM.propFontColor || !DOM.propFontSize) return;
        selectedOverlay.text = DOM.propTextContent.value;
        selectedOverlay.fontFamily = DOM.propFontFamily.value;
        selectedOverlay.color = DOM.propFontColor.value;
        selectedOverlay.fontSize = parseInt(DOM.propFontSize.value, 10);
        
        if (DOM.propFontSizeValue) DOM.propFontSizeValue.textContent = String(selectedOverlay.fontSize);
        
        selectedOverlay.element.textContent = selectedOverlay.text;
        updateTimelineTextClipElement(selectedOverlay);
        applyOverlayStyles(selectedOverlay);

    } else if (selectedClip) {
        if (!DOM.propVideoVolume || !DOM.propVideoScale || !DOM.propVideoPosX || !DOM.propVideoPosY || !DOM.propVideoRotation) return;
        selectedClip.properties.volume = (parseInt(DOM.propVideoVolume.value, 10)) / 100;
        selectedClip.properties.scale = (parseInt(DOM.propVideoScale.value, 10)) / 100;
        selectedClip.properties.position.x = parseInt(DOM.propVideoPosX.value, 10);
        selectedClip.properties.position.y = parseInt(DOM.propVideoPosY.value, 10);
        selectedClip.properties.rotation = parseInt(DOM.propVideoRotation.value, 10);

        if (DOM.propVideoVolumeValue) DOM.propVideoVolumeValue.textContent = `${Math.round(selectedClip.properties.volume * 100)}%`;
        if (DOM.propVideoScaleValue) DOM.propVideoScaleValue.textContent = `${Math.round(selectedClip.properties.scale * 100)}%`;
        if (DOM.propVideoPosXValue) DOM.propVideoPosXValue.textContent = `${selectedClip.properties.position.x}%`;
        if (DOM.propVideoPosYValue) DOM.propVideoPosYValue.textContent = `${selectedClip.properties.position.y}%`;
        if (DOM.propVideoRotationValue) DOM.propVideoRotationValue.textContent = `${selectedClip.properties.rotation}°`;
        
        applyClipTransforms();
    }
}

function handleResetTransforms() {
    const selectedClip = State.timelineClips.find(c => c.id === State.selectedClipId);
    if (!selectedClip) return;
    
    selectedClip.properties.scale = 1;
    selectedClip.properties.position = { x: 0, y: 0 };
    selectedClip.properties.rotation = 0;
    
    updatePropertiesPanel(); 
    applyClipTransforms();
}

export function initPropertiesPanel() {
    const allPropInputs = document.querySelectorAll('#video-properties input, #video-properties select, #text-properties input, #text-properties select, #text-properties textarea');
    allPropInputs.forEach(input => {
      input.addEventListener('input', handlePropertiesChange);
    });
    DOM.resetTransformButton?.addEventListener('click', handleResetTransforms);
}
