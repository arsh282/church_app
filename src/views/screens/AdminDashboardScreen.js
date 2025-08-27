import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function AdminDashboardScreen({ navigation }) {
  const QuickCard = ({ icon, title, description, onPress }) => (
    <TouchableOpacity style={styles.qCard} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.qIconWrap}>
        <Ionicons name={icon} size={24} color="#6A99BA" />
      </View>
      <Text style={styles.qTitle}>{title}</Text>
      <Text style={styles.qDesc}>{description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeading}>Overview</Text>

        <View style={styles.overviewRow}>
          <View style={styles.metricCard}>
            <Ionicons name="logo-usd" size={28} color="#D6A756" style={{ opacity: 0.7 }} />
            <Text style={styles.metricValue}>$1,250</Text>
            <Text style={styles.metricLabel}>Today's Donations</Text>
          </View>
          <View style={styles.metricCard}>
            <Ionicons name="heart-outline" size={28} color="#6A99BA" style={{ opacity: 0.8 }} />
            <Text style={styles.metricValue}>15</Text>
            <Text style={styles.metricLabel}>New Prayer Requests</Text>
          </View>
        </View>

        <Text style={[styles.sectionHeading, { marginTop: 8 }]}>Quick Actions</Text>

        <View style={styles.grid}>
          <QuickCard
            icon="calendar-outline"
            title="Manage Events"
            description="Create, edit, or view event details."
            onPress={() => navigation.navigate('CreateEvent')}
          />
          <QuickCard
            icon="document-text-outline"
            title="Manage Announcements"
            description="Publish or update church announcements."
            onPress={() => navigation.navigate('CreateAnnouncement')}
          />
          <QuickCard
            icon="volume-high-outline"
            title="Manage Sermons"
            description="Upload new sermons or organize archives."
            onPress={() => navigation.navigate('UploadSermon')}
          />
          <QuickCard
            icon="people-outline"
            title="User Accounts"
            description="View and manage member profiles."
            onPress={() => navigation.navigate('UserManagement')}
          />
          <QuickCard
            icon="download-outline"
            title="Donation Reports"
            description="Access financial contribution data."
            onPress={() => navigation.navigate('DonationReports')}
          />
          <QuickCard
            icon="shield-checkmark-outline"
            title="Content Moderation"
            description="Review and moderate community content."
            onPress={() => navigation.navigate('ModerationCenter')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2A37',
    marginBottom: 12,
  },
  overviewRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1F2A37',
    marginTop: 8,
  },
  metricLabel: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
    marginBottom: 24,
  },
  qCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  qIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF2FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  qTitle: { fontSize: 16, fontWeight: '700', color: '#1F2A37', marginBottom: 6 },
  qDesc: { fontSize: 13, color: '#6B7280' },
});


