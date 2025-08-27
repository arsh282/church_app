import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { networkUtils } from '../services/networkUtils';

const NetworkStatus = ({ showAlert = true }) => {
  const [isConnected, setIsConnected] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    let unsubscribe;
    
    const checkConnection = async () => {
      setIsChecking(true);
      try {
        const connected = await networkUtils.isConnected();
        setIsConnected(connected);
        
        if (!connected && showAlert) {
          Alert.alert(
            'No Internet Connection',
            'Please check your network settings and try again. Some features may not work without an internet connection.',
            [{ text: 'OK' }]
          );
        }
      } catch (error) {
        console.error('Error checking network status:', error);
        setIsConnected(false);
      } finally {
        setIsChecking(false);
      }
    };

    // Check connection immediately
    checkConnection();

    // Set up network listener
    const setupNetworkListener = () => {
      try {
        unsubscribe = NetInfo.addEventListener(state => {
          const connected = state.isConnected && state.isInternetReachable;
          setIsConnected(connected);
          
          if (!connected && showAlert) {
            Alert.alert(
              'Connection Lost',
              'You have lost your internet connection. Some features may not work properly.',
              [{ text: 'OK' }]
            );
          }
        });
      } catch (error) {
        console.error('Error setting up network listener:', error);
      }
    };

    setupNetworkListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [showAlert]);

  if (isConnected) {
    return null; // Don't show anything when connected
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isChecking ? 'Checking connection...' : 'No internet connection'}
      </Text>
      <Text style={styles.subText}>
        Please check your network settings
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff6b6b',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  subText: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },
});

export default NetworkStatus;
