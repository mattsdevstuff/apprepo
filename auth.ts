import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './firebaseConfig'; // Assuming firebaseConfig is in the same directory
import { getFunctions, httpsCallable } from 'firebase/functions'; // Needed for getCredits
import { User } from 'firebase/auth'; // Import User type

// Add a placeholder for the displayError function. This will need to be passed in or handled differently later.
// For now, we'll use a simple console log.
const displayError = (message: string) => console.error('Auth Error:', message);

export const auth = getAuth(app);

// Assuming you have callable functions set up:
const functions = getFunctions(app);
const getCredits = httpsCallable(functions, 'getCredits');

export async function initializeAuth(
    userInfoDisplay: HTMLDivElement | null,
    userNameEl: HTMLSpanElement | null,
    authSection: HTMLDivElement | null,
    userProfilePictureEl: HTMLImageElement | null,
    creditBalanceDisplay: HTMLSpanElement | null,
    signOutButton: HTMLButtonElement | null
) {
    console.log('Attaching onAuthStateChanged listener.');

    // Auth State Change Listener
    onAuthStateChanged(auth, async (user) => { // Made the function async
        console.log('Auth state changed. User:', user);
        // Check if the required DOM elements and user are available before proceeding
        if (user && userInfoDisplay && userNameEl && authSection) {
            console.log('User photoURL:', user.photoURL);
            console.log('User is signed in:', user.uid);

            // Fetch and display credits
            if (user && creditBalanceDisplay) {
                try {
                    console.log('Attempting to fetch credits...');
                    const result = await getCredits();
                    const credits = (result.data as any)?.credits || 0;
                    creditBalanceDisplay.textContent = `Credits: ${credits}`;
                    console.log('Successfully fetched credits:', result);
                } catch (error) {
                    console.error('Error fetching credits:', error);
                }
            }
            if (userInfoDisplay) userInfoDisplay.style.display = 'flex';
            if (userNameEl) userNameEl.textContent = `Welcome, ${user.displayName || user.email || 'User'}`;
            if (authSection) authSection.style.display = 'none';
            // Display profile picture if available
            if (userProfilePictureEl) {
                userProfilePictureEl.src = user.photoURL || 'pfp.png';
                userProfilePictureEl.style.display = 'block';
            }
            if (signOutButton) signOutButton.addEventListener('click', () => signOut(auth));

        } else {
            console.log('User is signed out');
            if (userInfoDisplay) userInfoDisplay.style.display = 'none'; // Ensure this is hidden
            if (authSection) authSection.style.display = 'flex'; // Ensure this is shown
            if (userNameEl) userNameEl.textContent = ''; // Clear name
            // Hide profile picture when signed out
            if (userProfilePictureEl) userProfilePictureEl.style.display = 'none'; // Hide the image element
        }
    });
}