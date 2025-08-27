import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function NotificationCenterScreen({ navigation }) {
  const [notifications] = useState([
    {
      id: 1,
      title: 'Youth Group Meeting Reminder',
      description: 'Your Youth Group meeting starts in 15 minutes at the community hall. See you there!',
      time: '2 min ago',
      type: 'event',
      unread: true,
      icon: 'calendar-outline'
    },
    {
      id: 2,
      title: 'New Message from Sarah',
      description: 'Sarah J. sent you a new message in the "Volunteer Team" group chat.',
      time: '1 hour ago',
      type: 'message',
      unread: true,
      icon: 'chatbubble-outline'
    },
    {
      id: 3,
      title: 'Important: Weekly Service Time Change',
      description: 'Due to unforeseen circumstances, the weekly service time has been adjusted. Please check the Announcements section for details.',
      time: '2 hours ago',
      type: 'announcement',
      unread: true,
      icon: 'megaphone-outline'
    },
    {
      id: 4,
      title: 'Choir Practice Cancellation',
      description: 'Choir practice for tonight, October 26th, has been cancelled. We will resume next week as scheduled.',
      time: '5:00 PM',
      type: 'event',
      unread: false,
      icon: 'calendar-outline'
    },
    {
      id: 5,
      title: 'App Update Available',
      description: 'A new version of the Church Connect app is available with improved features and bug fixes.',
      time: '2 days ago',
      type: 'system',
      unread: false,
      icon: 'notifications-outline'
    }
  ]);

  const getIconColor = (type) => {
    switch (type) {
      case 'event': return '#4ECDC4';
      case 'message': return '#FF6B35';
      case 'announcement': return '#45B7D1';
      case 'system': return '#96CEB4';
      default: return '#666';
    }
  };

  const renderNotification = (notification) => (
    <TouchableOpacity 
      key={notification.id}
      style={styles.notificationCard}
      activeOpacity={0.8}
      onPress={() => handleNotificationPress(notification)}
    >
      <View style={styles.notificationIcon}>
        <Ionicons 
          name={notification.icon} 
          size={24} 
          color={getIconColor(notification.type)} 
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <View style={styles.notificationMeta}>
            <Text style={styles.notificationTime}>{notification.time}</Text>
            {notification.unread && (
              <View style={styles.unreadIndicator} />
            )}
          </View>
        </View>
        <Text style={styles.notificationDescription}>{notification.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleNotificationPress = (notification) => {
    // Mark as read and navigate to appropriate screen
    if (notification.type === 'event') {
      navigation.navigate('Events');
    } else if (notification.type === 'message') {
      navigation.navigate('Chat');
    } else if (notification.type === 'announcement') {
      navigation.navigate('Announcements');
    }
  };

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log('Mark all as read');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity 
          style={styles.markAllButton}
          onPress={markAllAsRead}
        >
          <Text style={styles.markAllText}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>No Notifications</Text>
            <Text style={styles.emptyStateDescription}>
              You're all caught up! Check back later for updates.
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {notifications.map(renderNotification)}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  markAllButton: {
    padding: 5,
  },
  markAllText: {
    fontSize: 14,
    color: '#1e3c72',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  notificationsList: {
    gap: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  notificationMeta: {
    alignItems: 'flex-end',
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});


