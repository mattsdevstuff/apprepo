/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// --- Type Definitions ---
export interface GeneratedVideo {
  video?: {
    uri?: string;
  };
}

export type TrackType = 'video' | 'text';

export interface Track {
    id: number;
    type: TrackType;
}

export interface TextOverlay {
  id: number;
  trackId: number;
  text: string;
  start: number;
  end: number;
  element: HTMLDivElement;
  clipElement: HTMLDivElement;
  fontSize: number;
  fontFamily: string;
  color: string;
  position: {
    top: string;
    left: string;
  };
}

export interface SavedClip {
  id: number;
  url: string;
  blob: Blob;
}
export interface TimelineClip extends SavedClip {
    trackId: number;
    start: number;
    end: number;
    duration: number;
    sourceStart: number;
    sourceDuration: number;
    thumbnails?: string[];
    properties: {
        volume: number;
        scale: number;
        position: { x: number; y: number; };
        rotation: number;
    }
}
