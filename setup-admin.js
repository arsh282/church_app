// Admin Setup Script
// Run this script to create admin users or update existing users to admin role

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, getDoc, updateDoc } = require('firebase/firestore');

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
const db = getFirestore(app);

// Admin setup functions
const adminSetup = {
  // Create a new admin user profile
  createAdminUser: async (uid, userData) => {
    try {
      const userRef = doc(db, 'users', uid);
      const adminData = {
        ...userData,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      await setDoc(userRef, adminData);
      console.log(`✅ Admin user created: ${userData.fullName} (${userData.email})`);
      return { success: true };
    } catch (error) {
      console.error('❌ Error creating admin user:', error);
      return { success: false, error: error.message };
    }
  },

  // Update existing user to admin role
  promoteToAdmin: async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        console.log('❌ User not found');
        return { success: false, error: 'User not found' };
      }
      
      const userData = userSnap.data();
      await updateDoc(userRef, {
        role: 'admin',
        updatedAt: new Date()
      });
      
      console.log(`✅ User promoted to admin: ${userData.fullName} (${userData.email})`);
      return { success: true };
    } catch (error) {
      console.error('❌ Error promoting user to admin:', error);
      return { success: false, error: error.message };
    }
  },

  // Get user by email
  getUserByEmail: async (email) => {
    try {
      // Note: This is a simplified version. In a real app, you'd query by email
      console.log('📧 To find a user by email, you need to provide their UID');
      console.log('💡 You can find the UID in Firebase Console → Authentication → Users');
      return null;
    } catch (error) {
      console.error('❌ Error finding user:', error);
      return null;
    }
  },

  // List all users (admin only)
  listAllUsers: async () => {
    try {
      console.log('📋 To list all users, go to Firebase Console → Firestore Database → users collection');
      console.log('💡 You can see all user documents and their roles there');
      return [];
    } catch (error) {
      console.error('❌ Error listing users:', error);
      return [];
    }
  }
};

// Example usage functions
const examples = {
  // Example: Create admin user (replace with real data)
  createExampleAdmin: async () => {
    const adminData = {
      uid: 'example-admin-uid',
      email: 'admin@connectfaith.com',
      fullName: 'Church Administrator',
      role: 'admin'
    };
    
    return await adminSetup.createAdminUser(adminData.uid, adminData);
  },

  // Example: Promote existing user to admin (replace with real UID)
  promoteExampleUser: async () => {
    const userUid = 'example-user-uid'; // Replace with actual user UID
    return await adminSetup.promoteToAdmin(userUid);
  }
};

// Main function
const main = async () => {
  console.log('🔐 ConnectFaith Admin Setup Script');
  console.log('Project: connectfaith-1e009');
  console.log('');
  
  console.log('📖 Available functions:');
  console.log('1. Create new admin user');
  console.log('2. Promote existing user to admin');
  console.log('3. List all users (Firebase Console)');
  console.log('');
  
  console.log('💡 Instructions:');
  console.log('- To create an admin: Register normally in the app, then use promoteToAdmin() with the UID');
  console.log('- To find a user UID: Go to Firebase Console → Authentication → Users');
  console.log('- To view all users: Go to Firebase Console → Firestore Database → users collection');
  console.log('');
  
  console.log('🔧 Example usage:');
  console.log('// Create admin user');
  console.log('await adminSetup.createAdminUser("user-uid", { email: "admin@church.com", fullName: "Admin Name" });');
  console.log('');
  console.log('// Promote user to admin');
  console.log('await adminSetup.promoteToAdmin("user-uid");');
  console.log('');
  
  // Uncomment the lines below to run examples
  // await examples.createExampleAdmin();
  // await examples.promoteExampleUser();
};

// Run the script
if (require.main === module) {
  main();
}

module.exports = { adminSetup, examples };
