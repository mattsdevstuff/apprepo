/**
 * Import function triggers from their respective submodules:
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import { onCall, HttpsError, CallableContext } from "firebase-functions/v1/https";
import * as logger from "firebase-functions/logger";
import Stripe from 'stripe';

// Add Firestore import
import { getFirestore } from 'firebase-admin/firestore';


// Dummy usage to satisfy compiler:
console.log(logger);

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.\nsetGlobalOptions({ maxInstances: 10 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!\", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const getCredits = onCall(async (data, context: CallableContext) => { // Assuming getCredits was updated in a previous step
  // Use optional chaining and check for authentication  
  if (!context || !context.auth) {
    // Throwing an HttpsError allows the client to receive a detailed error
    throw new HttpsError(
      'unauthenticated',
      'The user is not authenticated. Only authenticated users can check credits.'
    );
  }

  // Access uid safely
  const uid = context.auth?.uid;
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
export const createCheckoutSession = onCall(async (data: any, context: CallableContext) => {
  if (!context || !context.auth) {
    // Throw an HttpsError if the user is not authenticated
    throw new HttpsError(
      'unauthenticated',
      'The user is not authenticated. Only authenticated users can create a checkout session.'
    );
  }

  const uid = context.auth.uid;
  console.log("Creating checkout session for user:", uid); // Log the UID

  // Validate input and ensure data and data.priceId exist
  // We rely on the runtime check as data is now typed as any
  if (!data || typeof data.priceId !== 'string') {
    throw new HttpsError( // Changed from functions.https.HttpsError
      'invalid-argument',
      'The function requires a single argument \"priceId\" which must be a string.'
    );
  }

  const priceId = data.priceId; // Access priceId after validation

  // Initialize Stripe
  const stripeSecretKey = functions.config().stripe?.secretkey; // Safely access secret key
  if (!stripeSecretKey) {
     throw new HttpsError(
      'failed-precondition',
      'Stripe secret key is not configured.'
    );
  }
  // Removed apiVersion option
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