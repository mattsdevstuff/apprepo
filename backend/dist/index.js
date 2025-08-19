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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const admin = __importStar(require("firebase-admin"));
admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: process.env.APP_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.APP_FIREBASE_CLIENT_EMAIL,
        projectId: process.env.APP_FIREBASE_PROJECT_ID,
    }),
});
const app = (0, express_1.default)();
const port = process.env.PORT || 8080; // Cloud Run default port is 8080
// Check for required environment variables
const cloudRunUrl = process.env.CLOUD_RUN_URL || 'YOUR_CLOUD_RUN_URL'; // Set this environment variable
const frontendUrl = process.env.FRONTEND_URL || 'YOUR_FRONTEND_URL'; // Set this environment variable
app.use(express_1.default.json()); // Middleware to parse JSON bodies
dotenv_1.default.config(); // Load environment variables from .env
app.get('/', (req, res) => {
    const token = req.query.token;
    if (token) {
        res.redirect(`${frontendUrl}/?token=${token}`);
    }
    else {
        res.send('Backend is running. No token found.');
    }
});
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
});
