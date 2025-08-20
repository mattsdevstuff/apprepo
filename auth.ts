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

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

async function showSignedIn(user: any) {
    if (!DOM.authSection || !DOM.userActions || !DOM.userNameEl || !DOM.userProfilePictureEl || !DOM.creditBalanceDisplay) return;
    DOM.authSection.style.display = 'none';
    DOM.userActions.style.display = 'flex';
    DOM.userNameEl.textContent = user.displayName;
    DOM.userProfilePictureEl.src = user.photoURL;
    try {
        const credits = await getCredits();
        console.log("Credits received:", credits);
        DOM.creditBalanceDisplay.innerHTML = `<i class="fa-solid fa-coins"></i> ${credits}`;
    } catch (error) {
        console.error("Error fetching credits:", error);
        DOM.creditBalanceDisplay.innerHTML = `<i class="fa-solid fa-coins"></i> --`;
    }
}

function showSignedOut() {
    if (!DOM.authSection || !DOM.userActions) return;
    DOM.authSection.style.display = 'flex';
    DOM.userActions.style.display = 'none';
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
