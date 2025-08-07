# Run and deploy your AI Studio app

This project includes both a frontend application and a backend server.

## Run Locally

**Prerequisites:**  Node.js
*   **Firebase Project:** You need a Firebase project. Set up Firebase Authentication and enable Google as a Sign-in provider in the Firebase console.
 Google Sign-in is handled client-side by the Firebase SDK.
*   **Firebase Service Account Key:** Generate a private key for a Firebase service account from your Firebase project settings (Project settings > Service accounts). This file allows your backend to securely interact with Firebase Admin SDK.
*   **Cloud Workstation Environment:** This project is specifically configured to run within a cloud workstation environment, which exposes different services on specific ports via external URLs.

**Setup:**

1.  **Install Dependencies:** Install dependencies for both the frontend and backend.

    *   Install frontend dependencies (from the project root):
   `npm install`
    *   Install backend dependencies (from the project root):
    `cd backend && npm install`

2.  **Place Firebase Service Account Key:** Place the downloaded Firebase service account key JSON file in the `/backend/config/` directory. Rename it to `firebaseadm.json`.

3.  **Configure Environment Variables:** Create a `.env` file in the `/backend/` directory with the following variables:


