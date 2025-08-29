import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Platform } from 'react-native';

import AnnouncementsScreen from '../views/screens/AnnouncementsScreen';
import ChatScreen from '../views/screens/ChatScreen';
import DonationsScreen from '../views/screens/DonationsScreen';
import EventDetailsScreen from '../views/screens/EventDetailsScreen';
import EventsCalendarScreen from '../views/screens/EventsCalendarScreen';
import HomeScreen from '../views/screens/HomeScreen';
import NotificationCenterScreen from '../views/screens/NotificationCenterScreen';
import PrayerWallScreen from '../views/screens/PrayerWallScreen';
import ProfileSettingsScreen from '../views/screens/ProfileSettingsScreen';
import SermonArchiveScreen from '../views/screens/SermonArchiveScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Home Stack for screens accessible from Home tab
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationCenterScreen} />
      <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
      <Stack.Screen name="Donations" component={DonationsScreen} />
      <Stack.Screen name="Events" component={EventsCalendarScreen} />
      <Stack.Screen name="Sermons" component={SermonArchiveScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="PrayerWall" component={PrayerWallScreen} />
      <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function UserTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Events') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Pray') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Sermons') {
            iconName = focused ? 'play-circle' : 'play-circle-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
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
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen 
        name="Events" 
        component={EventsCalendarScreen}
        options={{
          title: 'Events',
        }}
      />
      <Tab.Screen 
        name="Pray" 
        component={PrayerWallScreen}
        options={{
          title: 'Pray',
        }}
      />
      <Tab.Screen 
        name="Sermons" 
        component={SermonArchiveScreen}
        options={{
          title: 'Sermons',
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen}
        options={{
          title: 'Chat',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileSettingsScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}


