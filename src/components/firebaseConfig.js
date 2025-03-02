import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration object
// Replace these values with your Firebase project credentials from the Firebase Console
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyDQdcFjbtugwpb3SG4J8O6tbOpG1pbHBos',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'mindcare-2d98a.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'mindcare-2d98a',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'mindcare-2d98a.firebasestorage.app',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '734092205516',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:734092205516:web:c46ef2f1be7cfc0ba09169',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export default app;