import express from 'express';
import dotenv from 'dotenv';
import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.APP_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    clientEmail: process.env.APP_FIREBASE_CLIENT_EMAIL!,
    projectId: process.env.APP_FIREBASE_PROJECT_ID!,
  }),
});

const app = express();
const port = process.env.PORT || 8080; // Cloud Run default port is 8080

// Check for required environment variables
const cloudRunUrl = process.env.CLOUD_RUN_URL || 'YOUR_CLOUD_RUN_URL'; // Set this environment variable
const frontendUrl = process.env.FRONTEND_URL || 'YOUR_FRONTEND_URL'; // Set this environment variable

app.use(express.json()); // Middleware to parse JSON bodies
dotenv.config(); // Load environment variables from .env

app.get('/', (req, res) => {
  const token = req.query.token as string;
  if (token) {
    res.redirect(`${frontendUrl}/?token=${token}`);
  } else {
    res.send('Backend is running. No token found.');
  }
});

app.get('/credits', async (req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send('Unauthorized');
  }
  const token = authorization.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    const userRecord = await admin.auth().getUser(uid);
    const credits = (userRecord.customClaims && userRecord.customClaims.credits) || 0;
    res.status(200).json({ credits });
  } catch (error) {
    console.error('Error fetching credits:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
 console.log(`Backend listening on port ${port}`);
});
