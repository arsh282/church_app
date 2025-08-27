import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DonationReportsScreen() {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [userFilter, setUserFilter] = useState('All Users');

  const rows = [
    ['John Doe', '$1,250.00'],
    ['Jane Smith', '$780.00'],
    ['Pastor Mark', '$2,500.00'],
    ['Sarah Lee', '$420.00'],
    ['David Chen', '$300.00'],
    ['Maria Garcia', '$550.00'],
    ['Kevin Brown', '$1,100.00'],
    ['Linda White', '$600.00'],
    ['Robert Green', '$900.00'],
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.field}>
        <Text style={styles.label}>Date Range</Text>
        <View style={styles.select}>
          <Text style={styles.selectText}>{dateRange}</Text>
          <Ionicons name="chevron-down" size={18} color="#6B7280" />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Filter by User</Text>
        <View style={styles.select}>
          <Text style={styles.selectText}>{userFilter}</Text>
          <Ionicons name="chevron-down" size={18} color="#6B7280" />
        </View>
      </View>

      <TouchableOpacity style={styles.exportBtn} activeOpacity={0.85}>
        <Ionicons name="download-outline" size={18} color="#fff" />
        <Text style={styles.exportText}>Export CSV</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Summary by User</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.th, { flex: 2 }]}>User</Text>
          <Text style={[styles.th, { flex: 1, textAlign: 'right' }]}>Total Donations</Text>
        </View>
        {rows.map(([user, total]) => (
          <View key={user} style={styles.tr}>
            <Text style={[styles.td, { flex: 2 }]}>{user}</Text>
            <Text style={[styles.td, { flex: 1, textAlign: 'right', color: '#D6A756', fontWeight: '700' }]}>{total}</Text>
          </View>
        ))}
      </View>
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
  field: { marginBottom: 12 },
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
  exportBtn: {
    backgroundColor: '#5B8EAD',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  exportText: { color: '#fff', fontWeight: '700' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#1F2A37', marginBottom: 12 },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  th: { fontSize: 13, color: '#6B7280', fontWeight: '700' },
  tr: { flexDirection: 'row', paddingVertical: 10 },
  td: { fontSize: 15, color: '#111827' },
});


