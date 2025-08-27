// Firebase Setup Script
// Run this script to initialize your Firebase database with sample data

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

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

// Sample data
const sampleEvents = [
  {
    title: "Sunday Service",
    description: "Join us for our weekly Sunday service featuring inspiring worship and powerful preaching.",
    date: new Date("2024-03-17T10:00:00"),
    time: "10:00 AM",
    location: "Main Sanctuary",
    type: "service",
    attendees: 45,
    maxAttendees: 100,
    needsVolunteers: true,
    volunteerRoles: ["Greeters", "Ushers", "Children's Ministry"],
    createdBy: "admin",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    title: "Youth Group Meeting",
    description: "Weekly youth group meeting with games, Bible study, and fellowship.",
    date: new Date("2024-03-19T18:00:00"),
    time: "6:00 PM",
    location: "Youth Hall",
    type: "youth",
    attendees: 12,
    maxAttendees: 30,
    needsVolunteers: false,
    volunteerRoles: [],
    createdBy: "admin",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    title: "Bible Study",
    description: "In-depth Bible study on the Book of Romans.",
    date: new Date("2024-03-21T19:00:00"),
    time: "7:00 PM",
    location: "Conference Room",
    type: "study",
    attendees: 8,
    maxAttendees: 20,
    needsVolunteers: false,
    volunteerRoles: [],
    createdBy: "admin",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
];

const sampleAnnouncements = [
  {
    title: "Welcome to ConnectFaith!",
    content: "We're excited to launch our new mobile app. Stay connected with your church family like never before!",
    priority: "high",
    sendNotification: true,
    createdBy: "admin",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    title: "Weekly Prayer Requests",
    content: "Please keep our community in your prayers this week. Let's lift each other up in faith.",
    priority: "medium",
    sendNotification: false,
    createdBy: "admin",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    title: "Volunteer Opportunities",
    content: "We need volunteers for Sunday service. Please contact the church office if you're interested.",
    priority: "medium",
    sendNotification: true,
    createdBy: "admin",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
];

const sampleSermons = [
  {
    title: "Walking in Faith",
    speaker: "Pastor John Smith",
    date: new Date("2024-03-10T10:00:00"),
    type: "video",
    mediaUrl: "https://example.com/sermon1.mp4",
    description: "A powerful message about walking in faith through difficult times.",
    duration: "45:30",
    tags: ["faith", "perseverance", "trust"],
    createdBy: "admin",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    title: "The Power of Prayer",
    speaker: "Deacon Jane Doe",
    date: new Date("2024-03-03T10:00:00"),
    type: "audio",
    mediaUrl: "https://example.com/sermon2.mp3",
    description: "Understanding the transformative power of prayer in our lives.",
    duration: "38:15",
    tags: ["prayer", "spiritual growth", "relationship"],
    createdBy: "admin",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
];

const samplePrayers = [
  {
    text: "Praying for healing and strength for my friend going through a tough time with their health. May they feel comforted and recover quickly.",
    userId: "user1",
    userName: "Sarah P.",
    isAnonymous: false,
    prayerCount: 15,
    prayedBy: ["user2", "user3", "user4"],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    text: "Please pray for my family as we navigate some difficult decisions. We need wisdom and guidance from above.",
    userId: "user2",
    userName: "Anonymous",
    isAnonymous: true,
    prayerCount: 8,
    prayedBy: ["user1", "user3"],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    text: "Praying for our church community to grow stronger in faith and love. May we be a light to those around us.",
    userId: "admin",
    userName: "Pastor John",
    isAnonymous: false,
    prayerCount: 23,
    prayedBy: ["user1", "user2", "user3", "user4"],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
];

// Function to add sample data
async function addSampleData() {
  try {
    console.log('Starting to add sample data...');

    // Add events
    console.log('Adding sample events...');
    for (const event of sampleEvents) {
      await addDoc(collection(db, 'events'), event);
    }

    // Add announcements
    console.log('Adding sample announcements...');
    for (const announcement of sampleAnnouncements) {
      await addDoc(collection(db, 'announcements'), announcement);
    }

    // Add sermons
    console.log('Adding sample sermons...');
    for (const sermon of sampleSermons) {
      await addDoc(collection(db, 'sermons'), sermon);
    }

    // Add prayers
    console.log('Adding sample prayers...');
    for (const prayer of samplePrayers) {
      await addDoc(collection(db, 'prayers'), prayer);
    }

    console.log('✅ Sample data added successfully!');
    console.log('Your Firebase database is now ready for the ConnectFaith app.');
    
  } catch (error) {
    console.error('❌ Error adding sample data:', error);
  }
}

// Run the setup
if (require.main === module) {
  console.log('🚀 Firebase Setup Script for ConnectFaith');
  console.log('Project: connectfaith-1e009');
  console.log('');
  
  addSampleData();
}

module.exports = { addSampleData };
