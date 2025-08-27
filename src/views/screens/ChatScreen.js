import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ChatScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('groups');

  const groups = [
    {
      id: 1,
      name: 'Church Community',
      lastMessage: 'Great service today! Looking forward to next week.',
      timestamp: '2 min ago',
      unreadCount: 3,
      isOnline: true,
      avatar: 'CC'
    },
    {
      id: 2,
      name: 'Youth Ministry',
      lastMessage: 'Don\'t forget about the youth group meeting tomorrow!',
      timestamp: '1 hour ago',
      unreadCount: 0,
      isOnline: false,
      avatar: 'YM'
    },
    {
      id: 3,
      name: 'Prayer Warriors',
      lastMessage: 'Praying for everyone\'s health and safety.',
      timestamp: '3 hours ago',
      unreadCount: 1,
      isOnline: true,
      avatar: 'PW'
    }
  ];

  const privateChats = [
    {
      id: 1,
      name: 'Pastor John',
      lastMessage: 'Thank you for your message. I\'ll get back to you soon.',
      timestamp: '30 min ago',
      unreadCount: 0,
      isOnline: true,
      avatar: 'PJ'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      lastMessage: 'Can you help me with the Sunday school materials?',
      timestamp: '2 hours ago',
      unreadCount: 2,
      isOnline: false,
      avatar: 'SW'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      lastMessage: 'The outreach event was amazing!',
      timestamp: '1 day ago',
      unreadCount: 0,
      isOnline: true,
      avatar: 'MJ'
    }
  ];

  const renderChatItem = (chat) => (
    <TouchableOpacity 
      key={chat.id}
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatRoom', { chat })}
      activeOpacity={0.8}
    >
      <View style={styles.avatarContainer}>
        <View style={[
          styles.avatar,
          chat.isOnline && styles.avatarOnline
        ]}>
          <Text style={styles.avatarText}>{chat.avatar}</Text>
        </View>
        {chat.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{chat.name}</Text>
          <Text style={styles.chatTimestamp}>{chat.timestamp}</Text>
        </View>
        <Text style={styles.chatMessage} numberOfLines={1}>
          {chat.lastMessage}
        </Text>
      </View>
      
      {chat.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6699CC" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <TouchableOpacity style={styles.headerRight}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tabButton,
              activeTab === 'groups' && styles.tabButtonActive
            ]}
            onPress={() => setActiveTab('groups')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'groups' && styles.tabTextActive
            ]}>
              Groups
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton,
              activeTab === 'private' && styles.tabButtonActive
            ]}
            onPress={() => setActiveTab('private')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'private' && styles.tabTextActive
            ]}>
              Private
            </Text>
          </TouchableOpacity>
        </View>

        {/* Chat List */}
        <ScrollView style={styles.chatList} showsVerticalScrollIndicator={false}>
          {activeTab === 'groups' ? (
            groups.map(renderChatItem)
          ) : (
            privateChats.map(renderChatItem)
          )}
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="create" size={24} color="#6699CC" />
            <Text style={styles.quickActionText}>New Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="people" size={24} color="#6699CC" />
            <Text style={styles.quickActionText}>Create Group</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    backgroundColor: '#6699CC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  headerRight: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabButtonActive: {
    backgroundColor: '#6699CC',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  tabTextActive: {
    color: '#fff',
  },
  chatList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6699CC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarOnline: {
    borderColor: '#FFCC00',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFCC00',
    borderWidth: 2,
    borderColor: '#fff',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chatTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  chatMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  unreadBadge: {
    backgroundColor: '#FFCC00',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadCount: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 15,
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});


