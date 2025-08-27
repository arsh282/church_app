# Role-Based Access Control Guide for ConnectFaith

This guide explains how the role-based access control system works in the ConnectFaith app.

## 🔐 **User Roles**

### **Member (Default Role)**
- **Role ID**: `user` or `member`
- **Description**: Regular church members
- **Permissions**:
  - View events, announcements, sermons
  - Submit prayer requests
  - Participate in community chat
  - View their own profile
  - Make donations

### **Admin**
- **Role ID**: `admin`
- **Description**: Church administrators and leaders
- **Permissions**:
  - All member permissions
  - Create, edit, delete events
  - Create, edit, delete announcements
  - Upload, edit, delete sermons
  - Manage user accounts
  - View reports and analytics
  - Moderate content (prayers, chat)
  - Access admin dashboard

## 🚀 **How to Set Up Admin Users**

### **Method 1: Using the Admin Setup Script**

1. **Register a normal user account** in the app
2. **Find the user's UID**:
   - Go to Firebase Console → Authentication → Users
   - Copy the UID of the user you want to make admin
3. **Run the admin setup script**:
   ```bash
   node setup-admin.js
   ```
4. **Promote the user to admin**:
   ```javascript
   const { adminSetup } = require('./setup-admin');
   await adminSetup.promoteToAdmin('USER_UID_HERE');
   ```

### **Method 2: Manual Firebase Console**

1. **Register a normal user account** in the app
2. **Go to Firebase Console** → Firestore Database → users collection
3. **Find the user document** by their UID
4. **Edit the document** and change `role` from `"user"` to `"admin"`
5. **Save the changes**

### **Method 3: Direct Database Update**

```javascript
// In Firebase Console → Firestore Database
// Navigate to: users/{USER_UID}
// Update the document:
{
  "role": "admin",
  "updatedAt": "2024-03-17T10:00:00.000Z"
}
```

## 🎯 **Role-Based Features**

### **Member Features**
- **Home Dashboard**: View member-specific features
- **Prayer Wall**: Submit and pray for requests
- **Community Chat**: Participate in discussions
- **Events**: View upcoming events
- **Sermons**: Watch/listen to sermons
- **Profile**: Manage personal information

### **Admin Features**
- **Admin Dashboard**: Access to all admin tools
- **Content Management**:
  - Create/Edit Events
  - Create/Edit Announcements
  - Upload/Edit Sermons
- **User Management**:
  - View all users
  - Change user roles
  - Ban/unban users
- **Reports & Analytics**:
  - Donation reports
  - User activity reports
  - Content analytics
- **Moderation**:
  - Moderate prayer requests
  - Moderate chat messages
  - Content approval

## 🔧 **Technical Implementation**

### **Authentication Context**
The `AuthContext` provides role-based helpers:

```javascript
const { 
  isAdmin, 
  isMember, 
  hasRole, 
  canAccessAdminFeatures,
  canCreateContent,
  canModerateContent,
  canViewReports,
  canManageUsers 
} = useAuth();
```

### **Role-Based Access Component**
Use the `RoleBasedAccess` component to conditionally render content:

```javascript
import { RoleBasedAccess } from '../components/RoleBasedAccess';

<RoleBasedAccess allowedRoles={['admin']}>
  <AdminOnlyContent />
</RoleBasedAccess>
```

### **Permission Hooks**
Use the `useRolePermissions` hook for specific permissions:

```javascript
import { useRolePermissions } from '../components/RoleBasedAccess';

const permissions = useRolePermissions();

if (permissions.canCreateEvents) {
  // Show create event button
}
```

## 🛡️ **Security Rules**

### **Firestore Security Rules**
The database has role-based security rules:

```javascript
// Users can read/write their own profile
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}

// Admin can manage all content
match /events/{eventId} {
  allow read: if true;
  allow write: if request.auth != null && 
    get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

### **Client-Side Validation**
Always validate permissions on the client side:

```javascript
// ✅ Good: Check permission before action
if (permissions.canCreateEvents) {
  navigation.navigate('CreateEvent');
} else {
  Alert.alert('Access Denied', 'You need admin permissions');
}

// ❌ Bad: Don't rely only on UI hiding
navigation.navigate('CreateEvent'); // Could fail on server
```

## 📱 **UI Components**

### **Role Indicators**
- **Admin Badge**: Shows "ADMIN" badge for admin users
- **Role Indicator**: Shows user's role (USER/ADMIN)

### **Conditional Navigation**
- **Member Flow**: UserTabs navigation
- **Admin Flow**: AdminNavigator with admin-specific screens

### **Feature Cards**
- **Member Features**: Blue color scheme (#6699CC)
- **Admin Features**: Yellow color scheme (#FFCC00)

## 🔄 **Role Changes**

### **Promoting to Admin**
1. User registers normally (gets `user` role)
2. Admin or script promotes user to `admin` role
3. User logs out and back in
4. App automatically switches to admin flow

### **Demoting from Admin**
1. Change role from `admin` to `user` in Firebase
2. User logs out and back in
3. App automatically switches to member flow

## 🧪 **Testing Roles**

### **Test Member Account**
1. Register a new account
2. Verify member features are available
3. Verify admin features are hidden

### **Test Admin Account**
1. Promote a user to admin
2. Log out and back in
3. Verify admin features are available
4. Verify admin dashboard is accessible

### **Test Role Switching**
1. Change role in Firebase Console
2. Log out and back in
3. Verify UI updates correctly

## 🚨 **Security Best Practices**

### **Server-Side Validation**
- Always validate permissions on the server
- Don't trust client-side role checks alone
- Use Firebase Security Rules

### **Client-Side UX**
- Hide unauthorized features
- Show appropriate error messages
- Provide clear feedback

### **Role Management**
- Limit admin role to trusted users
- Regularly audit admin permissions
- Use least privilege principle

## 📋 **Troubleshooting**

### **Common Issues**

1. **User not seeing admin features**
   - Check if role is set to `admin` in Firestore
   - Verify user logged out and back in
   - Check Firebase Security Rules

2. **Permission denied errors**
   - Verify user is authenticated
   - Check user role in Firestore
   - Review Security Rules

3. **Role not updating**
   - Clear app cache
   - Force logout and login
   - Check Firestore document

### **Debug Commands**

```javascript
// Check current user role
const { userProfile } = useAuth();
console.log('User role:', userProfile?.role);

// Check permissions
const permissions = useRolePermissions();
console.log('Is admin:', permissions.isAdmin());
console.log('Can create events:', permissions.canCreateEvents);
```

## 🎉 **Summary**

The role-based access control system provides:

- ✅ **Secure role management** with Firebase
- ✅ **Conditional UI rendering** based on roles
- ✅ **Permission-based features** for different user types
- ✅ **Easy admin setup** with provided scripts
- ✅ **Comprehensive security rules** for data protection
- ✅ **Clear user experience** with role indicators

**Your ConnectFaith app now has a complete role-based access control system!** 🔐
