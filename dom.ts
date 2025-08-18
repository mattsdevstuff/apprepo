/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// --- DOM Element References ---

// Tabs & Header
export const generatorTabButton = document.querySelector<HTMLButtonElement>('#generator-tab-button');
export const studioTabButton = document.querySelector<HTMLButtonElement>('#studio-tab-button');
export const studioNotificationBadge = document.querySelector<HTMLSpanElement>('#studio-notification-badge');

// Auth
export const headerAuthStatus = document.querySelector<HTMLDivElement>('.header-auth-status');
export const authSection = document.querySelector<HTMLDivElement>('#auth-section');
export const googleSignInButton = document.querySelector<HTMLButtonElement>('#google-sign-in-button');
export const userActions = document.querySelector<HTMLDivElement>('.user-actions');
export const userProfileTrigger = document.querySelector<HTMLButtonElement>('#user-profile-trigger');
export const userProfileDropdown = document.querySelector<HTMLDivElement>('#user-profile-dropdown');
export const userNameEl = document.querySelector<HTMLSpanElement>('#user-name');
export const userProfilePictureEl = document.querySelector<HTMLImageElement>('#user-profile-picture');
export const signOutButton = document.querySelector<HTMLButtonElement>('#sign-out-button');
export const creditBalanceDisplay = document.querySelector<HTMLDivElement>('#credit-balance-display');
export const buyCreditsButton = document.querySelector<HTMLButtonElement>('#buy-credits-button');

// Generator View
export const generatorView = document.querySelector<HTMLDivElement>('#generator-view');
export const ideaInputEl = document.querySelector<HTMLTextAreaElement>('#idea-input');
export const generateIdeasButton = document.querySelector<HTMLButtonElement>('#generate-ideas-button');
export const promptEl = document.querySelector<HTMLTextAreaElement>('#prompt-input');
export const fileInput = document.querySelector<HTMLInputElement>('#file-input');
export const imagePreviewContainer = document.querySelector<HTMLDivElement>('#image-preview-container');
export const imagePreview = document.querySelector<HTMLImageElement>('#image-preview');
export const clearImageButton = document.querySelector<HTMLButtonElement>('#clear-image-button');
export const generateButton = document.querySelector<HTMLButtonElement>('#generate-button');
export const controlsContainer = document.querySelector<HTMLDivElement>('.controls');
export const statusEl = document.querySelector<HTMLDivElement>('#status');
export const resultsGallery = document.querySelector<HTMLDivElement>('#results-gallery');
export const galleryPlaceholder = document.querySelector<HTMLDivElement>('#gallery-placeholder');
export const quotaErrorEl = document.querySelector<HTMLDivElement>('#quota-error');

// Editor View
export const editorView = document.querySelector<HTMLDivElement>('#editor-view');
export const editorBody = document.querySelector<HTMLDivElement>('.editor-body');
export const mediaPanel = document.querySelector<HTMLDivElement>('.media-panel');
export const previewPanel = document.querySelector<HTMLDivElement>('.preview-panel');
export const toolsPanel = document.querySelector<HTMLDivElement>('.tools-panel');

// Media Bin
export const mediaBin = document.querySelector<HTMLDivElement>('#media-bin');
export const uploadVideoInput = document.querySelector<HTMLInputElement>('#upload-video-input');

// Preview Panel
export const editorPlaceholder = document.querySelector<HTMLDivElement>('#editor-placeholder');
export const videoPreviewWrapper = document.querySelector<HTMLDivElement>('#video-preview-wrapper');
export const videoPreview = document.querySelector<HTMLVideoElement>('#video-preview');
export const playPauseButton = document.querySelector<HTMLButtonElement>('#play-pause-button');
export const playIcon = document.querySelector<HTMLElement>('#play-icon');
export const pauseIcon = document.querySelector<HTMLElement>('#pause-icon');
export const currentTimeEl = document.querySelector<HTMLSpanElement>('#current-time');
export const totalDurationEl = document.querySelector<HTMLSpanElement>('#total-duration');

// Tools Panel
export const exportVideoButton = document.querySelector<HTMLButtonElement>('#export-video-button');
export const selectToolButton = document.querySelector<HTMLButtonElement>('#select-tool-button');
export const splitToolButton = document.querySelector<HTMLButtonElement>('#split-tool-button');
export const addTextButton = document.querySelector<HTMLButtonElement>('#add-text-button');

// Timeline
export const timelineContainer = document.querySelector<HTMLDivElement>('#timeline-container');
export const timelineRuler = document.querySelector<HTMLDivElement>('#timeline-ruler');
export const timelineTrackHeaders = document.querySelector<HTMLDivElement>('#timeline-track-headers');
export const timelineScrollContainer = document.querySelector<HTMLDivElement>('#timeline-scroll-container');
export const timelineTracksContainer = document.querySelector<HTMLDivElement>('#timeline-tracks');
export const playhead = document.querySelector<HTMLDivElement>('#playhead');
export const splitIndicator = document.querySelector<HTMLDivElement>('#split-indicator');
export const addVideoTrackButton = document.querySelector<HTMLButtonElement>('#add-video-track-button');
export const addTextTrackButton = document.querySelector<HTMLButtonElement>('#add-text-track-button');

// Properties Panel
export const propertiesPlaceholder = document.querySelector<HTMLDivElement>('#properties-placeholder');
export const textProperties = document.querySelector<HTMLDivElement>('#text-properties');
export const propTextContent = document.querySelector<HTMLTextAreaElement>('#prop-text-content');
export const propFontFamily = document.querySelector<HTMLSelectElement>('#prop-font-family');
export const propFontColor = document.querySelector<HTMLInputElement>('#prop-font-color');
export const propFontSize = document.querySelector<HTMLInputElement>('#prop-font-size');
export const propFontSizeValue = document.querySelector<HTMLSpanElement>('#prop-font-size-value');
export const videoProperties = document.querySelector<HTMLDivElement>('#video-properties');
export const propVideoVolume = document.querySelector<HTMLInputElement>('#prop-video-volume');
export const propVideoVolumeValue = document.querySelector<HTMLSpanElement>('#prop-video-volume-value');
export const propVideoScale = document.querySelector<HTMLInputElement>('#prop-video-scale');
export const propVideoScaleValue = document.querySelector<HTMLSpanElement>('#prop-video-scale-value');
export const propVideoPosX = document.querySelector<HTMLInputElement>('#prop-video-pos-x');
export const propVideoPosXValue = document.querySelector<HTMLSpanElement>('#prop-video-pos-x-value');
export const propVideoPosY = document.querySelector<HTMLInputElement>('#prop-video-pos-y');
export const propVideoPosYValue = document.querySelector<HTMLSpanElement>('#prop-video-pos-y-value');
export const propVideoRotation = document.querySelector<HTMLInputElement>('#prop-video-rotation');
export const propVideoRotationValue = document.querySelector<HTMLSpanElement>('#prop-video-rotation-value');
export const resetTransformButton = document.querySelector<HTMLButtonElement>('#reset-transform-button');

// Modals
export const settingsModal = document.querySelector<HTMLDivElement>('#settings-modal');
export const sequenceSettingsButton = document.querySelector<HTMLButtonElement>('#sequence-settings-button');
export const settingsSaveButton = document.querySelector<HTMLButtonElement>('#settings-save-button');
export const settingsCancelButton = document.querySelector<HTMLButtonElement>('#settings-cancel-button');
export const settingDuration = document.querySelector<HTMLInputElement>('#setting-duration');
export const errorModal = document.querySelector<HTMLDivElement>('#error-modal');
export const errorModalBody = document.querySelector<HTMLDivElement>('#error-modal-body');
export const errorModalClose = document.querySelector<HTMLButtonElement>('#error-modal-close');
export const creditsModal = document.querySelector<HTMLDivElement>('#credits-modal');
export const creditsCancelButton = document.querySelector<HTMLButtonElement>('#credits-cancel-button');
export const buyButtons = document.querySelectorAll<HTMLButtonElement>('.buy-button');


// Resizers
export const resizerV1 = document.querySelector<HTMLDivElement>('#resizer-v1');
export const resizerV2 = document.querySelector<HTMLDivElement>('#resizer-v2');
export const resizerH = document.querySelector<HTMLDivElement>('#resizer-h');