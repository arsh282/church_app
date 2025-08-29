import { API_CONFIG, getApiUrl } from '../config/apiConfig';
import { networkUtils } from './networkUtils';

export const apiService = {
  // Base API request function with error handling and retry logic
  makeRequest: async (endpoint, options = {}) => {
    try {
      // Check network connectivity first
      const isConnected = await networkUtils.isConnected();
      if (!isConnected) {
        throw new Error('No internet connection available');
      }

      const url = getApiUrl(endpoint);
      console.log('🌐 API Request:', {
        url,
        method: options.method || 'GET',
        endpoint
      });

      const defaultOptions = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      };

      const response = await networkUtils.retryWithBackoff(async () => {
        return await fetch(url, { ...defaultOptions, ...options });
      });

      console.log('📡 API Response Status:', response.status, response.statusText);

      // Log response headers for debugging
      console.log('📋 Response Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        // Try to get error details
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorText = await response.text();
          console.log('❌ Error Response Body:', errorText);
          
          // Try to parse as JSON
          try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.message || errorData.error || errorMessage;
          } catch (parseError) {
            // If it's not JSON, it might be HTML
            if (errorText.includes('<html') || errorText.includes('<!DOCTYPE')) {
              errorMessage = `Server returned HTML instead of JSON. Check if the API endpoint is correct. (${response.status})`;
            } else {
              errorMessage = errorText || errorMessage;
            }
          }
        } catch (textError) {
          console.log('❌ Could not read error response:', textError);
        }
        
        throw new Error(errorMessage);
      }

      // Try to parse response as JSON
      const responseText = await response.text();
      console.log('📄 Response Body:', responseText);

      try {
        const data = JSON.parse(responseText);
        console.log('✅ Parsed JSON Response:', data);
        return data;
      } catch (parseError) {
        console.error('❌ JSON Parse Error:', parseError);
        console.error('❌ Response Text:', responseText);
        
        if (responseText.includes('<html') || responseText.includes('<!DOCTYPE')) {
          throw new Error('Server returned HTML instead of JSON. Please check the API endpoint URL.');
        } else {
          throw new Error(`Invalid JSON response: ${parseError.message}`);
        }
      }
    } catch (error) {
      console.error('❌ API request failed:', error);
      throw error;
    }
  },

  // User registration
  registerUser: async (userData) => {
    try {
      const response = await apiService.makeRequest(API_CONFIG.ENDPOINTS.REGISTER, {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // User login
  loginUser: async (email, password) => {
    try {
      const response = await apiService.makeRequest(API_CONFIG.ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get user profile
  getUserProfile: async (userId, token) => {
    try {
      const response = await apiService.makeRequest(API_CONFIG.ENDPOINTS.PROFILE, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update user profile
  updateUserProfile: async (userId, updates, token) => {
    try {
      const response = await apiService.makeRequest(API_CONFIG.ENDPOINTS.UPDATE_PROFILE, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get roles (for dropdown)
  getRoles: async () => {
    try {
      const response = await apiService.makeRequest(API_CONFIG.ENDPOINTS.ROLES, {
        method: 'GET',
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await apiService.makeRequest('/users/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await apiService.makeRequest('/users/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, newPassword }),
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create event
  createEvent: async (eventData, token) => {
    try {
      const response = await apiService.makeRequest(API_CONFIG.ENDPOINTS.CREATE_EVENT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update event
  updateEvent: async (eventId, eventData, token) => {
    try {
      const response = await apiService.makeRequest(API_CONFIG.ENDPOINTS.UPDATE_EVENT, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      }, { id: eventId });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete event
  deleteEvent: async (eventId, token) => {
    try {
      const response = await apiService.makeRequest(API_CONFIG.ENDPOINTS.DELETE_EVENT, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }, { id: eventId });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get event categories
  getEventCategories: async (token) => {
    try {
      const response = await apiService.makeRequest(API_CONFIG.ENDPOINTS.EVENT_CATEGORIES, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get events
  getEvents: async (token, filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const endpoint = queryParams ? `${API_CONFIG.ENDPOINTS.EVENTS}?${queryParams}` : API_CONFIG.ENDPOINTS.EVENTS;
      
      const response = await apiService.makeRequest(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get event details
  getEventDetails: async (eventId, token) => {
    try {
      const response = await apiService.makeRequest(API_CONFIG.ENDPOINTS.EVENT_DETAILS, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }, { id: eventId });
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
