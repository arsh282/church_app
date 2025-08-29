# Navigation Debug Guide

## 🔍 **Current Issues:**

1. **Signup not redirecting to home screen**
2. **Event screen not redirecting to event page**

## 🛠 **Debugging Steps:**

### **1. Check Registration Flow:**

#### **Frontend (SignUpScreen):**
- ✅ Password validation implemented
- ✅ Email validation implemented
- ✅ Form validation working
- ✅ Registration API call made

#### **Backend (auth.js):**
- ✅ Password hashing with bcrypt
- ✅ Email validation
- ✅ User creation in Firebase
- ✅ JWT token generation
- ✅ Response structure: `{ token, user }`

#### **Authentication Context:**
- ✅ Automatic login after registration
- ✅ User state management
- ✅ Token storage
- ✅ Profile setup

### **2. Check Navigation Structure:**

#### **AppNavigator:**
```javascript
// Auth Stack (when !user)
<Stack.Screen name="Login" component={LoginScreen} />
<Stack.Screen name="SignUp" component={SignUpScreen} />
<Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

// Main App Stack (when user exists)
{isAdmin() ? (
  <Stack.Screen name="AdminFlow" component={AdminNavigator} />
) : (
  <Stack.Screen name="MemberFlow" component={UserTabs} />
)}
```

#### **UserTabs Navigation:**
```javascript
// Tab Navigation
<Tab.Screen name="Home" component={HomeStack} />
<Tab.Screen name="Events" component={EventsCalendarScreen} />
<Tab.Screen name="Pray" component={PrayerWallScreen} />
<Tab.Screen name="Sermons" component={SermonArchiveScreen} />
<Tab.Screen name="Chat" component={ChatScreen} />
<Tab.Screen name="Profile" component={ProfileSettingsScreen} />

// HomeStack (accessible from Home tab)
<Stack.Screen name="HomeMain" component={HomeScreen} />
<Stack.Screen name="Events" component={EventsCalendarScreen} />
<Stack.Screen name="Announcements" component={AnnouncementsScreen} />
// ... other screens
```

### **3. Event Navigation Issue:**

#### **Problem:**
- HomeScreen tries to navigate to `EventsCalendar`
- But should navigate to `Events` (in HomeStack)

#### **Solution:**
- ✅ Fixed: Changed `screen: 'EventsCalendar'` to `screen: 'Events'` in HomeScreen

### **4. Registration Redirect Issue:**

#### **Problem:**
- Registration successful but no automatic redirect
- User stays on signup screen

#### **Root Cause:**
- Mock API not returning proper structure
- Authentication context not setting user state

#### **Solution:**
- ✅ Fixed: Mock API now returns `{ user, token }` structure
- ✅ Fixed: Authentication context automatically logs user in after registration

## 🔧 **Testing Steps:**

### **1. Test Registration:**
```javascript
// 1. Fill out signup form
// 2. Submit registration
// 3. Check console logs:
//    - "✅ SignUpScreen: Registration successful"
//    - "✅ CustomAuthContext: User automatically logged in"
//    - "🔄 AppNavigator: User authenticated: true"

// 4. Should automatically redirect to home screen
```

### **2. Test Event Navigation:**
```javascript
// 1. Go to home screen
// 2. Click on "Events" feature card
// 3. Should navigate to EventsCalendarScreen
```

### **3. Check Console Logs:**
```javascript
// Look for these logs:
console.log('🔄 AppNavigator: Current state - user:', user?.uid);
console.log('🔄 AppNavigator: User authenticated:', !!user);
console.log('✅ CustomAuthContext: User automatically logged in');
```

## 🐛 **Common Issues:**

### **1. Mock API Issues:**
- **Problem:** Mock API not returning proper structure
- **Solution:** Ensure response has `{ user, token }` format

### **2. State Management Issues:**
- **Problem:** User state not being set after registration
- **Solution:** Check AsyncStorage and state setters

### **3. Navigation Structure Issues:**
- **Problem:** Screen names don't match between navigation and components
- **Solution:** Ensure consistent screen names

### **4. Role Detection Issues:**
- **Problem:** isAdmin() function not working correctly
- **Solution:** Check userProfile.role value

## 📱 **Debug Commands:**

### **Check Current State:**
```javascript
// In browser console or React Native debugger
console.log('User:', user);
console.log('UserProfile:', userProfile);
console.log('Token:', token);
console.log('Is Admin:', isAdmin());
console.log('Is Member:', isMember());
```

### **Test Navigation:**
```javascript
// Test direct navigation
navigation.navigate('Events');
navigation.navigate('HomeMain');
```

### **Check AsyncStorage:**
```javascript
// Check stored data
AsyncStorage.getItem('authToken').then(token => console.log('Token:', token));
AsyncStorage.getItem('authUser').then(user => console.log('User:', user));
```

## 🎯 **Expected Behavior:**

### **After Registration:**
1. ✅ Form validation passes
2. ✅ API call successful
3. ✅ User state set
4. ✅ Token stored
5. ✅ Automatic redirect to home screen
6. ✅ Role-based navigation (Member/Admin)

### **Event Navigation:**
1. ✅ Click "Events" on home screen
2. ✅ Navigate to EventsCalendarScreen
3. ✅ Display events list

## 🔄 **Next Steps:**

1. **Test registration flow** with mock API
2. **Test event navigation** from home screen
3. **Check console logs** for any errors
4. **Verify user state** after registration
5. **Test with real API** when backend is ready
