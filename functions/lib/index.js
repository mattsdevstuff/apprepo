"use strict";
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
exports.getCredits = exports.stripeWebhook = exports.createCheckoutSession = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const stripe_1 = __importDefault(require("stripe"));
admin.initializeApp();
// Callable function to create a Stripe checkout session that takes a priceId
// and returns a checkout session ID
exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
    // Check if the user is authenticated
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
    }
    const { priceId } = data; // Safely cast data
    if (!priceId) {
        throw new functions.https.HttpsError("invalid-argument", "The function must be called with a priceId.");
    }
    const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-04-10",
    });
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "https://your-app.com/success", // Replace with your actual URL
        cancel_url: "https://your-app.com/cancel", // Replace with your actual URL
        metadata: {
            firebaseUID: context.auth.uid, // Add the user's UID from the callable
            // function context
        },
    });
    return { id: session.id };
});
// Webhook handler for Stripe events
exports.stripeWebhook = functions.https.onRequest(async (request, response) => {
    var _a, _b, _c, _d;
    const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-04-10",
    });
    const endpointSecret = process.env.STRIPE_WEBHOOK;
    let event;
    try {
        const sig = request.headers["stripe-signature"];
        event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
    }
    catch (err) { // Changed type to unknown
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            // Extract priceId from session line_items
            const priceId = (_c = (_b = (_a = session.line_items) === null || _a === void 0 ? void 0 : _a.data[0]) === null || _b === void 0 ? void 0 : _b.price) === null || _c === void 0 ? void 0 : _c.id;
            let creditsToAdd = 0;
            // Map priceId to credits
            if (priceId === process.env.STRIPE_STARTER_PRICE_ID) {
                creditsToAdd = 500; // Starter Pack credits
            }
            else if (priceId === process.env.STRIPE_CREATOR_PRICE_ID) {
                creditsToAdd = 1100; // Creator Pack credits
            }
            else if (priceId === process.env.STRIPE_PRODUCER_PRICE_ID) {
                creditsToAdd = 2500; // Producer Pack credits
            }
            // Extract userId from session metadata
            const userId = (_d = session.metadata) === null || _d === void 0 ? void 0 : _d.firebaseUID;
            if (userId && creditsToAdd > 0) {
                const db = admin.firestore();
                const userRef = db.collection("users").doc(userId);
                try {
                    await db.runTransaction(async (transaction) => {
                        var _a;
                        const userDoc = await transaction.get(userRef);
                        if (!userDoc.exists) {
                            throw new Error("User document does not exist!");
                        }
                        const currentCredits = ((_a = userDoc.data()) === null || _a === void 0 ? void 0 : _a.credits) || 0;
                        const newCredits = currentCredits + creditsToAdd;
                        transaction.update(userRef, { credits: newCredits });
                    });
                    console.log(`Successfully updated credits for user ${userId}`);
                }
                catch (error) {
                    // Changed type to unknown
                    console.error("Transaction failed: ", error);
                    // Consider logging this to a dedicated error tracking system
                }
            }
            else {
                console.warn("Webhook received for session without userId or creditsToAdd", { sessionId: session.id, userId, creditsToAdd });
            }
            // Handle other event types if needed
            // ...
            break;
        }
        default:
            // Unexpected event type
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
});
exports.getCredits = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        // Throwing an HttpsError so that the client gets meaningful error details.
        throw new functions.https.HttpsError("unauthenticated", "The function must be called while authenticated.");
    }
    const userId = context.auth.uid;
    const db = admin.firestore();
    try {
        const userDoc = await db.collection("users").doc(userId).get();
        if (!userDoc.exists) {
            // User document doesn't exist, return 0 credits
            return { credits: 0 };
        }
        const userData = userDoc.data();
        const credits = userData?.credits || 0; // Default to 0 if credits field is missing
        return { credits };
    }
    catch (error) {
        // Log the error and re-throw as an HttpsError
        console.error("Error fetching user credits:", error);
        throw new functions.https.HttpsError("internal", "Unable to fetch credits.", error);
    }
});
//# sourceMappingURL=index.js.map