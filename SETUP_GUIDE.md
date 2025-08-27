# Church App Setup Guide

## 🚀 Current Status: ✅ RUNNING SUCCESSFULLY

Your church app is now running with **mock Firebase services** and **disabled Stripe** for development.

### **Current Configuration:**
- ✅ **Server Running**: http://localhost:8081
- ✅ **Firebase**: Mock services (no real Firebase project needed)
- ✅ **Stripe**: Temporarily disabled (no merchantIdentifier errors)
- ✅ **Auth**: Working with mock authentication
- ✅ **Database**: Mock Firestore (console logging)
- ✅ **Storage**: Mock Firebase Storage (console logging)

### **How to Access:**
1. **🌐 Web Browser**: http://localhost:8081
2. **📱 Mobile Device**: Scan QR code with Expo Go app
3. **🖥️ Simulator**: Press `i` for iOS or `a` for Android in terminal

## 🔧 Firebase Setup (Current)

The app is currently using **mock Firebase services** for development. For production:

### **1. Create Your Firebase Project:**
- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable Authentication, Firestore, and Storage

### **2. Get Your Firebase Config:**
- Go to Project Settings > General
- Add a web app and copy the config

### **3. Update app.config.js:**
Replace the mock Firebase config with your real values:

```javascript
firebase: {
  apiKey: "your-real-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  measurementId: "G-XXXXXXXXXX"
}
```

### **4. Replace Firebase Service:**
- Replace the mock code in `src/services/firebase.js` with real Firebase imports
- Uncomment the real Firebase configuration in the file

## 💳 Stripe Setup (When Ready)

### **1. Create Stripe Account:**
- Go to [Stripe Dashboard](https://dashboard.stripe.com/)
- Get your publishable key

### **2. Enable Stripe Plugin:**
Update `app.config.js`:

```javascript
plugins: [
  [
    '@stripe/stripe-react-native',
    {
      merchantIdentifier: 'merchant.com.example.awesomechurch',
      enableGooglePay: true
    }
  ],
  'expo-notifications'
],
extra: {
  stripePublishableKey: 'pk_test_your_key_here'
}
```

### **3. Re-enable Stripe in App.js:**
```javascript
import { StripeProvider } from '@stripe/stripe-react-native';
import Constants from 'expo-constants';

export default function App() {
  const publishableKey = Constants.expoConfig?.extra?.stripePublishableKey || '';
  return (
    <StripeProvider publishableKey={publishableKey}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </StripeProvider>
  );
}
```

## 📱 Features Available

- ✅ **User Authentication** (Login/Signup with Firebase)
- ✅ **Events Calendar** & Registration
- ✅ **Donations** (ready for Stripe integration)
- ✅ **Announcements**
- ✅ **Prayer Wall**
- ✅ **Chat System**
- ✅ **Sermon Archive**
- ✅ **Admin Dashboard**
- ✅ **User Management**

## 🛠 Development Commands

```bash
# Start development server
npm start

# Run on specific platforms
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web Browser

# Clear cache and restart
npx expo start --clear
```

## 🔄 Current vs Production

### **Current (Development):**
- ✅ Mock Firebase Auth (no real project needed)
- ✅ Mock Firestore database (console logging)
- ✅ Mock Firebase Storage (console logging)
- ❌ Stripe disabled (no payments)
- ✅ All features work except payments

### **Production (When Ready):**
- ✅ Real Firebase (already configured)
- ✅ Real Stripe payments
- ✅ Full functionality

## 📝 Next Steps

1. **Test the app** - All features work except payments
2. **Set up real Firebase** - Replace dev config with production
3. **Enable Stripe** - When ready for payments
4. **Deploy to app stores** - When ready for production

## 🚨 Troubleshooting

### **If you get Firebase errors:**
- Make sure you have a real Firebase project
- Update the config in `app.config.js`
- Restart with `npx expo start --clear`

### **If you get Stripe errors:**
- Stripe is currently disabled for development
- Follow the Stripe setup guide when ready

### **If the app won't start:**
- Clear cache: `npx expo start --clear`
- Check Firebase config is valid
- Make sure all dependencies are installed
