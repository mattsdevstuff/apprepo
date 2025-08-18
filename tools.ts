/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import * as DOM from './dom';

export let currentTool: 'select' | 'split' = 'select';

export function setTool(tool: 'select' | 'split') {
    currentTool = tool;
    DOM.selectToolButton?.classList.toggle('active', tool === 'select');
    DOM.splitToolButton?.classList.toggle('active', tool === 'split');
    DOM.timelineScrollContainer?.classList.toggle('split-mode', tool === 'split');
    
    if (tool !== 'split' && DOM.splitIndicator) {
        DOM.splitIndicator.style.display = 'none';
    }
}

function handleTimelineMouseMove(e: MouseEvent) {
    if (currentTool !== 'split' || !DOM.splitIndicator || !DOM.timelineScrollContainer) {
        return;
    }

    const timelineRect = DOM.timelineScrollContainer.getBoundingClientRect();
    const mouseX = e.clientX - timelineRect.left;
    const clampedX = Math.max(0, Math.min(mouseX, timelineRect.width));
    DOM.splitIndicator.style.left = `${clampedX}px`;
}

export function initTools() {
    setTool('select');
    DOM.selectToolButton?.addEventListener('click', () => setTool('select'));
    DOM.splitToolButton?.addEventListener('click', () => setTool('split'));

    DOM.timelineScrollContainer?.addEventListener('mousemove', handleTimelineMouseMove);
    DOM.timelineScrollContainer?.addEventListener('mouseenter', () => {
        if (currentTool === 'split' && DOM.splitIndicator) {
            DOM.splitIndicator.style.display = 'block';
        }
    });
    DOM.timelineScrollContainer?.addEventListener('mouseleave', () => {
        if (DOM.splitIndicator) {
            DOM.splitIndicator.style.display = 'none';
        }
    });
}
