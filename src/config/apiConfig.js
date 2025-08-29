// API Configuration
// Update this URL to point to your actual backend API endpoint
export const API_CONFIG = {
  // Development
  BASE_URL: 'https://your-api-endpoint.com/api',
  
  // Alternative configurations for different environments
  // BASE_URL: 'http://localhost:3000/api', // Local development
  // BASE_URL: 'https://staging-api.connectfaith.com/api', // Staging
  // BASE_URL: 'https://api.connectfaith.com/api', // Production
  
  // API Endpoints
  ENDPOINTS: {
    // User endpoints
    REGISTER: '/users/register',
    LOGIN: '/users/login',
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    FORGOT_PASSWORD: '/users/forgot-password',
    RESET_PASSWORD: '/users/reset-password',
    
    // Role endpoints
    ROLES: '/roles',
    
    // Event endpoints
    EVENTS: '/events',
    EVENT_DETAILS: '/events/:id',
    CREATE_EVENT: '/events',
    UPDATE_EVENT: '/events/:id',
    DELETE_EVENT: '/events/:id',
    EVENT_CATEGORIES: '/events/categories',
    
    // Announcement endpoints
    ANNOUNCEMENTS: '/announcements',
    ANNOUNCEMENT_DETAILS: '/announcements/:id',
    
    // Prayer endpoints
    PRAYERS: '/prayers',
    PRAYER_DETAILS: '/prayers/:id',
    
    // Sermon endpoints
    SERMONS: '/sermons',
    SERMON_DETAILS: '/sermons/:id',
    
    // Donation endpoints
    DONATIONS: '/donations',
    DONATION_HISTORY: '/donations/history',
    
    // Chat endpoints
    CHAT_ROOMS: '/chat/rooms',
    CHAT_MESSAGES: '/chat/messages',
  },
  
  // Request timeout (in milliseconds)
  TIMEOUT: 30000,
  
  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    BASE_DELAY: 1000,
  },
};

// Helper function to get full URL for an endpoint
export const getApiUrl = (endpoint, params = {}) => {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`;
  
  // Replace URL parameters
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  
  return url;
};
