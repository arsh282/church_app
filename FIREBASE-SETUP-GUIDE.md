# Firebase Setup Guide for ConnectFaith App

This guide will help you set up Firebase for your ConnectFaith app with Authentication and Firestore Database (no Storage).

## 🔥 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `connectfaith-1e009`
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## 🔐 Step 2: Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. Click "Save"

## 📊 Step 3: Create Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (we'll add security rules later)
4. Choose a location close to your users (e.g., "us-central1")
5. Click "Done"

## 🛡️ Step 4: Set Up Security Rules

### Firestore Security Rules
1. Go to "Firestore Database" → "Rules"
2. Replace the existing rules with these:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read events, announcements, sermons
    match /events/{eventId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /announcements/{announcementId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /sermons/{sermonId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users can create prayers, read all prayers
    match /prayers/{prayerId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // Users can manage their own donations
    match /donations/{donationId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
    
    // Chat rooms - users can access rooms they're part of
    match /chat_rooms/{roomId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in resource.data.participants;
    }
    
    // Chat messages - users can access messages in rooms they're part of
    match /chat_messages/{messageId} {
      allow read, write: if request.auth != null && 
        request.auth.uid in get(/databases/$(database)/documents/chat_rooms/$(resource.data.roomId)).data.participants;
    }
  }
}
```

## 📱 Step 5: Update App Configuration

Your Firebase configuration has already been updated in the following files:
- `src/services/firebase.js`
- `app.config.js`
- `firebase-setup.js`

## 🚀 Step 6: Initialize Database with Sample Data

Run the setup script to add sample data to your database:

```bash
node firebase-setup.js
```

## 📋 Database Schema

### Collections Structure:

1. **users** - User profiles
   - `uid` (document ID)
   - `fullName`, `email`, `role`, `createdAt`, `updatedAt`

2. **events** - Church events
   - `title`, `description`, `date`, `time`, `location`, `type`
   - `attendees`, `maxAttendees`, `needsVolunteers`, `volunteerRoles`
   - `createdBy`, `createdAt`, `updatedAt`

3. **announcements** - Church announcements
   - `title`, `content`, `priority`, `sendNotification`
   - `createdBy`, `createdAt`, `updatedAt`

4. **sermons** - Sermon recordings
   - `title`, `speaker`, `date`, `type`, `mediaUrl`, `description`
   - `duration`, `tags`, `createdBy`, `createdAt`, `updatedAt`

5. **prayers** - Prayer requests
   - `text`, `userId`, `userName`, `isAnonymous`
   - `prayerCount`, `prayedBy`, `createdAt`, `updatedAt`

6. **donations** - Donation records
   - `userId`, `amount`, `type`, `description`
   - `status`, `createdAt`, `updatedAt`

7. **chat_rooms** - Chat rooms
   - `name`, `participants`, `lastMessage`, `createdAt`, `updatedAt`

8. **chat_messages** - Chat messages
   - `roomId`, `userId`, `userName`, `text`, `createdAt`

## 🔧 Step 7: Test Your Setup

1. Start your app: `npx expo start`
2. Try to register a new user
3. Check if the user appears in Firebase Console → Authentication
4. Check if the user profile appears in Firestore Database → users collection

## 🛡️ Security Best Practices

1. **Never expose API keys** in client-side code (they're safe in React Native apps)
2. **Use security rules** to control access to your data
3. **Validate data** on both client and server side
4. **Monitor usage** in Firebase Console
5. **Set up proper indexes** for complex queries

## 🆘 Troubleshooting

### Common Issues:

1. **"Firestore API not enabled"**
   - Go to [Firestore API](https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=connectfaith-1e009) and enable it

2. **"Permission denied"**
   - Check your security rules
   - Make sure you're authenticated

3. **"Collection not found"**
   - Collections are created automatically when you add the first document

4. **"Invalid date"**
   - Use `serverTimestamp()` for timestamps
   - Use `new Date()` for date fields

## 🎉 You're Ready!

Your Firebase backend is now set up and ready to power your ConnectFaith app! The app will use:
- **Authentication** for user login/registration
- **Firestore Database** for all data storage
- **Real-time listeners** for live updates

No Firebase Storage needed - all images will use local assets or external URLs.
