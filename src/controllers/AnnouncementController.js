import { db } from '../services/firebase';

export const streamAnnouncements = (cb) => {
  // Mock implementation - in real Firebase this would use onSnapshot
  // For now, just call the callback with empty array
  cb([]);
  return () => {}; // Return unsubscribe function
};

export const createAnnouncement = async ({ title, body, tags, createdBy }) => {
  await db.collection('announcements').add({ 
    title, 
    body, 
    tags, 
    createdBy, 
    createdAt: new Date() 
  });
};


