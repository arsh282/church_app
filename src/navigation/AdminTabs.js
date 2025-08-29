import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';

import AdminDashboardScreen from '../views/screens/AdminDashboardScreen';
import DonationReportsScreen from '../views/screens/DonationReportsScreen';
import EventRegistrationsScreen from '../views/screens/EventRegistrationsScreen';
import ModerationCenterScreen from '../views/screens/ModerationCenterScreen';
import ProfileSettingsScreen from '../views/screens/ProfileSettingsScreen';
import UserManagementScreen from '../views/screens/UserManagementScreen';

const Tab = createBottomTabNavigator();

export default function AdminTabs() {



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
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: '#6699CC',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        tabBarActiveTintColor: '#6699CC',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingTop: Platform.OS === 'ios' ? 8 : 8,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          height: Platform.OS === 'ios' ? 90 : 80,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
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
      <Tab.Screen
        name="Profile"
        component={ProfileSettingsScreen}
        options={{ 
          tabBarLabel: 'Profile', 
          title: 'Admin Profile',
          headerShown: false 
        }}
      />
    </Tab.Navigator>
  );
}


