// Add Users Script
// Run this script to add users to your ConnectFaith app

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

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

// Sample users to add
const sampleUsers = [
  {
    uid: 'member-001',
    email: 'member1@connectfaith.com',
    fullName: 'John Smith',
    role: 'user',
    phone: '+1234567890',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'member-002',
    email: 'member2@connectfaith.com',
    fullName: 'Sarah Johnson',
    role: 'user',
    phone: '+1234567891',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'admin-001',
    email: 'admin@connectfaith.com',
    fullName: 'Pastor Michael',
    role: 'admin',
    phone: '+1234567892',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    uid: 'member-003',
    email: 'member3@connectfaith.com',
    fullName: 'Emily Davis',
    role: 'user',
    phone: '+1234567893',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Function to add users
const addUsers = async () => {
  try {
    console.log('🚀 Adding sample users to ConnectFaith...');
    console.log('');

    for (const user of sampleUsers) {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, user);
      
      console.log(`✅ Added user: ${user.fullName} (${user.email}) - Role: ${user.role}`);
    }

    console.log('');
    console.log('🎉 All users added successfully!');
    console.log('');
    console.log('📋 User Summary:');
    console.log('- 3 Member users (role: user)');
    console.log('- 1 Admin user (role: admin)');
    console.log('');
    console.log('💡 Next steps:');
    console.log('1. Go to Firebase Console → Authentication → Users');
    console.log('2. Add these users to Authentication (for login)');
    console.log('3. Or register them normally through the app');
    console.log('4. Check Firestore Database → users collection to see profiles');

  } catch (error) {
    console.error('❌ Error adding users:', error);
  }
};

// Function to add a single user
const addSingleUser = async (userData) => {
  try {
    const userRef = doc(db, 'users', userData.uid);
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    console.log(`✅ User added: ${userData.fullName} (${userData.email})`);
    return { success: true };
  } catch (error) {
    console.error('❌ Error adding user:', error);
    return { success: false, error: error.message };
  }
};

// Main function
const main = async () => {
  console.log('👥 ConnectFaith User Management');
  console.log('Project: connectfaith-1e009');
  console.log('');
  
  console.log('📖 Available actions:');
  console.log('1. Add sample users (profiles only)');
  console.log('2. Add single user');
  console.log('3. View user management guide');
  console.log('');
  
  console.log('💡 Important Notes:');
  console.log('- This script adds user PROFILES to Firestore');
  console.log('- You still need to add users to Authentication for login');
  console.log('- Or register users normally through the app');
  console.log('');
  
  // Add sample users
  await addUsers();
  
  console.log('');
  console.log('🔧 To add a single user manually:');
  console.log('const userData = {');
  console.log('  uid: "unique-user-id",');
  console.log('  email: "user@example.com",');
  console.log('  fullName: "User Name",');
  console.log('  role: "user" // or "admin"');
  console.log('};');
  console.log('await addSingleUser(userData);');
};

// Run the script
if (require.main === module) {
  main();
}

module.exports = { addUsers, addSingleUser };
