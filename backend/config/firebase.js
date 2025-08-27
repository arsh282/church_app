const admin = require('firebase-admin');
require('dotenv').config();

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  try {
    // Check if Firebase is already initialized
    if (admin.apps.length === 0) {
      // Use service account key if provided, otherwise use default credentials
      if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
      } else {
        // For development, you can use default credentials
        admin.initializeApp({
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        });
      }
    }

    console.log('✅ Firebase Admin SDK initialized successfully');
    return admin;
  } catch (error) {
    console.error('❌ Firebase initialization error:', error.message);
    throw error;
  }
};

// Get Firestore instance
const getFirestore = () => {
  return admin.firestore();
};

// Get Auth instance
const getAuth = () => {
  return admin.auth();
};

// Get Storage instance
const getStorage = () => {
  return admin.storage();
};

module.exports = {
  initializeFirebase,
  getFirestore,
  getAuth,
  getStorage,
  admin
};
