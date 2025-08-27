import { initializeApp } from 'firebase/app';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore';
import { networkUtils } from './networkUtils';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrgokfc1x-SY0zLSwQBGHebBTzRbKuupk",
  authDomain: "connectfaith-1e009.firebaseapp.com",
  projectId: "connectfaith-1e009",
  storageBucket: "connectfaith-1e009.firebasestorage.app",
  messagingSenderId: "652950877900",
  appId: "1:652950877900:web:7f7a6c666d0fa6fa22b469",
  measurementId: "G-DVW7PC6NJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firebase services
export { db };

// Database collections (only sermons and prayers)
export const collections = {
  SERMONS: 'sermons',
  PRAYERS: 'prayers'
};

// Sermon management functions
export const sermonService = {
  // Create sermon
  createSermon: async (sermonData) => {
    try {
      const sermonRef = await addDoc(collection(db, collections.SERMONS), {
        ...sermonData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: sermonRef.id, ...sermonData };
    } catch (error) {
      console.error('Error creating sermon:', error);
      throw error;
    }
  },

  // Get all sermons
  getSermons: async () => {
    try {
      const sermonsRef = collection(db, collections.SERMONS);
      const q = query(sermonsRef, orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const sermons = [];
      querySnapshot.forEach((doc) => {
        sermons.push({ id: doc.id, ...doc.data() });
      });
      
      return sermons;
    } catch (error) {
      console.error('Error getting sermons:', error);
      throw error;
    }
  },

  // Get sermon by ID
  getSermonById: async (sermonId) => {
    try {
      const sermonRef = doc(db, collections.SERMONS, sermonId);
      const sermonSnap = await getDoc(sermonRef);
      
      if (sermonSnap.exists()) {
        return { id: sermonSnap.id, ...sermonSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting sermon:', error);
      throw error;
    }
  },

  // Update sermon
  updateSermon: async (sermonId, updates) => {
    try {
      const sermonRef = doc(db, collections.SERMONS, sermonId);
      await updateDoc(sermonRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating sermon:', error);
      throw error;
    }
  },

  // Delete sermon
  deleteSermon: async (sermonId) => {
    try {
      const sermonRef = doc(db, collections.SERMONS, sermonId);
      await deleteDoc(sermonRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting sermon:', error);
      throw error;
    }
  }
};

// Prayer management functions
export const prayerService = {
  // Create prayer request
  createPrayer: async (prayerData) => {
    try {
      const prayerRef = await addDoc(collection(db, collections.PRAYERS), {
        ...prayerData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: prayerRef.id, ...prayerData };
    } catch (error) {
      console.error('Error creating prayer:', error);
      throw error;
    }
  },

  // Get all prayers
  getPrayers: async () => {
    try {
      const prayersRef = collection(db, collections.PRAYERS);
      const q = query(prayersRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const prayers = [];
      querySnapshot.forEach((doc) => {
        prayers.push({ id: doc.id, ...doc.data() });
      });
      
      return prayers;
    } catch (error) {
      console.error('Error getting prayers:', error);
      throw error;
    }
  },

  // Get prayer by ID
  getPrayerById: async (prayerId) => {
    try {
      const prayerRef = doc(db, collections.PRAYERS, prayerId);
      const prayerSnap = await getDoc(prayerRef);
      
      if (prayerSnap.exists()) {
        return { id: prayerSnap.id, ...prayerSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting prayer:', error);
      throw error;
    }
  },

  // Update prayer (e.g., increment prayer count)
  updatePrayer: async (prayerId, updates) => {
    try {
      const prayerRef = doc(db, collections.PRAYERS, prayerId);
      await updateDoc(prayerRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating prayer:', error);
      throw error;
    }
  },

  // Delete prayer
  deletePrayer: async (prayerId) => {
    try {
      const prayerRef = doc(db, collections.PRAYERS, prayerId);
      await deleteDoc(prayerRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting prayer:', error);
      throw error;
    }
  }
};

// Real-time listeners for sermons and prayers
export const realtimeService = {
  // Listen to sermons
  onSermonsChange: (callback) => {
    try {
      const sermonsRef = collection(db, collections.SERMONS);
      const q = query(sermonsRef, orderBy('date', 'desc'));
      return onSnapshot(q, (querySnapshot) => {
        const sermons = [];
        querySnapshot.forEach((doc) => {
          sermons.push({ id: doc.id, ...doc.data() });
        });
        callback(sermons);
      });
    } catch (error) {
      console.error('Error setting up sermons listener:', error);
      return () => {}; // unsubscribe function
    }
  },

  // Listen to prayers
  onPrayersChange: (callback) => {
    try {
      const prayersRef = collection(db, collections.PRAYERS);
      const q = query(prayersRef, orderBy('createdAt', 'desc'));
      return onSnapshot(q, (querySnapshot) => {
        const prayers = [];
        querySnapshot.forEach((doc) => {
          prayers.push({ id: doc.id, ...doc.data() });
        });
        callback(prayers);
      });
    } catch (error) {
      console.error('Error setting up prayers listener:', error);
      return () => {}; // unsubscribe function
    }
  }
};


