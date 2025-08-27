# Simplified Login System Guide

## 🎯 **Simplified Role System**

Your church app now has **only two roles**:
- **👤 Member** - Regular church members
- **👨‍💼 Admin** - Church administrators

## 🔐 **Single Login System**

### **How It Works**
- **One login function** that automatically detects admin vs member
- **Email-based role detection** - Admin emails end with `@admin.connectfaith.com`
- **Default admin account** created automatically on first app launch
- **Members must sign up first** - No existing member accounts in Firebase

## 🚀 **Default Admin Account**

### **Automatic Creation**
The app automatically creates a default admin account on first launch:

**Default Admin Credentials:**
- **Email**: `admin@admin.connectfaith.com`
- **Password**: `admin123456`

### **How to Use Default Admin**
```javascript
import { AuthController } from './src/controllers/AuthController';

// Login with default admin
const result = await AuthController.login('admin@admin.connectfaith.com', 'admin123456');

if (result.success) {
  console.log('Admin logged in:', result.user);
  console.log('Role:', result.role); // Will be 'admin'
  console.log('Is Admin:', result.isAdmin); // Will be true
}
```

## 👥 **Member Registration & Login**

### **Member Registration (Required First)**
Since there are no existing member accounts in Firebase, members must register first:

```javascript
// Register a new member
const result = await AuthController.register('john@example.com', 'password123', 'John Smith');

if (result.success) {
  console.log('Member registered:', result.user);
  console.log('Role:', result.role); // Will be 'member'
}
```

### **Member Login**
```javascript
// Login as member (after registration)
const result = await AuthController.login('john@example.com', 'password123');

if (result.success) {
  console.log('Member logged in:', result.user);
  console.log('Role:', result.role); // Will be 'member'
  console.log('Is Admin:', result.isAdmin); // Will be false
}
```

## 🔧 **Configuration**

### **Change Default Admin Password**
Edit `src/controllers/AuthController.js`:
```javascript
const ADMIN_CONFIG = {
  DEFAULT_ADMIN_EMAIL: 'admin@admin.connectfaith.com',
  DEFAULT_ADMIN_PASSWORD: 'your-new-secure-password', // Change this
  ADMIN_EMAIL_PATTERN: /@admin\.connectfaith\.com$/
};
```

### **Change Admin Email Pattern**
Edit `src/controllers/AuthController.js`:
```javascript
const ADMIN_CONFIG = {
  DEFAULT_ADMIN_EMAIL: 'admin@admin.connectfaith.com',
  DEFAULT_ADMIN_PASSWORD: 'admin123456',
  ADMIN_EMAIL_PATTERN: /@yourchurch\.com$/ // Change this pattern
};
```

## 📱 **UI Integration**

### **Single Login Screen**
Create one login screen that handles both admin and member login:

```javascript
import { AuthController } from './src/controllers/AuthController';

const handleLogin = async (email, password) => {
  const result = await AuthController.login(email, password);
  
  if (result.success) {
    if (result.isAdmin) {
      // Navigate to admin dashboard
      navigation.navigate('AdminDashboard');
    } else {
      // Navigate to member dashboard
      navigation.navigate('MemberDashboard');
    }
  } else {
    // Show error message
    alert(result.error);
  }
};
```

### **Role-Based Navigation**
```javascript
import { useAuth } from './src/context/AuthContext';

function AppNavigator() {
  const { isAdmin, isMember, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (isAdmin()) {
    return <AdminNavigator />;
  } else if (isMember()) {
    return <MemberNavigator />;
  } else {
    return <AuthNavigator />;
  }
}
```

### **Show Default Admin Info**
```javascript
// Display default admin credentials for easy access
const defaultAdmin = AuthController.getDefaultAdminCredentials();
console.log('Default Admin Email:', defaultAdmin.email);
console.log('Default Admin Password:', defaultAdmin.password);
```

## 🛡️ **Security Features**

### **Automatic Role Detection**
- ✅ **Admin emails** - Automatically detected and assigned 'admin' role
- ✅ **Member emails** - Automatically assigned 'member' role
- ✅ **Role validation** - Prevents role manipulation

### **Email Pattern Protection**
- ✅ **Admin emails** - Blocked from regular registration
- ✅ **Member emails** - Can only register as members
- ✅ **Pattern validation** - Enforces email format

### **Default Admin Security**
- ✅ **Automatic creation** - No manual setup required
- ✅ **Configurable password** - Easy to change in production
- ✅ **Firebase Auth** - Secure password storage

## 🎯 **Quick Start**

### **1. First App Launch**
The default admin account is automatically created:
- **Email**: `admin@admin.connectfaith.com`
- **Password**: `admin123456`

### **2. Login as Admin**
```javascript
await AuthController.login('admin@admin.connectfaith.com', 'admin123456');
```

### **3. Register Members**
```javascript
// Members must register first (no existing accounts)
await AuthController.register('member@example.com', 'password123', 'John Member');
```

### **4. Login as Member**
```javascript
await AuthController.login('member@example.com', 'password123');
```

## 🔄 **Migration Notes**

- ✅ **No existing accounts** - Fresh start with Firebase
- ✅ **Default admin** - Automatically created
- ✅ **Member registration** - Required for all new members
- ✅ **Backward compatible** - Works with existing role system

## 📋 **API Reference**

### **Login Function**
```javascript
AuthController.login(email, password)
// Returns: { success, user, profile, role, isAdmin, error }
```

### **Register Function**
```javascript
AuthController.register(email, password, fullName)
// Returns: { success, user, profile, error }
```

### **Get Default Admin Credentials**
```javascript
AuthController.getDefaultAdminCredentials()
// Returns: { email, password }
```

---

**Your simplified login system is now ready! 🎉**

**Default Admin Login:**
- **Email**: `admin@admin.connectfaith.com`
- **Password**: `admin123456`
