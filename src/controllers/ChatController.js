import { db } from '../services/firebase';

export const streamGroupMessages = (groupId, cb) => {
  // Mock implementation - in real Firebase this would use onSnapshot
  // For now, just call the callback with empty array
  cb([]);
  return () => {}; // Return unsubscribe function
};

export const sendMessage = async (groupId, { userId, text }) => {
  await db.collection('groups').doc(groupId).collection('messages').add({ 
    userId, 
    text, 
    createdAt: new Date() 
  });
};


