import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
 

export default function UploadEditSermonScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('audio');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      Alert.alert('Saved', 'This is a mock screen. Hook up your backend here.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Sermon', 'This is a mock screen. Implement deletion with your backend.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK' },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeading}>Sermon Details</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Sermon Title</Text>
          <TextInput style={styles.input} placeholder="Enter sermon title" value={title} onChangeText={setTitle} placeholderTextColor="#99A0A5" />

          <Text style={styles.label}>Speaker</Text>
          <TextInput style={styles.input} placeholder="Who delivered the sermon?" value={speaker} onChangeText={setSpeaker} placeholderTextColor="#99A0A5" />

          <Text style={styles.label}>Tags (comma-separated)</Text>
          <TextInput style={styles.input} placeholder="e.g., Faith, Hope, Community" value={tags} onChangeText={setTags} placeholderTextColor="#99A0A5" />

          <Text style={styles.label}>Description</Text>
          <TextInput style={[styles.input, styles.textArea]} multiline numberOfLines={6} placeholder="Provide a detailed sermon summary" value={description} onChangeText={setDescription} placeholderTextColor="#99A0A5" />
        </View>

        <Text style={styles.sectionHeading}>Content Source</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.toggleBtn, source === 'audio' && styles.toggleBtnActive]} onPress={() => setSource('audio')}>
              <Text style={[styles.toggleText, source === 'audio' && styles.toggleTextActive]}>Audio File</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.toggleBtn, source === 'youtube' && styles.toggleBtnActive]} onPress={() => setSource('youtube')}>
              <Text style={[styles.toggleText, source === 'youtube' && styles.toggleTextActive]}>YouTube Link</Text>
            </TouchableOpacity>
          </View>

          <Text style={[styles.label, { marginTop: 12 }]}>{source === 'audio' ? 'Upload Audio File' : 'YouTube URL'}</Text>
          <TextInput style={styles.input} placeholder={source === 'audio' ? 'Pick a file (mock)' : 'https://youtu.be/...'} placeholderTextColor="#99A0A5" />
        </View>

        <TouchableOpacity style={[styles.primaryButton, saving && { opacity: 0.7 }]} onPress={handleSave} disabled={saving}>
          <Text style={styles.primaryButtonText}>{saving ? 'Saving…' : 'Save Sermon'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.destructiveButton} onPress={handleDelete}>
          <Text style={styles.destructiveButtonText}>Delete Sermon</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
  },
  toggleBtnActive: {
    backgroundColor: '#E0EEF5',
    borderWidth: 2,
    borderColor: '#5B8EAD',
  },
  toggleText: { color: '#374151', fontWeight: '600' },
  toggleTextActive: { color: '#1F2A37' },
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


