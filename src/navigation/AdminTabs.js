import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';

import AdminDashboardScreen from '../views/screens/AdminDashboardScreen';
import DonationReportsScreen from '../views/screens/DonationReportsScreen';
import EventRegistrationsScreen from '../views/screens/EventRegistrationsScreen';
import ModerationCenterScreen from '../views/screens/ModerationCenterScreen';
import UserManagementScreen from '../views/screens/UserManagementScreen';

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    

    try {
      await logout();
      
      // Navigation will be handled by AppNavigator based on auth state
    } catch (error) {
      
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const LogoutButton = () => (
    <TouchableOpacity
      onPress={handleLogout}
      style={{
        marginRight: 15,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#FFF5F5',
        borderWidth: 1,
        borderColor: '#FECACA',
      }}
    >
      <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'grid-outline';
          if (route.name === 'AdminDashboard') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === 'DonationReports') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'UserManagement') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'ModerationCenter') {
            iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
          } else if (route.name === 'EventRegistrations') {
            iconName = focused ? 'checkbox' : 'checkbox-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: true,
        headerRight: () => <LogoutButton />,
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor: '#4ECDC4',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e9ecef',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 2,
        },
      })}
    >
      <Tab.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{ tabBarLabel: 'Dashboard', title: 'Admin Dashboard' }}
      />
      <Tab.Screen
        name="DonationReports"
        component={DonationReportsScreen}
        options={{ tabBarLabel: 'Reports', title: 'Donation Reports' }}
      />
      <Tab.Screen
        name="UserManagement"
        component={UserManagementScreen}
        options={{ tabBarLabel: 'Users', title: 'User Management' }}
      />
      <Tab.Screen
        name="ModerationCenter"
        component={ModerationCenterScreen}
        options={{ tabBarLabel: 'Moderation', title: 'Moderation Center' }}
      />
      <Tab.Screen
        name="EventRegistrations"
        component={EventRegistrationsScreen}
        options={{ tabBarLabel: 'Registrations', title: 'Event Registrations' }}
      />
    </Tab.Navigator>
  );
}


