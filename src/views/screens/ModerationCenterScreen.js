import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ModerationCenterScreen() {
  const [tab, setTab] = useState('prayer');
  const items = [
    { id: 1, name: 'Sarah Chen', time: '2 hours ago', text: 'Please pray for my upcoming job interview. I\'m feeling a lot of anxiety and would appreciate spiritual strength and clarity. Thank you.' },
    { id: 2, name: 'Mark Johnson', time: '1 day ago', text: 'My grandmother is recovering from surgery. Please pray for a swift and full recovery, and for peace for our family during this time.' },
    { id: 3, name: 'Anonymous', time: '2 days ago', text: 'Struggling with feelings of hopelessness. Please pray for renewed faith and strength to overcome these challenges.' },
  ];

  const Chip = ({ active, children, onPress }) => (
    <TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{children}</Text>
    </TouchableOpacity>
  );

  const Action = ({ icon, text, color = '#3B82F6' }) => (
    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: color }]}> 
      <Ionicons name={icon} size={16} color="#fff" />
      <Text style={styles.actionText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.tabsRow}>
        <Chip active={tab === 'prayer'} onPress={() => setTab('prayer')}>Prayer</Chip>
        <Chip active={tab === 'chat'} onPress={() => setTab('chat')}>Chat</Chip>
      </View>

      {items.map((it) => (
        <View key={it.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{it.name}</Text>
              <Text style={styles.time}>{it.time}</Text>
            </View>
          </View>
          <Text style={styles.body}>{it.text}</Text>
          <View style={styles.actionsRow}>
            <Action icon="checkmark-circle-outline" text="Approve" color="#5B8EAD" />
            <Action icon="flag-outline" text="Flag" color="#E5E7EB" />
            <Action icon="trash-outline" text="Delete" color="#B94A48" />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16, paddingTop: 10 },
  tabsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  chip: {
    flex: 1,
    backgroundColor: '#E0EEF5',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  chipActive: { backgroundColor: '#5B8EAD' },
  chipText: { color: '#1F2A37', fontWeight: '700' },
  chipTextActive: { color: '#fff' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E5E7EB', marginRight: 10 },
  name: { fontSize: 16, fontWeight: '700', color: '#111827' },
  time: { fontSize: 12, color: '#6B7280' },
  body: { color: '#111827', fontSize: 15, lineHeight: 22, marginBottom: 12 },
  actionsRow: { flexDirection: 'row', gap: 8 },
  actionBtn: { flexDirection: 'row', gap: 6, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12 },
  actionText: { color: '#fff', fontWeight: '700' },
});


