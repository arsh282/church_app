import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { RoleIndicator } from '../../components/RoleBasedAccess';
import { useAuth } from '../../context/CustomAuthContext';

export default function ProfileSettingsScreen({ navigation }) {
  const { userProfile, logout } = useAuth();

  const userName = userProfile?.fullName || (userProfile?.role === 'admin' ? 'Admin' : 'Member');
  const userEmail = userProfile?.email || 'member@example.com';
  const userRole = userProfile?.role || 'user';

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Logout error:', error);
            }
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change feature coming soon!');
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'Notification settings coming soon!');
  };

  const handleHelp = () => {
    Alert.alert('Help & Support', 'Help and support feature coming soon!');
  };

  const handleAbout = () => {
    Alert.alert('About', 'ConnectFaith Church App\nVersion 1.0.0\n\nA community app for church members to stay connected.');
  };

  const handleAdminSettings = () => {
    Alert.alert('Admin Settings', 'Advanced admin settings coming soon!');
  };

  const handleSystemLogs = () => {
    Alert.alert('System Logs', 'System logs and analytics coming soon!');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6699CC" />
      
      {/* Header */}
      <LinearGradient
        colors={['#6699CC', '#6699CC']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.backButton} />
          <Text style={styles.headerTitle}>{userRole === 'admin' ? 'Admin Profile' : 'Profile'}</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitial}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileEmail}>{userEmail}</Text>
          <View style={styles.roleContainer}>
            <RoleIndicator role={userRole} />
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.optionItem} onPress={handleEditProfile}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIcon, { backgroundColor: '#6699CC' + '20' }]}>
                <Ionicons name="person-outline" size={24} color="#6699CC" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>Edit Profile</Text>
                <Text style={styles.optionSubtext}>Update your personal information</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={handleChangePassword}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIcon, { backgroundColor: '#FFCC00' + '20' }]}>
                <Ionicons name="lock-closed-outline" size={24} color="#FFCC00" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>Change Password</Text>
                <Text style={styles.optionSubtext}>Update your account password</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={handleNotifications}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIcon, { backgroundColor: '#6699CC' + '20' }]}>
                <Ionicons name="notifications-outline" size={24} color="#6699CC" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>Notification Settings</Text>
                <Text style={styles.optionSubtext}>Manage your notification preferences</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Admin-specific sections */}
        {userRole === 'admin' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Admin Tools</Text>
              
              <TouchableOpacity style={styles.optionItem} onPress={handleAdminSettings}>
                <View style={styles.optionLeft}>
                  <View style={[styles.optionIcon, { backgroundColor: '#FF6B35' + '20' }]}>
                    <Ionicons name="settings-outline" size={24} color="#FF6B35" />
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>Admin Settings</Text>
                    <Text style={styles.optionSubtext}>Advanced system configuration</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionItem} onPress={handleSystemLogs}>
                <View style={styles.optionLeft}>
                  <View style={[styles.optionIcon, { backgroundColor: '#4ECDC4' + '20' }]}>
                    <Ionicons name="analytics-outline" size={24} color="#4ECDC4" />
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>System Logs</Text>
                    <Text style={styles.optionSubtext}>View system logs and analytics</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Information</Text>
          
          <TouchableOpacity style={styles.optionItem} onPress={handleHelp}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIcon, { backgroundColor: '#FFCC00' + '20' }]}>
                <Ionicons name="help-circle-outline" size={24} color="#FFCC00" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>Help & Support</Text>
                <Text style={styles.optionSubtext}>Get help and contact support</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem} onPress={handleAbout}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIcon, { backgroundColor: '#6699CC' + '20' }]}>
                <Ionicons name="information-circle-outline" size={24} color="#6699CC" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionText}>About</Text>
                <Text style={styles.optionSubtext}>App information and version</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
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
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 16,
  },
  profileImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e3c72',
  },
  profileInitial: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  roleContainer: {
    marginTop: 10,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  optionSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  bottomSpacing: {
    height: 30,
  },
});


