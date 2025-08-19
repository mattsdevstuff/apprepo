"use strict";
/**
 * Import function triggers from their respective submodules:
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCheckoutSession = exports.getCredits = void 0;
const functions = __importStar(require("firebase-functions"));
const https_1 = require("firebase-functions/v1/https");
const logger = __importStar(require("firebase-functions/logger"));
const stripe_1 = __importDefault(require("stripe"));
// Add Firestore import
const firestore_1 = require("firebase-admin/firestore");
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
exports.getCredits = (0, https_1.onCall)(async (data, context) => {
    var _a;
    // Use optional chaining and check for authentication  
    if (!context || !context.auth) {
        // Throwing an HttpsError allows the client to receive a detailed error
        throw new https_1.HttpsError('unauthenticated', 'The user is not authenticated. Only authenticated users can check credits.');
    }
    // Access uid safely
    const uid = (_a = context.auth) === null || _a === void 0 ? void 0 : _a.uid;
    const db = (0, firestore_1.getFirestore)();
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
        const credits = (userData === null || userData === void 0 ? void 0 : userData.credits) || 0; // Get credits field, default to 0 if not found
        return { credits: credits };
    }
    catch (error) {
        console.error('Error fetching credits for user', uid, ':', error);
        // Throw an HttpsError to the client
        throw new https_1.HttpsError('internal', 'Unable to fetch user credits.', error // Include original error for debugging on the server
        );
    }
});
exports.createCheckoutSession = (0, https_1.onCall)(async (data, context) => {
    var _a;
    if (!context || !context.auth) {
        // Throw an HttpsError if the user is not authenticated
        throw new https_1.HttpsError('unauthenticated', 'The user is not authenticated. Only authenticated users can create a checkout session.');
    }
    const uid = context.auth.uid;
    console.log("Creating checkout session for user:", uid); // Log the UID
    // Validate input and ensure data and data.priceId exist
    // We rely on the runtime check as data is now typed as any
    if (!data || typeof data.priceId !== 'string') {
        throw new https_1.HttpsError(// Changed from functions.https.HttpsError
        'invalid-argument', 'The function requires a single argument \"priceId\" which must be a string.');
    }
    const priceId = data.priceId; // Access priceId after validation
    // Initialize Stripe
    const stripeSecretKey = (_a = functions.config().stripe) === null || _a === void 0 ? void 0 : _a.secretkey; // Safely access secret key
    if (!stripeSecretKey) {
        throw new https_1.HttpsError('failed-precondition', 'Stripe secret key is not configured.');
    }
    // Removed apiVersion option
    const stripe = new stripe_1.default(stripeSecretKey);
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/canceled`,
            client_reference_id: uid, // Link the session to the Firebase user
        });
        return { id: session.id };
    }
    catch (error) {
        console.error('Error creating Stripe checkout session:', error);
        throw new https_1.HttpsError('internal', 'Unable to create checkout session.', error);
    }
});
//# sourceMappingURL=index.js.map