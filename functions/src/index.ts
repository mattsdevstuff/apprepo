/**
 * Import function triggers from their respective submodules:
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as admin from 'firebase-admin'; // Import firebase-admin
import * as functions from "firebase-functions";
import Stripe from 'stripe';
import { HttpsError, onCall, CallableRequest } from "firebase-functions/v2/https";

// Add Firestore import
import { getFirestore } from 'firebase-admin/firestore';
import { startVideoGeneration, checkVideoGenerationStatus } from './video';
import { generateText } from './text';

// Initialize the Firebase Admin SDK
admin.initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const getCredits = onCall(async (request: CallableRequest) => {
  if (!request.auth) {
    // Throwing an HttpsError allows the client to receive a detailed error.
    throw new HttpsError(
      'unauthenticated',
      'The user is not authenticated. Only authenticated users can check credits.'
    );
  }

  // Access uid safely using request.auth
  const uid = request.auth.uid;
  const db = getFirestore();

  try {
    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      // If the user document doesn't exist, maybe they are a new user
      // We could potentially create it here with 0 credits, or rely on frontend/auth trigger
      // For now, let's return 0 credits and log a warning
      console.warn(`User document not found for UID: ${uid}. Returning 0 credits.`);
      return { credits: 0 };
    }

    const userData = userDoc.data();
    const credits = userData?.credits || 0; // Get credits field, default to 0 if not found

    return { credits: credits };
  } catch (error) {
    console.error('Error fetching credits for user', uid, ':', error);
    // Throw an HttpsError to the client
    throw new HttpsError(
      'internal',
      'Unable to fetch user credits.',
      error // Include original error for debugging on the server
    );
  }
});

export const createCheckoutSession = onCall(async (request: CallableRequest) => {
  if (!request.auth) {
    // Throw an HttpsError if the user is not authenticated
    throw new HttpsError(
      'unauthenticated',
      'The user is not authenticated. Only authenticated users can create a checkout session.'
    );
  }
  const uid = request.auth.uid;
  console.log("Creating checkout session for user:", uid);

  // We rely on the runtime check as data is now typed as any
  if (!request.data || typeof request.data.priceId !== 'string') {
    throw new HttpsError(
      'invalid-argument',
      'The function requires a single argument \"priceId\" which must be a string.'
    );
  }

  const priceId = request.data.priceId; // Access priceId after validation

  // Initialize Stripe
  const stripeSecretKey = functions.config().stripe?.secretkey; // Safely access secret key
  if (!stripeSecretKey) {
     throw new HttpsError(
      'failed-precondition',
      'Stripe secret key is not configured.'
    );
  }
  const stripe = new Stripe(stripeSecretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/canceled`,
      client_reference_id: uid, // Link the session to the Firebase user
    });

    return { id: session.id };
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    throw new HttpsError('internal', 'Unable to create checkout session.', error);
  }
});


exports.startVideoGeneration = startVideoGeneration;
exports.checkVideoGenerationStatus = checkVideoGenerationStatus;
exports.generateText = generateText;