import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuth } from '../../context/CustomAuthContext';
import { createAnnouncement } from '../../controllers/AnnouncementController';

export default function CreateEditAnnouncementScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [sendPush, setSendPush] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Missing Title', 'Please enter a title.');
      return;
    }
    setSaving(true);
    try {
      await createAnnouncement({
        title,
        body,
        tags: tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        createdBy: user?.uid || 'mock-user',
        sendPush,
      });
      Alert.alert('Success', 'Announcement saved');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to save announcement');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Announcement', 'This is a mock screen. Implement deletion with your backend.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK' },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Simple Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Announcement</Text>
        <View style={styles.headerRight} />
      </View>
      
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter announcement title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#99A0A5"
          />

          <Text style={styles.label}>Body</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={6}
            placeholder="Write the full announcement details here..."
            value={body}
            onChangeText={setBody}
            placeholderTextColor="#99A0A5"
          />

          <Text style={styles.label}>Tags</Text>
          <TextInput
            style={styles.input}
            placeholder="Add tags (e.g., Youth, Missions, Community)"
            value={tags}
            onChangeText={setTags}
            placeholderTextColor="#99A0A5"
          />

          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Send Push Notification</Text>
            <Switch
              value={sendPush}
              onValueChange={setSendPush}
              trackColor={{ false: '#e9ecef', true: '#4ECDC4' }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleSave} disabled={saving}>
          <Text style={styles.primaryButtonText}>{saving ? 'Saving…' : 'Publish Announcement'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleSave} disabled={saving}>
          <Text style={styles.secondaryButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.destructiveButton} onPress={handleDelete}>
          <Text style={styles.destructiveButtonText}>Delete Announcement</Text>
        </TouchableOpacity>
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
    backgroundColor: '#6699CC',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#5B8EAD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    color: '#1F2A37',
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 12,
    color: '#1F2A37',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#111827',
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    minHeight: 140,
    textAlignVertical: 'top',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  optionLabel: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  primaryButton: {
    backgroundColor: '#5B8EAD',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#D6C07A',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButtonText: {
    color: '#1F2A37',
    fontSize: 16,
    fontWeight: '700',
  },
  destructiveButton: {
    backgroundColor: '#B94A48',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  destructiveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});


