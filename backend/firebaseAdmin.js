const admin = require("firebase-admin");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Load Firebase service account key from .env
const serviceAccountPath = process.env.FIREBASE_KEY_PATH;

if (!serviceAccountPath) {
  console.error("❌ FIREBASE_KEY_PATH is not set in .env file");
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

module.exports = auth;
