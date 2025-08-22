
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import * as DOM from './dom';
import { app } from './firebaseConfig';
import { getAuth } from "firebase/auth";
import { getCredits } from "./api";
import { updateDashboardStats } from "./ui";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

async function showSignedIn(user: any) {
    if (!DOM.authSection || !DOM.userActions || !DOM.userNameEl || !DOM.userProfilePictureEl || !DOM.creditBalanceDisplay) return;
    
    // Sidebar Auth UI
    DOM.authSection.style.display = 'none';
    DOM.userActions.style.display = 'flex';
    DOM.userNameEl.textContent = user.displayName;
    DOM.userProfilePictureEl.src = user.photoURL;

    // Dashboard "My Account" UI
    if (DOM.dashboardUserInfo && DOM.dashboardUserProfilePicture && DOM.dashboardUserName && DOM.dashboardUserEmail) {
        DOM.dashboardUserInfo.style.display = 'flex';
        DOM.dashboardUserProfilePicture.src = user.photoURL;
        DOM.dashboardUserName.textContent = user.displayName;
        DOM.dashboardUserEmail.textContent = user.email;
    }

    try {
        const credits = await getCredits();
        console.log("Credits received:", credits);
        DOM.creditBalanceDisplay.innerHTML = `<i class="fa-solid fa-coins"></i> ${credits}`;
        updateDashboardStats(credits);
    } catch (error) {
        console.error("Error fetching credits:", error);
        DOM.creditBalanceDisplay.innerHTML = `<i class="fa-solid fa-coins"></i> --`;
        updateDashboardStats(0); // Show 0 on error
    }
}

function showSignedOut() {
    if (!DOM.authSection || !DOM.userActions) return;
    
    // Sidebar Auth UI
    DOM.authSection.style.display = 'flex';
    DOM.userActions.style.display = 'none';
    
    // Dashboard "My Account" UI
    if (DOM.dashboardUserInfo && DOM.dashboardUserProfilePicture && DOM.dashboardUserName && DOM.dashboardUserEmail) {
        DOM.dashboardUserInfo.style.display = 'none';
        DOM.dashboardUserProfilePicture.src = '';
        DOM.dashboardUserName.textContent = '';
        DOM.dashboardUserEmail.textContent = '';
    }
    
    updateDashboardStats(0); // Clear dashboard stats
}

async function signIn() {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Sign in error:", error);
    }
}

async function signOut() {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        console.error("Sign out error:", error);
    }
}

export function initAuth() {
    onAuthStateChanged(auth, user => {
        if (user) {
            showSignedIn(user);
        } else {
            showSignedOut();
        }
    });

    DOM.googleSignInButton?.addEventListener('click', signIn);
    DOM.signOutButton?.addEventListener('click', signOut);
}
