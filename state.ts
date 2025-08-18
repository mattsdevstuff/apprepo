export {};

interface GeneratedVideo {
  video?: {
    uri?: string;
  };
}

type TrackType = 'video' | 'text';

interface Track {
    id: number;
    type: TrackType;
}

interface TextOverlay {
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

interface SavedClip {
  id: number;
  url: string;
  blob: Blob;
}
interface TimelineClip extends SavedClip {
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
export let currentTool: 'select' | 'split' = 'select';
export let tracks: Track[] = [
    { id: 0, type: 'video' }
];
export let nextTrackId = 1;