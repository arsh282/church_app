// Mock API Service for Development
// This simulates your backend API responses for testing

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data
const mockRoles = [
  { id: '1', name: 'Member' },
  { id: '2', name: 'Admin' },
  { id: '3', name: 'Moderator' }
];

const mockUsers = [];

export const mockApiService = {
  // Simulate API delay
  simulateApiCall: async (data, shouldFail = false) => {
    await delay(1000); // Simulate network delay
    
    if (shouldFail) {
      throw new Error('Simulated API failure');
    }
    
    return data;
  },

  // Mock user registration
  registerUser: async (userData) => {
    try {
      console.log('🎭 Mock API: Registering user:', userData);
      
      // Simulate validation
      if (!userData.email || !userData.password) {
        throw new Error('Email and password are required');
      }

      // Check if user already exists
      const existingUser = mockUsers.find(user => user.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create mock user
      const newUser = {
        id: `user_${Date.now()}`,
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      mockUsers.push(newUser);
      
      const response = await mockApiService.simulateApiCall({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: 'Member',
        createdAt: newUser.createdAt
      });

      return { success: true, data: response };
    } catch (error) {
      console.log('🎭 Mock API: Registration failed:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Mock user login
  loginUser: async (email, password) => {
    try {
      console.log('🎭 Mock API: Logging in user:', email);
      
      // Simulate validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Find user
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        throw new Error('User not found');
      }

      // Simulate password check (in real app, this would be hashed)
      if (user.password !== password) {
        throw new Error('Invalid password');
      }

      const response = await mockApiService.simulateApiCall({
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: 'Member'
        },
        token: `mock_token_${Date.now()}`
      });

      return { success: true, data: response };
    } catch (error) {
      console.log('🎭 Mock API: Login failed:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Mock get roles
  getRoles: async () => {
    try {
      console.log('🎭 Mock API: Getting roles');
      
      const response = await mockApiService.simulateApiCall(mockRoles);
      return { success: true, data: response };
    } catch (error) {
      console.log('🎭 Mock API: Get roles failed:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Mock get user profile
  getUserProfile: async (userId, token) => {
    try {
      console.log('🎭 Mock API: Getting user profile:', userId);
      
      const user = mockUsers.find(u => u.id === userId);
      if (!user) {
        throw new Error('User not found');
      }

      const response = await mockApiService.simulateApiCall({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        DOB: user.DOB,
        street1: user.street1,
        street2: user.street2,
        city: user.city,
        region: user.region,
        postalCode: user.postalCode,
        country: user.country,
        role: 'Member',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      });

      return { success: true, data: response };
    } catch (error) {
      console.log('🎭 Mock API: Get profile failed:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Mock update user profile
  updateUserProfile: async (userId, updates, token) => {
    try {
      console.log('🎭 Mock API: Updating user profile:', userId, updates);
      
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      // Update user
      mockUsers[userIndex] = {
        ...mockUsers[userIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      const response = await mockApiService.simulateApiCall(mockUsers[userIndex]);

      return { success: true, data: response };
    } catch (error) {
      console.log('🎭 Mock API: Update profile failed:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Mock forgot password
  forgotPassword: async (email) => {
    try {
      console.log('🎭 Mock API: Forgot password for:', email);
      
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        throw new Error('User not found');
      }

      const response = await mockApiService.simulateApiCall({
        message: 'Password reset email sent successfully'
      });

      return { success: true, data: response };
    } catch (error) {
      console.log('🎭 Mock API: Forgot password failed:', error.message);
      return { success: false, error: error.message };
    }
  },

  // Mock reset password
  resetPassword: async (token, newPassword) => {
    try {
      console.log('🎭 Mock API: Resetting password');
      
      const response = await mockApiService.simulateApiCall({
        message: 'Password reset successfully'
      });

      return { success: true, data: response };
    } catch (error) {
      console.log('🎭 Mock API: Reset password failed:', error.message);
      return { success: false, error: error.message };
    }
  }
};
