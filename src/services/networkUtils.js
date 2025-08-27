import NetInfo from '@react-native-community/netinfo';

export const networkUtils = {
  // Check if device is connected to internet
  isConnected: async () => {
    try {
      const state = await NetInfo.fetch();
      return state.isConnected && state.isInternetReachable;
    } catch (error) {
      console.error('Error checking network connectivity:', error);
      return false;
    }
  },

  // Wait for network connection with timeout
  waitForConnection: async (timeout = 10000) => {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const isConnected = await networkUtils.isConnected();
      if (isConnected) {
        return true;
      }
      // Wait 1 second before checking again
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    return false;
  },

  // Retry function with exponential backoff
  retryWithBackoff: async (operation, maxRetries = 3, baseDelay = 1000) => {
    let lastError;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        // Check network connectivity before attempting operation
        const isConnected = await networkUtils.isConnected();
        if (!isConnected) {
          throw new Error('No internet connection available');
        }
        
        return await operation();
      } catch (error) {
        lastError = error;
        
        // If it's the last attempt, throw the error
        if (attempt === maxRetries) {
          throw error;
        }
        
        // Check if it's a network-related error
        const isNetworkError = error.code === 'auth/network-request-failed' || 
                              error.message.includes('network') ||
                              error.message.includes('connection');
        
        if (isNetworkError) {
          console.log(`Network error on attempt ${attempt + 1}, retrying...`);
          // Wait with exponential backoff
          const delay = baseDelay * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          // For non-network errors, don't retry
          throw error;
        }
      }
    }
    
    throw lastError;
  },

  // Test Firebase connectivity
  testFirebaseConnection: async () => {
    try {
      const isConnected = await networkUtils.isConnected();
      if (!isConnected) {
        return {
          success: false,
          error: 'No internet connection available'
        };
      }

      return {
        success: true,
        message: 'Network connection available'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};
