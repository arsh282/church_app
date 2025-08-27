import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const users = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', admin: true, total: '$1250.75' },
  { id: 2, name: 'David Lee', email: 'david.l@example.com', admin: false, total: '$300.00' },
  { id: 3, name: 'Emily Chen', email: 'emily.c@example.com', admin: false, total: '$75.50' },
  { id: 4, name: 'Michael Brown', email: 'michael.b@example.com', admin: true, total: '$2500.00' },
];

export default function UserManagementScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#6B7280" />
          <Text style={styles.searchPlaceholder}>Search users...</Text>
        </View>
        <TouchableOpacity style={styles.searchBtn}><Text style={styles.searchBtnText}>Search</Text></TouchableOpacity>
      </View>

      {users.map((u) => (
        <View key={u.id} style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <View style={styles.avatar} />
              <View>
                <Text style={styles.name}>{u.name}</Text>
                <Text style={styles.email}>{u.email}</Text>
              </View>
            </View>
            <View style={styles.roleRow}>
              <Text style={styles.roleLabel}>Role: {u.admin ? 'Admin' : 'Member'} </Text>
              <Switch value={u.admin} onValueChange={() => {}} />
            </View>
          </View>

          <View style={styles.hr} />
          <View style={styles.rowBetween}>
            <Text style={styles.totalLabel}>Total Donations:</Text>
            <Text style={styles.totalValue}>{u.total}</Text>
          </View>

          <View style={[styles.rowBetween, { marginTop: 12 }]}> 
            <TouchableOpacity style={styles.lightBtn}>
              <Ionicons name="create-outline" size={16} color="#5B8EAD" />
              <Text style={styles.lightBtnText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.greyBtn}>
              <Ionicons name="eye-outline" size={16} color="#111827" />
              <Text style={styles.greyBtnText}>View Donations</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 16, paddingTop: 10 },
  searchRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  searchBox: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  searchPlaceholder: { color: '#6B7280' },
  searchBtn: { backgroundColor: '#5B8EAD', paddingHorizontal: 16, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  searchBtnText: { color: '#fff', fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowCenter: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E5E7EB' },
  name: { fontSize: 16, fontWeight: '700', color: '#111827' },
  email: { fontSize: 12, color: '#6B7280' },
  roleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  hr: { height: 1, backgroundColor: '#EEF0F2', marginVertical: 12 },
  totalLabel: { color: '#6B7280' },
  totalValue: { color: '#111827', fontWeight: '800' },
  lightBtn: { flexDirection: 'row', gap: 6, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#E0EEF5' },
  lightBtnText: { color: '#5B8EAD', fontWeight: '700' },
  greyBtn: { flexDirection: 'row', gap: 6, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#F3F4F6' },
  greyBtnText: { color: '#111827', fontWeight: '700' },
});


