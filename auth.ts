/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebaseConfig';
import * as DOM from './dom';

const auth = getAuth(app);
const functions = getFunctions(app);
const getCredits = httpsCallable(functions, 'getCredits');
const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');

function setupStripeCheckout() {
    DOM.buyCreditsButton?.addEventListener('click', () => {
        if (DOM.creditsModal) {
            DOM.creditsModal.style.display = 'flex';
        }
    });

    DOM.creditsCancelButton?.addEventListener('click', () => {
        if (DOM.creditsModal) {
            DOM.creditsModal.style.display = 'none';
        }
    });

    DOM.buyButtons?.forEach(button => {
        button.addEventListener('click', async () => {
            const priceId = button.dataset.priceId;
            if (!priceId) {
                console.error('Price ID not found on buy button');
                // displayError is in ui.ts, need a way to call it
                alert('Could not initiate checkout: Price ID is missing.');
                return;
            }

            try {
                const session = await createCheckoutSession({ priceId });
                const sessionId = (session.data as any)?.id;

                if (sessionId) {
                    const stripe = (window as any).Stripe('YOUR_STRIPE_PUBLIC_KEY'); // Replace with your public key
                    stripe.redirectToCheckout({ sessionId: sessionId });
                } else {
                    throw new Error('Failed to get checkout session ID.');
                }
            } catch (error) {
                console.error('Error creating checkout session:', error);
                const message = `Failed to initiate checkout: ${error instanceof Error ? error.message : String(error)}`;
                alert(message);
            }
        });
    });
}

function setupUserProfileDropdown() {
    DOM.userProfileTrigger?.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = DOM.userProfileDropdown;
        const trigger = DOM.userProfileTrigger;
        if (dropdown && trigger) {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                dropdown.classList.remove('show');
                trigger.setAttribute('aria-expanded', 'false');
            } else {
                dropdown.classList.add('show');
                trigger.setAttribute('aria-expanded', 'true');
            }
        }
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', () => {
        const dropdown = DOM.userProfileDropdown;
        const trigger = DOM.userProfileTrigger;
        if (dropdown?.classList.contains('show')) {
            dropdown.classList.remove('show');
            trigger?.setAttribute('aria-expanded', 'false');
        }
    });
}


export function initAuth() {
    setTimeout(() => {
        console.log('Attaching onAuthStateChanged listener.');

        DOM.googleSignInButton?.addEventListener('click', () => {
            signInWithPopup(auth, new GoogleAuthProvider()).catch(console.error);
        });

        onAuthStateChanged(auth, async (user) => {
            console.log('Auth state changed. User:', user);
            if (user && DOM.userActions && DOM.userNameEl && DOM.authSection && DOM.userProfilePictureEl && DOM.signOutButton && DOM.creditBalanceDisplay && DOM.buyCreditsButton) {
                console.log('User is signed in:', user.uid);
                
                DOM.userActions.style.display = 'flex';
                DOM.userNameEl.textContent = `${user.displayName || user.email || 'User'}`;
                DOM.authSection.style.display = 'none';
                
                DOM.userProfilePictureEl.src = user.photoURL || 'pfp.png';
                
                DOM.signOutButton.onclick = () => signOut(auth);

                try {
                    console.log('Attempting to fetch credits...');
                    const result = await getCredits();
                    const credits = (result.data as any)?.credits || 0;
                    DOM.creditBalanceDisplay.innerHTML = `<i class="fa-solid fa-coins" aria-hidden="true"></i> ${credits}`;
                    console.log('Successfully fetched credits:', result);
                } catch (error) {
                    console.error('Error fetching credits:', error);
                }

            } else {
                console.log('User is signed out');
                if (DOM.userActions) DOM.userActions.style.display = 'none';
                if (DOM.authSection) DOM.authSection.style.display = 'flex';
                if (DOM.userNameEl) DOM.userNameEl.textContent = '';
                if (DOM.userProfilePictureEl) {
                    DOM.userProfilePictureEl.src = '';
                }
            }
        });
    }, 0);

    setupStripeCheckout();
    setupUserProfileDropdown();
}