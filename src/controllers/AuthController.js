import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth, userService } from '../services/firebase';

// Admin configuration
const ADMIN_CONFIG = {
  DEFAULT_ADMIN_EMAIL: 'admin@admin.connectfaith.com',
  DEFAULT_ADMIN_PASSWORD: 'admin123456',
  ADMIN_EMAIL_PATTERN: /@admin\.connectfaith\.com$/
};

let defaultAdminCreated = false;

export const AuthController = {
  testFirebaseConnection: async () => {
    try {
      console.log('🔄 AuthController: Testing Firebase connection...');
      const currentUser = auth.currentUser;
      console.log('🔄 AuthController: Current user:', currentUser ? currentUser.uid : 'null');
      console.log('🔄 AuthController: Auth object:', auth ? 'Available' : 'Not available');
      return { success: true, message: 'Firebase connection test passed' };
    } catch (error) {
      console.error('❌ AuthController: Firebase connection test failed:', error);
      return { success: false, error: error.message };
    }
  },

  initializeDefaultAdmin: async () => {
    if (defaultAdminCreated) return;
    try {
      console.log('Checking for default admin account...');
      try {
        await signInWithEmailAndPassword(auth, ADMIN_CONFIG.DEFAULT_ADMIN_EMAIL, ADMIN_CONFIG.DEFAULT_ADMIN_PASSWORD);
        console.log('Default admin account already exists');
        defaultAdminCreated = true;
        await signOut(auth);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          console.log('Creating default admin account...');
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            ADMIN_CONFIG.DEFAULT_ADMIN_EMAIL,
            ADMIN_CONFIG.DEFAULT_ADMIN_PASSWORD
          );
          const user = userCredential.user;
          await updateProfile(user, { displayName: 'Default Admin' });
          const adminData = {
            uid: user.uid,
            email: ADMIN_CONFIG.DEFAULT_ADMIN_EMAIL,
            fullName: 'Default Admin',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
          };
          await userService.createUserProfile(user.uid, adminData);
          console.log('Default admin account created successfully');
          defaultAdminCreated = true;
          await signOut(auth);
        } else {
          console.error('Error checking default admin:', error);
        }
      }
    } catch (error) {
      console.error('Error initializing default admin:', error);
    }
  },

  login: async (email, password) => {
    try {
      const isAdminEmail = ADMIN_CONFIG.ADMIN_EMAIL_PATTERN.test(email);
      console.log('Attempting login for:', email, 'Is admin email:', isAdminEmail);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Firebase Auth successful, user:', user.uid);

      let profile;
      try {
        profile = await userService.getUserProfile(user.uid);
        console.log('User profile loaded from Firebase');
      } catch (firebaseError) {
        console.log('Error loading user profile:', firebaseError);
        const defaultRole = isAdminEmail ? 'admin' : 'member';
        profile = {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName || 'User',
          role: defaultRole
        };
        try {
          await userService.createUserProfile(user.uid, profile);
          console.log('Default profile created for:', defaultRole);
        } catch (saveError) {
          console.error('Error saving default profile:', saveError);
        }
      }

      if (isAdminEmail && profile.role !== 'admin') {
        profile.role = 'admin';
        await userService.updateUserProfile(user.uid, { role: 'admin' });
      } else if (!isAdminEmail && profile.role !== 'member') {
        profile.role = 'member';
        await userService.updateUserProfile(user.uid, { role: 'member' });
      }

      console.log('Login successful, role:', profile.role);

      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        },
        profile: profile,
        role: profile.role,
        isAdmin: profile.role === 'admin'
      };
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Login failed. Please try again.';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address. Please sign up first.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password. Please check your credentials.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = `Login failed: ${error.message}`;
      }
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  // Register new member (only for non-admin emails)
  register: async (email, password, fullName, location, zone) => {
    try {
      console.log('🔄 AuthController: Starting registration for:', email);
      const connectionTest = await AuthController.testFirebaseConnection();
      if (!connectionTest.success) {
        console.log('❌ AuthController: Firebase connection test failed');
        return {
          success: false,
          error: 'Unable to connect to authentication service. Please check your internet connection.'
        };
      }
      console.log('✅ AuthController: Firebase connection test passed');
      if (ADMIN_CONFIG.ADMIN_EMAIL_PATTERN.test(email)) {
        console.log('❌ AuthController: Admin email detected, blocking registration');
        return {
          success: false,
          error: 'Admin emails cannot be used for member registration. Please use the admin login.'
        };
      }
      console.log('🔄 AuthController: Creating Firebase Auth user...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('✅ AuthController: Firebase Auth user created:', user.uid);

      console.log('🔄 AuthController: Updating user profile...');
      await updateProfile(user, { displayName: fullName });
      console.log('✅ AuthController: User profile updated');

      const userData = {
        uid: user.uid,
        email: email,
        fullName: fullName,
        location: location, // <-- Added location
        zone: zone,         // <-- Added zone
        role: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      console.log('🔄 AuthController: Creating Firestore profile...');
      try {
        await userService.createUserProfile(user.uid, userData);
        console.log('✅ AuthController: Member profile created in Firebase');
      } catch (firebaseError) {
        console.error('❌ AuthController: Error creating member profile:', firebaseError);
      }

      console.log('🔄 AuthController: Signing out user after registration...');
      await signOut(auth);
      console.log('✅ AuthController: User signed out after registration');

      console.log('✅ AuthController: Registration completed successfully');
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: fullName
        },
        profile: userData
      };
    } catch (error) {
      console.error('❌ AuthController: Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters long.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = `Registration failed: ${error.message}`;
      }
      console.log('❌ AuthController: Registration failed with error:', errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: 'Logout failed. Please try again.'
      };
    }
  },

  updateProfile: async (updates) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No user is currently signed in');
      }
      if (updates.fullName) {
        await updateProfile(user, { displayName: updates.fullName });
      }
      await userService.updateUserProfile(user.uid, updates);
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: 'Profile update failed. Please try again.'
      };
    }
  },

  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        message: 'Password reset email sent. Please check your inbox.'
      };
    } catch (error) {
      console.error('Password reset error:', error);
      let errorMessage = 'Password reset failed. Please try again.';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many requests. Please try again later.';
          break;
      }
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  getCurrentUserRole: async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return null;
      }
      const profile = await userService.getUserProfile(user.uid);
      return profile?.role || 'member';
    } catch (error) {
      console.error('Error getting user role:', error);
      return 'member';
    }
  },

  hasRole: async (requiredRole) => {
    try {
      const currentRole = await AuthController.getCurrentUserRole();
      return currentRole === requiredRole;
    } catch (error) {
      console.error('Error checking user role:', error);
      return false;
    }
  },

  isAdmin: async () => {
    return await AuthController.hasRole('admin');
  },

  isMember: async () => {
    return await AuthController.hasRole('member');
  },

  getDefaultAdminCredentials: () => {
    return {
      email: ADMIN_CONFIG.DEFAULT_ADMIN_EMAIL,
      password: ADMIN_CONFIG.DEFAULT_ADMIN_PASSWORD
    };
  },

  getAdminConfig: () => {
    return {
      adminEmailPattern: '@admin.connectfaith.com',
      defaultAdminEmail: ADMIN_CONFIG.DEFAULT_ADMIN_EMAIL
    };
  },

  createDefaultAdmin: async () => {
    try {
      console.log('Manually creating default admin account...');
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        ADMIN_CONFIG.DEFAULT_ADMIN_EMAIL,
        ADMIN_CONFIG.DEFAULT_ADMIN_PASSWORD
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: 'Default Admin' });
      const adminData = {
        uid: user.uid,
        email: ADMIN_CONFIG.DEFAULT_ADMIN_EMAIL,
        fullName: 'Default Admin',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await userService.createUserProfile(user.uid, adminData);
      console.log('Default admin account created successfully');
      await signOut(auth);
      return { success: true, message: 'Default admin account created successfully' };
    } catch (error) {
      console.error('Error creating default admin:', error);
      return { success: false, error: error.message };
    }
  }
};