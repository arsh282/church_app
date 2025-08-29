import { API_CONFIG } from '../config/apiConfig';
import { apiService } from '../services/api';
import { mockApiService } from '../services/mockApi';

// Helper function to get auth token (you'll need to implement this based on your auth system)
const getAuthToken = () => {
  // This should return the user's authentication token
  // You can get this from your auth context, AsyncStorage, or wherever you store it
  return 'mock_token'; // Replace with actual token retrieval
};

// Helper function to determine if we should use mock API
const useMockApi = () => {
  // You can control this with an environment variable or config
  return API_CONFIG.BASE_URL.includes('your-api-endpoint.com') || __DEV__;
};

export const createEvent = async (payload) => {
  try {
    const token = getAuthToken();
    
    if (useMockApi()) {
      const result = await mockApiService.createEvent(payload, token);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    } else {
      const result = await apiService.createEvent(payload, token);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    }
  } catch (error) {
    console.error('Create event error:', error);
    throw error;
  }
};

export const getEvent = async (id) => {
  try {
    const token = getAuthToken();
    
    if (useMockApi()) {
      const result = await mockApiService.getEventDetails(id, token);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    } else {
      const result = await apiService.getEventDetails(id, token);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    }
  } catch (error) {
    console.error('Get event error:', error);
    throw error;
  }
};

export const updateEvent = async (id, payload) => {
  try {
    const token = getAuthToken();
    
    if (useMockApi()) {
      const result = await mockApiService.updateEvent(id, payload, token);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    } else {
      const result = await apiService.updateEvent(id, payload, token);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    }
  } catch (error) {
    console.error('Update event error:', error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const token = getAuthToken();
    
    if (useMockApi()) {
      const result = await mockApiService.deleteEvent(id, token);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    } else {
      const result = await apiService.deleteEvent(id, token);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    }
  } catch (error) {
    console.error('Delete event error:', error);
    throw error;
  }
};

export const getEventCategories = async () => {
  try {
    const token = getAuthToken();
    
    if (useMockApi()) {
      const result = await mockApiService.getEventCategories(token);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    } else {
      const result = await apiService.getEventCategories(token);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    }
  } catch (error) {
    console.error('Get event categories error:', error);
    throw error;
  }
};

export const getEvents = async (filters = {}) => {
  try {
    const token = getAuthToken();
    
    if (useMockApi()) {
      const result = await mockApiService.getEvents(token, filters);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    } else {
      const result = await apiService.getEvents(token, filters);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    }
  } catch (error) {
    console.error('Get events error:', error);
    throw error;
  }
};

export const streamEventsForMonth = (monthStartISO, monthEndISO, cb) => {
  // Mock implementation - in real app this would use WebSocket or polling
  // For now, just call the callback with empty array
  cb([]);
  return () => {}; // Return unsubscribe function
};


