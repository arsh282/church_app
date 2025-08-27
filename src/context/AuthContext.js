import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthController } from '../controllers/AuthController';
import { auth, userService } from '../services/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminInitialized, setAdminInitialized] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0); // Force re-render

  useEffect(() => {
    // Check if auth is properly initialized
    if (!auth) {
      console.error('Firebase Auth is not initialized');
      setLoading(false);
      return;
    }

    // Initialize default admin account
    const initializeApp = async () => {
      try {
        console.log('🔄 Initializing app and creating default admin...');
        await AuthController.initializeDefaultAdmin();
        setAdminInitialized(true);
        console.log('✅ Default admin initialization completed');
      } catch (error) {
        console.error('❌ Error initializing default admin:', error);
        setAdminInitialized(true); // Continue anyway
      }
    };

    initializeApp();

    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      console.log('🔄 AuthContext: Auth state changed - Firebase user:', firebaseUser ? firebaseUser.uid : 'null');
      console.log('🔄 AuthContext: Previous user state:', user?.uid);
      
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Fetch user profile from Firestore
          const profile = await userService.getUserProfile(firebaseUser.uid);
          console.log('AuthContext: User profile loaded:', profile);
          setUserProfile(profile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile(null);
        }
      } else {
        console.log('🔄 AuthContext: User logged out, clearing profile');
        setUserProfile(null);
      }
      
      setLoading(false);
      // Force re-render
      setForceUpdate(prev => prev + 1);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      console.log('🔄 AuthContext: Starting logout process...');
      console.log('🔄 AuthContext: Current user before logout:', user?.uid);
      
      // Immediately clear the state first
      setUser(null);
      setUserProfile(null);
      setForceUpdate(prev => prev + 1);
      console.log('🔄 AuthContext: State cleared immediately');
      
      // Then sign out from Firebase
      await auth.signOut();
      console.log('🔄 AuthContext: Firebase signOut completed');
      
      console.log('✅ AuthContext: Logout process completed');
    } catch (error) {
      console.error('❌ AuthContext: Error logging out:', error);
      // Even if Firebase signOut fails, we've already cleared the state
      console.log('🔄 AuthContext: Firebase signOut failed, but state is cleared');
    }
  };

  const updateUserProfile = async (updates) => {
    if (!user) return;
    
    try {
      await userService.updateUserProfile(user.uid, updates);
      setUserProfile(prev => ({ ...prev, ...updates }));
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Role-based access control helpers
  const isAdmin = () => {
    return userProfile?.role === 'admin';
  };

  const isMember = () => {
    return userProfile?.role === 'member';
  };

  const hasRole = (role) => {
    return userProfile?.role === role;
  };

  const canAccessAdminFeatures = () => {
    return isAdmin();
  };

  const canCreateContent = () => {
    return isAdmin();
  };

  const canModerateContent = () => {
    return isAdmin();
  };

  const canViewReports = () => {
    return isAdmin();
  };

  const canManageUsers = () => {
    return isAdmin();
  };

  const value = {
    user,
    userProfile,
    loading,
    adminInitialized,
    forceUpdate,
    logout,
    updateUserProfile,
    // Role-based access control
    isAdmin,
    isMember,
    hasRole,
    canAccessAdminFeatures,
    canCreateContent,
    canModerateContent,
    canViewReports,
    canManageUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


