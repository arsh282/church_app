import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { mockApiService } from '../services/mockApi';

// Use mock API for development (set to false when your real API is ready)
const USE_MOCK_API = true;

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const CustomAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Load stored authentication data on app start
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      console.log('🔄 CustomAuthContext: Loading stored authentication...');
      
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUser = await AsyncStorage.getItem('authUser');
      const storedProfile = await AsyncStorage.getItem('authProfile');

      if (storedToken && storedUser) {
        const userData = JSON.parse(storedUser);
        const profileData = storedProfile ? JSON.parse(storedProfile) : null;
        
        console.log('✅ CustomAuthContext: Found stored auth data');
        setToken(storedToken);
        setUser(userData);
        setUserProfile(profileData);
      } else {
        console.log('ℹ️ CustomAuthContext: No stored auth data found');
      }
    } catch (error) {
      console.error('❌ CustomAuthContext: Error loading stored auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('🔄 CustomAuthContext: Attempting login...');
      
      const result = USE_MOCK_API 
        ? await mockApiService.loginUser(email, password)
        : await apiService.loginUser(email, password);

      console.log('🔍 CustomAuthContext: Login result structure:', JSON.stringify(result, null, 2));

      if (result.success) {
        const { user: userData, token: authToken } = result.data;
        
        // Validate that we have the required data
        if (!authToken || !userData) {
          console.error('❌ CustomAuthContext: Missing auth data from API response');
          return { success: false, error: 'Invalid response from server' };
        }
        
        // Store authentication data
        await AsyncStorage.setItem('authToken', authToken);
        await AsyncStorage.setItem('authUser', JSON.stringify(userData));
        
        // Set state
        setToken(authToken);
        setUser(userData);
        setUserProfile({ ...userData, role: userData.role || 'Member' });
        
        console.log('✅ CustomAuthContext: Login successful');
        return { success: true };
      } else {
        console.log('❌ CustomAuthContext: Login failed:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('❌ CustomAuthContext: Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      console.log('🔄 CustomAuthContext: Attempting registration...');
      
      const result = USE_MOCK_API 
        ? await mockApiService.registerUser(userData)
        : await apiService.registerUser(userData);

      if (result.success) {
        console.log('✅ CustomAuthContext: Registration successful');
        return { success: true, data: result.data };
      } else {
        console.log('❌ CustomAuthContext: Registration failed:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('❌ CustomAuthContext: Registration error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      console.log('🔄 CustomAuthContext: Logging out...');
      
      // Clear stored data
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('authUser');
      await AsyncStorage.removeItem('authProfile');
      
      // Clear state
      setToken(null);
      setUser(null);
      setUserProfile(null);
      
      console.log('✅ CustomAuthContext: Logout successful');
    } catch (error) {
      console.error('❌ CustomAuthContext: Logout error:', error);
    }
  };

  const updateUserProfile = async (updates) => {
    if (!user || !token) return;
    
    try {
      console.log('🔄 CustomAuthContext: Updating user profile...');
      
      const result = USE_MOCK_API 
        ? await mockApiService.updateUserProfile(user.id, updates, token)
        : await apiService.updateUserProfile(user.id, updates, token);

      if (result.success) {
        const updatedProfile = { ...userProfile, ...updates };
        setUserProfile(updatedProfile);
        
        // Update stored profile
        await AsyncStorage.setItem('authProfile', JSON.stringify(updatedProfile));
        
        console.log('✅ CustomAuthContext: Profile updated successfully');
        return { success: true };
      } else {
        console.log('❌ CustomAuthContext: Profile update failed:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('❌ CustomAuthContext: Profile update error:', error);
      return { success: false, error: error.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      console.log('🔄 CustomAuthContext: Sending password reset...');
      
      const result = USE_MOCK_API 
        ? await mockApiService.forgotPassword(email)
        : await apiService.forgotPassword(email);

      if (result.success) {
        console.log('✅ CustomAuthContext: Password reset email sent');
        return { success: true, message: result.data.message };
      } else {
        console.log('❌ CustomAuthContext: Password reset failed:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('❌ CustomAuthContext: Password reset error:', error);
      return { success: false, error: error.message };
    }
  };

  // Role-based access control helpers
  const isAdmin = () => {
    return userProfile?.role === 'admin' || userProfile?.role === 'Admin';
  };

  const isMember = () => {
    return userProfile?.role === 'member' || userProfile?.role === 'Member';
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
    token,
    login,
    register,
    logout,
    updateUserProfile,
    forgotPassword,
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
