import { initializeAuth } from './auth';
import { initializeModals } from './modals';
import { initializeGenerator } from './generator';
import { initializeEditor } from './editor'; // Include even if incomplete
import { newClipsCount } from './state'; // For updateStudioNotification

export function displayError(message: string) {
    // This function will need access to errorModalBody and errorModal from modals.ts
    // For now, it will just log to console or use a basic alert
    console.error("App Error:", message);
    // In a real scenario, you would likely call a function from modals.ts here
    // initializeModals.displayErrorInModal(message); 
}

function updateStudioNotification() {
  const studioNotificationBadge = document.querySelector<HTMLSpanElement>('#studio-notification-badge');
  if (!studioNotificationBadge) return;
  if (newClipsCount > 0) {
    studioNotificationBadge.style.display = 'block';
    studioNotificationBadge.textContent = String(newClipsCount);
  } else {
    studioNotificationBadge.style.display = 'none';
  }
}


function switchView(viewId: 'generator-view' | 'editor-view') {
  const generatorView = document.querySelector<HTMLDivElement>('#generator-view');
  const editorView = document.querySelector<HTMLDivElement>('#editor-view');
  const generatorTabButton = document.querySelector<HTMLButtonElement>('#generator-tab-button');
  const studioTabButton = document.querySelector<HTMLButtonElement>('#studio-tab-button');

  if (viewId === 'generator-view') {
    if (generatorView) generatorView.style.display = 'block';
    if (editorView) editorView.style.display = 'none';
    generatorTabButton?.classList.add('active');
    studioTabButton?.classList.remove('active');
  } else {
    if (generatorView) generatorView.style.display = 'none';
    if (editorView) editorView.style.display = 'flex';
    generatorTabButton?.classList.remove('active');
    studioTabButton?.classList.add('active');
    // These might need to be called from initializeEditor later if they depend on editor state
    // newClipsCount = 0; 
    // updateStudioNotification();
    // renderMediaBin(); 
    // renderTimelineTracks();
  }
  document.body.classList.toggle('generator-active', viewId === 'generator-view');
}

function initResizers() {
    const MIN_PANEL_WIDTH = 150;
    const MIN_PREVIEW_WIDTH = 300;
    const MIN_TIMELINE_HEIGHT = 80;
    const MIN_EDITOR_BODY_HEIGHT = 200;

    // Vertical Resizer 1 (Left)
    const resizerV1 = document.querySelector<HTMLDivElement>('#resizer-v1');
    const mediaPanel = document.querySelector<HTMLDivElement>('.media-panel');
    const editorBody = document.querySelector<HTMLDivElement>('.editor-body');
    const toolsPanel = document.querySelector<HTMLDivElement>('.tools-panel');

    resizerV1?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.body.classList.add('is-resizing-v');

        const startX = e.clientX;
        const startLeftWidth = mediaPanel?.offsetWidth || 0;

        const onMouseMove = (moveEvent: MouseEvent) => {
            if (!mediaPanel || !editorBody || !toolsPanel) return;
            const dx = moveEvent.clientX - startX;
            const newLeftWidth = startLeftWidth + dx;
            
            if (newLeftWidth < MIN_PANEL_WIDTH) return;
            if (editorBody.offsetWidth - newLeftWidth - toolsPanel.offsetWidth < MIN_PREVIEW_WIDTH) return;
            
            mediaPanel.style.flexBasis = `${newLeftWidth}px`;
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            document.body.classList.remove('is-resizing-v');
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    });
    
    // Vertical Resizer 2 (Right)
    const resizerV2 = document.querySelector<HTMLDivElement>('#resizer-v2');

    resizerV2?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.body.classList.add('is-resizing-v');

        const startX = e.clientX;
        const startRightWidth = toolsPanel?.offsetWidth || 0;

        const onMouseMove = (moveEvent: MouseEvent) => {
            if (!toolsPanel || !editorBody || !mediaPanel) return;
            const dx = moveEvent.clientX - startX;
            const newRightWidth = startRightWidth - dx;

            if (newRightWidth < MIN_PANEL_WIDTH) return;
            if (editorBody.offsetWidth - newRightWidth - mediaPanel.offsetWidth < MIN_PREVIEW_WIDTH) return;

            toolsPanel.style.flexBasis = `${newRightWidth}px`;
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            document.body.classList.remove('is-resizing-v');
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    });

    // Horizontal Resizer Logic
    const resizerH = document.querySelector<HTMLDivElement>('#resizer-h');
    const timelineContainer = document.querySelector<HTMLDivElement>('#timeline-container');


    resizerH?.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.body.classList.add('is-resizing-h');

        const startY = e.clientY;
        const startBottomHeight = timelineContainer?.offsetHeight || 0;
        const editorMainContent = editorBody?.parentElement as HTMLElement;
        if (!editorMainContent || !timelineContainer) return;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const dy = moveEvent.clientY - startY;
            const newBottomHeight = startBottomHeight - dy;
            
            if (newBottomHeight > MIN_TIMELINE_HEIGHT && newBottomHeight < (editorMainContent.offsetHeight - MIN_EDITOR_BODY_HEIGHT)) {
                timelineContainer.style.flexBasis = `${newBottomHeight}px`;
                // These functions are now in editor.ts, need to pass them or call methods on an editor instance
                // timelineOverlays.forEach(applyOverlayStyles);
                // renderTimelineRuler();
            }
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            document.body.classList.remove('is-resizing-h');
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    });
}


export async function initializeApp() {
    console.log('initializeApp fired.');
    document.title = 'AI YouTube Shorts Creator';

    // --- DOM Element References (App Level) ---
    // These are elements needed by initializeApp or multiple modules
    const generatorTabButton = document.querySelector<HTMLButtonElement>('#generator-tab-button');
    const studioTabButton = document.querySelector<HTMLButtonElement>('#studio-tab-button');
    const studioNotificationBadge = document.querySelector<HTMLSpanElement>('#studio-notification-badge'); // Needed by updateStudioNotification
    const headerAuthStatus = document.querySelector<HTMLDivElement>('.header-auth-status');
    const authSection = document.querySelector<HTMLDivElement>('#auth-section');
    const userInfoDisplay = document.querySelector<HTMLDivElement>('.user-info-display');
    const userNameEl = document.querySelector<HTMLSpanElement>('#user-name');
    const signOutButton = document.querySelector<HTMLButtonElement>('#sign-out-button');
    const userProfilePictureEl = document.querySelector<HTMLImageElement>('#user-profile-picture');
    const creditBalanceDisplay = document.querySelector<HTMLSpanElement>('#credit-balance');

    // Initialize other modules, passing necessary dependencies
    // Pass displayError and updateStudioNotification to modules that need them
    initializeGenerator(displayError, updateStudioNotification).catch(err => {
        console.error("Error initializing generator:", err);
        displayError("Failed to initialize generator.");
    });

    // initializeEditor will need a lot of dependencies. This call needs to be updated
    // as more functions are moved to editor.ts and dependencies are clearer.
    // Placeholder call:
    initializeEditor(displayError, updateStudioNotification).catch(err => {
        console.error("Error initializing editor:", err);
        displayError("Failed to initialize editor.");
    });


    // Initialize Modals
    // initializeModals requires several editor-related functions that are not yet fully
    // in editor.ts or correctly exported/passed. This will need refinement.
    // Placeholder call:
    // initializeModals(displayError, repackClips, renderTimelineTracks, renderTimelineRuler, updateTimelineUI).catch(error => {
    //     console.error("Error initializing modals:", error);
    //     displayError("Failed to initialize modals.");
    // });


    // Initialize Auth (already set up to take DOM elements)
    // Ensure these DOM elements are correctly selected before passing
     setTimeout(() => {
        const googleSignInButton = document.querySelector<HTMLButtonElement>('#google-sign-in-button');
        // Re-select elements needed by initializeAuth to ensure they are available after a slight delay
        const signOutButtonAuth = document.querySelector<HTMLButtonElement>('#sign-out-button'); 
        const userNameElAuth = document.querySelector<HTMLSpanElement>('#user-name');
        const authSectionAuth = document.querySelector<HTMLDivElement>('#auth-section');
        const userInfoDisplayAuth = document.querySelector<HTMLDivElement>('.user-info-display');
        const userProfilePictureElAuth = document.querySelector<HTMLImageElement>('#user-profile-picture'); 
        const creditBalanceDisplayAuth = document.querySelector<HTMLSpanElement>('#credit-balance');

        if (googleSignInButton) {
             // This listener likely belongs with auth initialization or a dedicated auth UI module
            // For now, keeping it here as it's in the original setTimeout block
            // googleSignInButton.addEventListener('click', () => signInWithPopup(auth, new GoogleAuthProvider()).catch(console.error));
        }

        if (userInfoDisplayAuth && userNameElAuth && authSectionAuth && userProfilePictureElAuth && creditBalanceDisplayAuth && signOutButtonAuth) {
            initializeAuth(userInfoDisplayAuth, userNameElAuth, authSectionAuth, userProfilePictureElAuth, creditBalanceDisplayAuth, signOutButtonAuth).catch(error => {
                  console.error("Error initializing auth state:", error);
                  displayError("Failed to initialize authentication.");
                }
            );
        } else {
             console.warn("Authentication DOM elements not found.");
             // Potentially initialize auth with nulls or handle this case in initializeAuth
        }

    }, 0); // Add a small timeout to ensure DOM is fully ready


    // --- Event Listeners (App Level) ---
    // Tab Listeners
    generatorTabButton?.addEventListener('click', () => switchView('generator-view'));
    studioTabButton?.addEventListener('click', () => switchView('editor-view'));

    // Final initializations
    initResizers(); // This will need the DOM elements to be selected within initResizers or passed to it.
    updateStudioNotification(); // This requires studioNotificationBadge to be selected within initializeApp or passed.
    switchView('generator-view'); // Set initial view
}