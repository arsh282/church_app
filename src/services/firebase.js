import { initializeApp } from 'firebase/app';
import {
  getAuth
} from 'firebase/auth';
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

// Initialize Firebase Auth
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);



// Export Firebase services
export { auth, db };

// Database collections
export const collections = {
  USERS: 'users',
  EVENTS: 'events',
  ANNOUNCEMENTS: 'announcements',
  SERMONS: 'sermons',
  PRAYERS: 'prayers',
  DONATIONS: 'donations',
  CHAT_MESSAGES: 'chat_messages',
  CHAT_ROOMS: 'chat_rooms'
};

// User management functions
export const userService = {
  // Create user profile
  createUserProfile: async (uid, userData) => {
    try {
      console.log('🔄 userService: Creating user profile for:', uid);
      console.log('🔄 userService: User data:', userData);
      
      const userRef = doc(db, collections.USERS, uid);
      console.log('🔄 userService: Firestore reference created');
      
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      console.log('✅ userService: User profile created in Firebase successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ userService: Error creating user profile:', error);
      throw error;
    }
  },

  // Get user profile
  getUserProfile: async (uid) => {
    try {
      const userRef = doc(db, collections.USERS, uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        console.log('User profile loaded from Firebase');
        return userSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateUserProfile: async (uid, updates) => {
    try {
      const userRef = doc(db, collections.USERS, uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
};

// Event management functions
export const eventService = {
  // Create event
  createEvent: async (eventData) => {
    try {
      const eventRef = await addDoc(collection(db, collections.EVENTS), {
        ...eventData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: eventRef.id, ...eventData };
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  // Get all events
  getEvents: async () => {
    try {
      const eventsRef = collection(db, collections.EVENTS);
      const q = query(eventsRef, orderBy('date', 'asc'));
      const querySnapshot = await getDocs(q);
      
      const events = [];
      querySnapshot.forEach((doc) => {
        events.push({ id: doc.id, ...doc.data() });
      });
      
      return events;
    } catch (error) {
      console.error('Error getting events:', error);
      throw error;
    }
  },

  // Get event by ID
  getEventById: async (eventId) => {
    try {
      const eventRef = doc(db, collections.EVENTS, eventId);
      const eventSnap = await getDoc(eventRef);
      
      if (eventSnap.exists()) {
        return { id: eventSnap.id, ...eventSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting event:', error);
      throw error;
    }
  },

  // Update event
  updateEvent: async (eventId, updates) => {
    try {
      const eventRef = doc(db, collections.EVENTS, eventId);
      await updateDoc(eventRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  // Delete event
  deleteEvent: async (eventId) => {
    try {
      const eventRef = doc(db, collections.EVENTS, eventId);
      await deleteDoc(eventRef);
      return { success: true };
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
};

// Announcement management functions
export const announcementService = {
  // Create announcement
  createAnnouncement: async (announcementData) => {
    try {
      const announcementRef = await addDoc(collection(db, collections.ANNOUNCEMENTS), {
        ...announcementData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: announcementRef.id, ...announcementData };
    } catch (error) {
      console.error('Error creating announcement:', error);
      throw error;
    }
  },

  // Get all announcements
  getAnnouncements: async () => {
    try {
      const announcementsRef = collection(db, collections.ANNOUNCEMENTS);
      const q = query(announcementsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const announcements = [];
      querySnapshot.forEach((doc) => {
        announcements.push({ id: doc.id, ...doc.data() });
      });
      
      return announcements;
    } catch (error) {
      console.error('Error getting announcements:', error);
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
  }
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
  }
};

// Donation management functions
export const donationService = {
  // Create donation record
  createDonation: async (donationData) => {
    try {
      const donationRef = await addDoc(collection(db, collections.DONATIONS), {
        ...donationData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: donationRef.id, ...donationData };
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    }
  },

  // Get user donations
  getUserDonations: async (userId) => {
    try {
      const donationsRef = collection(db, collections.DONATIONS);
      const q = query(
        donationsRef, 
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const donations = [];
      querySnapshot.forEach((doc) => {
        donations.push({ id: doc.id, ...doc.data() });
      });
      
      return donations;
    } catch (error) {
      console.error('Error getting user donations:', error);
      throw error;
    }
  }
};

// Chat management functions
export const chatService = {
  // Create chat room
  createChatRoom: async (roomData) => {
    try {
      const roomRef = await addDoc(collection(db, collections.CHAT_ROOMS), {
        ...roomData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return { id: roomRef.id, ...roomData };
    } catch (error) {
      console.error('Error creating chat room:', error);
      throw error;
    }
  },

  // Get chat rooms
  getChatRooms: async (userId) => {
    try {
      const roomsRef = collection(db, collections.CHAT_ROOMS);
      const q = query(
        roomsRef,
        where('participants', 'array-contains', userId),
        orderBy('updatedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const rooms = [];
      querySnapshot.forEach((doc) => {
        rooms.push({ id: doc.id, ...doc.data() });
      });
      
      return rooms;
    } catch (error) {
      console.error('Error getting chat rooms:', error);
      throw error;
    }
  },

  // Send message
  sendMessage: async (roomId, messageData) => {
    try {
      const messageRef = await addDoc(collection(db, collections.CHAT_MESSAGES), {
        ...messageData,
        roomId,
        createdAt: serverTimestamp()
      });
      return { id: messageRef.id, ...messageData };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Get messages for a room
  getMessages: async (roomId) => {
    try {
      const messagesRef = collection(db, collections.CHAT_MESSAGES);
      const q = query(
        messagesRef,
        where('roomId', '==', roomId),
        orderBy('createdAt', 'asc')
      );
      const querySnapshot = await getDocs(q);
      
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      
      return messages;
    } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
    }
  }
};

// Real-time listeners
export const realtimeService = {
  // Listen to user profile changes
  onUserProfileChange: (uid, callback) => {
    try {
      const userRef = doc(db, collections.USERS, uid);
      return onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          callback({ id: doc.id, ...doc.data() });
        } else {
          callback(null);
        }
      });
    } catch (error) {
      console.error('Error setting up user profile listener:', error);
      return () => {}; // unsubscribe function
    }
  },

  // Listen to events
  onEventsChange: (callback) => {
    try {
      const eventsRef = collection(db, collections.EVENTS);
      const q = query(eventsRef, orderBy('date', 'asc'));
      return onSnapshot(q, (querySnapshot) => {
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push({ id: doc.id, ...doc.data() });
        });
        callback(events);
      });
    } catch (error) {
      console.error('Error setting up events listener:', error);
      return () => {}; // unsubscribe function
    }
  },

  // Listen to announcements
  onAnnouncementsChange: (callback) => {
    try {
      const announcementsRef = collection(db, collections.ANNOUNCEMENTS);
      const q = query(announcementsRef, orderBy('createdAt', 'desc'));
      return onSnapshot(q, (querySnapshot) => {
        const announcements = [];
        querySnapshot.forEach((doc) => {
          announcements.push({ id: doc.id, ...doc.data() });
        });
        callback(announcements);
      });
    } catch (error) {
      console.error('Error setting up announcements listener:', error);
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
  },

  // Listen to chat messages
  onChatMessagesChange: (roomId, callback) => {
    try {
      const messagesRef = collection(db, collections.CHAT_MESSAGES);
      const q = query(
        messagesRef,
        where('roomId', '==', roomId),
        orderBy('createdAt', 'asc')
      );
      return onSnapshot(q, (querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({ id: doc.id, ...doc.data() });
        });
        callback(messages);
      });
    } catch (error) {
      console.error('Error setting up chat messages listener:', error);
      return () => {}; // unsubscribe function
    }
  }
};


