import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import NetworkStatus from '../components/NetworkStatus';
import { useAuth } from '../context/CustomAuthContext';

// Auth screens
import ForgotPasswordScreen from '../views/screens/ForgotPasswordScreen';
import LoginScreen from '../views/screens/LoginScreen';
import SignUpScreen from '../views/screens/SignUpScreen';

// Member navigation
import UserTabs from './UserTabs';

// Admin navigation
import AdminNavigator from './AdminNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, userProfile, loading, isAdmin } = useAuth();

  console.log('🔄 AppNavigator: Current state - user:', user?.id || user?.uid, 'loading:', loading, 'isAdmin:', isAdmin());

  if (loading) {
    console.log('🔄 AppNavigator: Showing loading screen');
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6699CC" />
      </View>
    );
  }

  console.log('🔄 AppNavigator: User authenticated:', !!(user?.id || user?.uid), 'Role:', userProfile?.role);

  return (
    <View style={styles.container}>
      <NetworkStatus showAlert={false} />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!(user?.id || user?.uid) ? (
            // Auth Stack
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            </>
          ) : (
            // Main App Stack - Role-based routing
            <>
              {isAdmin() ? (
                // Admin Flow
                <Stack.Screen name="AdminFlow" component={AdminNavigator} />
              ) : (
                // Member Flow
                <Stack.Screen name="MemberFlow" component={UserTabs} />
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5'
  }
});

export default AppNavigator;


