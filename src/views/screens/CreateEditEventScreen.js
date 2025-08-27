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
import { createEvent } from '../../controllers/EventController';

export default function CreateEditEventScreen({ navigation }) {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isRsvpEnabled, setIsRsvpEnabled] = useState(false);
  const [rsvpLimit, setRsvpLimit] = useState('100');
  const [isVolunteerEnabled, setIsVolunteerEnabled] = useState(false);
  const [volunteerRoles, setVolunteerRoles] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!eventTitle.trim()) {
      Alert.alert('Missing Title', 'Please enter an event title.');
      return;
    }
    setSaving(true);
    try {
      await createEvent({
        title: eventTitle,
        date: eventDate,
        time: eventTime,
        location,
        description,
        rsvpOpen: isRsvpEnabled,
        rsvpLimit: isRsvpEnabled ? Number(rsvpLimit || 0) : null,
        volunteerSignup: isVolunteerEnabled,
        volunteerRoles,
      });
      Alert.alert('Success', 'Event saved/updated');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to save event');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert('Delete Event', 'This is a mock screen. Implement deletion with your backend.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK' },
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeading}>Event Details</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Youth Mission Trip"
            value={eventTitle}
            onChangeText={setEventTitle}
            placeholderTextColor="#99A0A5"
          />

          <View style={styles.row}>
            <View style={[styles.flex1, { marginRight: 12 }]}> 
              <Text style={styles.label}>Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={eventDate}
                onChangeText={setEventDate}
                placeholderTextColor="#99A0A5"
              />
            </View>
            <View style={styles.flex1}> 
              <Text style={styles.label}>Time</Text>
              <TextInput
                style={styles.input}
                placeholder="10:00 AM"
                value={eventTime}
                onChangeText={setEventTime}
                placeholderTextColor="#99A0A5"
              />
            </View>
          </View>

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Community Hall, 123 Church Rd"
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#99A0A5"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={5}
            placeholder="A brief overview of the event"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#99A0A5"
          />
        </View>

        <Text style={styles.sectionHeading}>Options</Text>
        <View style={styles.card}>
          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Enable RSVP</Text>
            <Switch
              value={isRsvpEnabled}
              onValueChange={setIsRsvpEnabled}
              trackColor={{ false: '#e9ecef', true: '#4ECDC4' }}
              thumbColor="#ffffff"
            />
          </View>

          <Text style={styles.label}>RSVP Limit</Text>
          <TextInput
            style={styles.input}
            placeholder="100"
            value={rsvpLimit}
            onChangeText={setRsvpLimit}
            keyboardType="numeric"
            placeholderTextColor="#99A0A5"
            editable={isRsvpEnabled}
          />

          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Enable Volunteer Signup</Text>
            <Switch
              value={isVolunteerEnabled}
              onValueChange={setIsVolunteerEnabled}
              trackColor={{ false: '#e9ecef', true: '#4ECDC4' }}
              thumbColor="#ffffff"
            />
          </View>

          <Text style={styles.label}>Volunteer Roles Needed</Text>
          <TextInput
            style={styles.input}
            placeholder="Greeters, Setup Crew, Clean-up"
            value={volunteerRoles}
            onChangeText={setVolunteerRoles}
            placeholderTextColor="#99A0A5"
            editable={isVolunteerEnabled}
          />
        </View>

        <TouchableOpacity style={[styles.primaryButton, saving && { opacity: 0.7 }]} onPress={handleSave} disabled={saving}>
          <Text style={styles.primaryButtonText}>{saving ? 'Saving…' : 'Save/Update Event'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.destructiveButton} onPress={handleDelete}>
          <Text style={styles.destructiveButtonText}>Delete Event</Text>
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
    minHeight: 120,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
  },
  flex1: { flex: 1 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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


