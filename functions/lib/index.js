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
const admin = __importStar(require("firebase-admin")); // Import firebase-admin
const functions = __importStar(require("firebase-functions"));
const stripe_1 = __importDefault(require("stripe"));
const https_1 = require("firebase-functions/v2/https");
// Add Firestore import
const firestore_1 = require("firebase-admin/firestore");
const video_1 = require("./video");
const text_1 = require("./text");
// Initialize the Firebase Admin SDK
admin.initializeApp();
// Start writing functions
// https://firebase.google.com/docs/functions/typescript
exports.getCredits = (0, https_1.onCall)(async (request) => {
    if (!request.auth) {
        // Throwing an HttpsError allows the client to receive a detailed error.
        throw new https_1.HttpsError('unauthenticated', 'The user is not authenticated. Only authenticated users can check credits.');
    }
    // Access uid safely using request.auth
    const uid = request.auth.uid;
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
exports.createCheckoutSession = (0, https_1.onCall)(async (request) => {
    var _a;
    if (!request.auth) {
        // Throw an HttpsError if the user is not authenticated
        throw new https_1.HttpsError('unauthenticated', 'The user is not authenticated. Only authenticated users can create a checkout session.');
    }
    const uid = request.auth.uid;
    console.log("Creating checkout session for user:", uid);
    // We rely on the runtime check as data is now typed as any
    if (!request.data || typeof request.data.priceId !== 'string') {
        throw new https_1.HttpsError('invalid-argument', 'The function requires a single argument \"priceId\" which must be a string.');
    }
    const priceId = request.data.priceId; // Access priceId after validation
    // Initialize Stripe
    const stripeSecretKey = (_a = functions.config().stripe) === null || _a === void 0 ? void 0 : _a.secretkey; // Safely access secret key
    if (!stripeSecretKey) {
        throw new https_1.HttpsError('failed-precondition', 'Stripe secret key is not configured.');
    }
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
exports.startVideoGeneration = video_1.startVideoGeneration;
exports.checkVideoGenerationStatus = video_1.checkVideoGenerationStatus;
exports.generateText = text_1.generateText;
//# sourceMappingURL=index.js.map