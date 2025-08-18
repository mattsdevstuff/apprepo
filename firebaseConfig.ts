// firebaseConfig.ts
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcBjgAvyP3HbvRuWinDEtW8jBRsiCBKx4",
  authDomain: "video-app-194ba.firebaseapp.com", // Reverted to static value
  projectId: "video-app-194ba",
  storageBucket: "video-app-194ba.firebasestorage.app",
  messagingSenderId: "225357105229",
  appId: "1:225357105229:web:104d17569750ed4c23f404"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
