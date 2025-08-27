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

export default function AnnouncementsScreen({ navigation }) {
  const [announcements] = useState([
    {
      id: 1,
      title: 'Weekly Service Time Change',
      content: 'Due to unforeseen circumstances, our weekly Sunday service time has been adjusted. The new service time will be 10:30 AM instead of 9:00 AM. This change will be effective starting this Sunday. We apologize for any inconvenience and appreciate your understanding.',
      author: 'Pastor John Smith',
      date: 'October 25, 2024',
      priority: 'high',
      category: 'service',
      image: null // Will use placeholder
    },
    {
      id: 2,
      title: 'Youth Ministry Fall Retreat',
      content: 'We\'re excited to announce our annual Youth Ministry Fall Retreat! This year\'s theme is "Growing in Faith Together" and will be held at Pine Valley Camp from November 15-17. Registration is now open and spots are limited. Please contact Sarah Johnson for more details and registration forms.',
      author: 'Sarah Johnson',
      date: 'October 20, 2024',
      priority: 'medium',
      category: 'youth',
      image: null // Will use placeholder
    },
    {
      id: 3,
      title: 'Community Food Drive Success',
      content: 'Thank you to everyone who participated in our community food drive! We collected over 500 pounds of food and essential items for families in need. Your generosity has made a significant impact on our community. Special thanks to the outreach team for organizing this wonderful event.',
      author: 'Outreach Team',
      date: 'October 18, 2024',
      priority: 'normal',
      category: 'outreach',
      image: null // Will use placeholder
    },
    {
      id: 4,
      title: 'New Bible Study Series',
      content: 'Join us for our new Bible study series "Walking Through the Psalms" starting next Tuesday evening at 7:00 PM in the Fellowship Hall. This 8-week study will explore the beauty and wisdom of the Psalms. All are welcome, and no prior Bible study experience is required.',
      author: 'Deacon Jane Doe',
      date: 'October 15, 2024',
      priority: 'normal',
      category: 'education',
      image: null // Will use placeholder
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#FF6B35';
      case 'medium': return '#FFD700';
      case 'normal': return '#4ECDC4';
      default: return '#4ECDC4';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'Important';
      case 'medium': return 'Update';
      case 'normal': return 'News';
      default: return 'News';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'service': return 'time-outline';
      case 'youth': return 'people-outline';
      case 'outreach': return 'heart-outline';
      case 'education': return 'book-outline';
      default: return 'megaphone-outline';
    }
  };

  const renderAnnouncement = (announcement) => (
    <TouchableOpacity 
      key={announcement.id}
      style={styles.announcementCard}
      onPress={() => navigation.navigate('AnnouncementDetails', { announcement })}
      activeOpacity={0.8}
    >
      <View style={styles.announcementHeader}>
        <View style={styles.announcementMeta}>
          <View style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor(announcement.priority) }
          ]}>
            <Text style={styles.priorityText}>
              {getPriorityText(announcement.priority)}
            </Text>
          </View>
          <Text style={styles.announcementDate}>{announcement.date}</Text>
        </View>
        <View style={styles.categoryIcon}>
          <Ionicons 
            name={getCategoryIcon(announcement.category)} 
            size={24} 
            color="#4ECDC4" 
          />
        </View>
      </View>
      
      <Text style={styles.announcementTitle}>{announcement.title}</Text>
      <Text style={styles.announcementContent} numberOfLines={3}>
        {announcement.content}
      </Text>
      
      <View style={styles.announcementFooter}>
        <Text style={styles.announcementAuthor}>— {announcement.author}</Text>
        <TouchableOpacity style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Read More</Text>
          <Ionicons name="chevron-forward" size={16} color="#4ECDC4" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
        <Text style={styles.headerTitle}>Announcements</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeIcon}>
            <Ionicons name="megaphone" size={32} color="#4ECDC4" />
          </View>
          <Text style={styles.welcomeTitle}>Stay Connected</Text>
          <Text style={styles.welcomeSubtitle}>
            Get the latest updates and important information about our church community
          </Text>
        </View>

        {/* Announcements List */}
        <View style={styles.announcementsSection}>
          <Text style={styles.sectionTitle}>Recent Announcements</Text>
          <View style={styles.announcementsList}>
            {announcements.map(renderAnnouncement)}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="notifications-outline" size={24} color="#4ECDC4" />
              <Text style={styles.actionButtonText}>Notification Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="calendar-outline" size={24} color="#FF6B35" />
              <Text style={styles.actionButtonText}>View Calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  filterButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  welcomeSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f0f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  announcementsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  announcementsList: {
    gap: 16,
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  announcementMeta: {
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  announcementDate: {
    fontSize: 14,
    color: '#666',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
  },
  announcementContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  announcementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  announcementAuthor: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readMoreText: {
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '500',
  },
  quickActions: {
    marginBottom: 30,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});


