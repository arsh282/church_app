import { db } from '../services/firebase';

export const createEvent = async (payload) => {
  const result = await db.collection('events').add({ 
    ...payload, 
    createdAt: new Date() 
  });
  return result;
};

export const getEvent = async (id) => {
  const snap = await db.collection('events').doc(id).get();
  return snap.exists ? { id: snap.id, ...snap.data() } : null;
};

export const streamEventsForMonth = (monthStartISO, monthEndISO, cb) => {
  // Mock implementation - in real Firebase this would use onSnapshot
  // For now, just call the callback with empty array
  cb([]);
  return () => {}; // Return unsubscribe function
};


