import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function EventRegistrationsScreen() {
  const [selectedEvent, setSelectedEvent] = useState('Sunday Service');
  const [attendees] = useState([
    { id: 1, name: 'John Doe', contact: 'john.doe@example.com', checkedIn: true },
    { id: 2, name: 'Jane Smith', contact: '555-123-4567', checkedIn: false },
    { id: 3, name: 'Emily Davis', contact: 'emily.d@example.com', checkedIn: false },
    { id: 4, name: 'Sarah Kim', contact: '555-987-6543', checkedIn: false },
  ]);

  const AttendeeRow = ({ attendee }) => (
    <View key={attendee.id} style={styles.attendeeRow}>
      <View style={styles.attendeeInfo}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.attendeeName}>{attendee.name}</Text>
          <Text style={styles.attendeeContact}>{attendee.contact}</Text>
        </View>
      </View>
      <View style={styles.attendeeStatus}>
        <Switch
          value={attendee.checkedIn}
          onValueChange={() => {}}
          trackColor={{ false: '#e9ecef', true: '#5B8EAD' }}
          thumbColor="#ffffff"
        />
        <Text style={[styles.statusText, { color: attendee.checkedIn ? '#5B8EAD' : '#6B7280' }]}>
          {attendee.checkedIn ? 'Checked In' : 'Pending'}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.field}>
        <Text style={styles.label}>Select Event</Text>
        <View style={styles.select}>
          <Text style={styles.selectText}>{selectedEvent}</Text>
          <Ionicons name="chevron-down" size={18} color="#6B7280" />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Attendees ({attendees.length})</Text>
      
      {attendees.map((attendee) => (
        <View key={attendee.id}>
          <AttendeeRow attendee={attendee} />
          {attendee.id !== attendees.length && <View style={styles.divider} />}
        </View>
      ))}

      <TouchableOpacity style={styles.exportBtn} activeOpacity={0.85}>
        <Text style={styles.exportText}>Export as CSV</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  field: { marginBottom: 16 },
  label: { fontSize: 14, color: '#111827', marginBottom: 6, fontWeight: '600' },
  select: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  selectText: { color: '#111827', fontSize: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1F2A37', marginBottom: 16 },
  attendeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  attendeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB' },
  attendeeName: { fontSize: 16, fontWeight: '700', color: '#111827' },
  attendeeContact: { fontSize: 12, color: '#6B7280' },
  attendeeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: { fontSize: 14, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#EFEFEF' },
  exportBtn: {
    backgroundColor: '#5B8EAD',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  exportText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});


