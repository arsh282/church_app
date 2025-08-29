import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AdminDashboardScreen from '../views/screens/AdminDashboardScreen';
import CreateEditAnnouncementScreen from '../views/screens/CreateEditAnnouncementScreen';
import CreateEditEventScreen from '../views/screens/CreateEditEventScreen';
import DonationReportsScreen from '../views/screens/DonationReportsScreen';
import EventRegistrationsScreen from '../views/screens/EventRegistrationsScreen';
import ModerationCenterScreen from '../views/screens/ModerationCenterScreen';
import UploadEditSermonScreen from '../views/screens/UploadEditSermonScreen';
import UserManagementScreen from '../views/screens/UserManagementScreen';
import AdminTabs from './AdminTabs';

const Stack = createNativeStackNavigator();
export default function AdminNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6699CC',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      {/* Bottom tabs as the primary admin shell */}
      <Stack.Screen name="AdminTabs" component={AdminTabs} options={{ headerShown: false }} />
      {/* Task/detail screens presented over tabs */}
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} options={{ title: 'Admin' }} />
      <Stack.Screen name="CreateAnnouncement" component={CreateEditAnnouncementScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateEvent" component={CreateEditEventScreen} />
      <Stack.Screen name="EventRegistrations" component={EventRegistrationsScreen} />
      <Stack.Screen name="UploadSermon" component={UploadEditSermonScreen} />
      <Stack.Screen name="DonationReports" component={DonationReportsScreen} />
      <Stack.Screen name="UserManagement" component={UserManagementScreen} />
      <Stack.Screen name="ModerationCenter" component={ModerationCenterScreen} />
    </Stack.Navigator>
  );
}


