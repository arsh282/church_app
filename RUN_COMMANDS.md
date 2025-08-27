# Church App - Run Commands

## 🚀 Quick Start

Your church app is now **running successfully**! Here are the commands to use:

### **Start the App:**
```bash
npm start
# or
npx expo start
```

### **Clear Cache and Restart:**
```bash
npx expo start --clear
```

### **Run on Specific Platforms:**
```bash
# Web Browser
npm run web
# or
npx expo start --web

# iOS Simulator
npm run ios
# or
npx expo start --ios

# Android Emulator
npm run android
# or
npx expo start --android
```

## 📱 How to Access Your App

### **1. Web Browser (Easiest):**
- Open: **http://localhost:8081**
- The app will load in your browser

### **2. Mobile Device:**
- Install **Expo Go** app on your phone
- Scan the QR code that appears in your terminal
- The app will load on your device

### **3. Simulator/Emulator:**
- Press `i` in terminal for iOS Simulator
- Press `a` in terminal for Android Emulator
- Press `w` in terminal for Web Browser

## 🔧 Current Status

- ✅ **Server Running**: http://localhost:8081
- ✅ **Firebase**: Mock services (no real project needed)
- ✅ **Auth**: Mock authentication working
- ✅ **All Features**: Working except payments
- ✅ **iOS Simulator**: Fixed and working
- ❌ **Stripe**: Disabled for development

## 🛠 Troubleshooting

### **If the app won't start:**
```bash
# Kill any running processes
pkill -f "expo start"

# Clear cache and restart
npx expo start --clear
```

### **If you get "main has not been registered" error:**
- ✅ **Fixed**: Added proper `index.js` entry point
- ✅ **Fixed**: Updated `package.json` main field
- The app should now work on all platforms

### **If you get errors:**
```bash
# Install dependencies
npm install

# Clear cache
rm -rf node_modules/.cache

# Restart
npx expo start --clear
```

## 📋 Available Features

- ✅ User Authentication (Login/Signup)
- ✅ Events Calendar & Registration
- ✅ Announcements
- ✅ Prayer Wall
- ✅ Chat System
- ✅ Sermon Archive
- ✅ Admin Dashboard
- ✅ User Management
- ⏳ Donations (mock mode)

## 🎯 Next Steps

1. **Test the app** - All features work except payments
2. **Set up real Firebase** - Replace dev config when ready
3. **Enable Stripe** - When ready for payments
4. **Deploy to app stores** - When ready for production

---

**Your church app is ready to use! 🎉**
