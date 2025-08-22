/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { getAuth } from 'firebase/auth';
import { createStripeCheckoutSession } from './api';
import { app } from './firebaseConfig';
import * as DOM from './dom';

// This is a public key. It's safe to expose.
// Replace with your actual Stripe publishable key from your Stripe dashboard.
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51PLa3cBiRVB8RnGO6pQ9aZ2Y7fGb1fDoSBhyI2T7dG8gY52JqM20Jg7fE6i7w0K4mH3g0i5p1j0w0k1L2g1h0j1l00j1l1k2l3'; // Example Test Key

let stripe: any;

async function handleBuyButtonClick(this: HTMLButtonElement) {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (!user) {
        alert('Please sign in to make a purchase.');
        return;
    }

    const priceId = this.dataset.priceId;
    if (!priceId) {
        console.error('No price ID found on button');
        return;
    }
    
    const originalButtonText = this.innerHTML;
    this.innerHTML = '<div class="loader" style="width: 18px; height: 18px; margin: auto;"></div>';
    this.disabled = true;

    try {
        const sessionId = await createStripeCheckoutSession(priceId);
        if (stripe) {
            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) {
                throw new Error(error.message);
            }
        } else {
            throw new Error('Stripe.js has not loaded yet.');
        }
    } catch (error) {
        console.error('Stripe checkout error:', error);
        alert(`Could not initiate checkout. ${error instanceof Error ? error.message : 'Please try again.'}`);
        this.innerHTML = originalButtonText;
        this.disabled = false;
    }
}


export function initBilling() {
    if ((window as any).Stripe) {
        stripe = (window as any).Stripe(STRIPE_PUBLISHABLE_KEY);
    } else {
        // Stripe.js might not be loaded yet. Wait for it.
        document.addEventListener('DOMContentLoaded', () => {
             if ((window as any).Stripe) {
                stripe = (window as any).Stripe(STRIPE_PUBLISHABLE_KEY);
             } else {
                console.error('Stripe.js failed to load.');
             }
        });
    }

    DOM.buyButtons.forEach(button => {
        button.addEventListener('click', handleBuyButtonClick);
    });
}
