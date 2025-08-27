import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/CustomAuthContext';

// Role descriptions for users
export const ROLE_DESCRIPTIONS = {
  user: {
    title: 'Member',
    description: 'Regular church member with access to community features',
    features: [
      'Submit and pray for prayer requests',
      'Participate in community chat',
      'View church events and announcements',
      'Watch sermons and access resources',
      'Make donations to support the ministry'
    ],
    color: '#6699CC'
  },
  member: {
    title: 'Member',
    description: 'Regular church member with access to community features',
    features: [
      'Submit and pray for prayer requests',
      'Participate in community chat',
      'View church events and announcements',
      'Watch sermons and access resources',
      'Make donations to support the ministry'
    ],
    color: '#6699CC'
  },
  admin: {
    title: 'Administrator',
    description: 'Church administrator with full management capabilities',
    features: [
      'All member features plus:',
      'Create and manage church events',
      'Post announcements to the community',
      'Upload and manage sermon content',
      'Manage user accounts and roles',
      'View analytics and reports',
      'Moderate community content'
    ],
    color: '#FFCC00'
  }
};

// Role indicator component
export const RoleIndicator = ({ role = 'user' }) => {
  const roleInfo = ROLE_DESCRIPTIONS[role] || ROLE_DESCRIPTIONS.user;
  
  return (
    <TouchableOpacity
      style={[styles.roleBadge, { backgroundColor: roleInfo.color }]}
      onPress={() => {
        Alert.alert(
          `${roleInfo.title} Role`,
          roleInfo.description,
          [
            { text: 'Features', onPress: () => showRoleFeatures(roleInfo) },
            { text: 'OK', style: 'default' }
          ]
        );
      }}
    >
      <Ionicons 
        name={role === 'admin' ? 'shield-checkmark' : 'person'} 
        size={12} 
        color="#fff" 
      />
      <Text style={styles.roleText}>{roleInfo.title}</Text>
    </TouchableOpacity>
  );
};

// Admin badge component
export const AdminBadge = () => {
  return (
    <View style={[styles.adminBadge, { backgroundColor: ROLE_DESCRIPTIONS.admin.color }]}>
      <Ionicons name="shield-checkmark" size={12} color="#fff" />
      <Text style={styles.adminBadgeText}>Admin</Text>
    </View>
  );
};

// Show role features in an alert
const showRoleFeatures = (roleInfo) => {
  const featuresList = roleInfo.features.map(feature => `• ${feature}`).join('\n');
  
  Alert.alert(
    `${roleInfo.title} Features`,
    featuresList,
    [{ text: 'OK', style: 'default' }]
  );
};

// Role-based access control component
export const RoleBasedAccess = ({ 
  children, 
  requiredRole = 'user', 
  fallback = null,
  showAccessDenied = true 
}) => {
  const { userProfile } = useAuth();
  const userRole = userProfile?.role || 'user';
  
  // Check if user has required role
  const hasAccess = checkRoleAccess(userRole, requiredRole);
  
  if (hasAccess) {
    return children;
  }
  
  if (fallback) {
    return fallback;
  }
  
  if (showAccessDenied) {
    return <AccessDenied requiredRole={requiredRole} />;
  }
  
  return null;
};

// Access denied component
export const AccessDenied = ({ requiredRole }) => {
  const roleInfo = ROLE_DESCRIPTIONS[requiredRole] || ROLE_DESCRIPTIONS.user;
  
  return (
    <View style={styles.accessDenied}>
      <Ionicons name="lock-closed" size={48} color="#999" />
      <Text style={styles.accessDeniedTitle}>Access Restricted</Text>
      <Text style={styles.accessDeniedText}>
        This feature requires {roleInfo.title.toLowerCase()} access.
      </Text>
      <Text style={styles.accessDeniedSubtext}>
        Contact your church administrator to request access.
      </Text>
    </View>
  );
};

// Hook for role-based permissions
export const useRolePermissions = () => {
  const { userProfile } = useAuth();
  const userRole = userProfile?.role || 'user';
  
  return {
    // Role checks
    isAdmin: () => userRole === 'admin',
    isMember: () => userRole === 'user' || userRole === 'member',
    hasRole: (role) => userRole === role,
    
    // Permission checks
    canAccessAdminFeatures: () => userRole === 'admin',
    canCreateContent: () => userRole === 'admin',
    canModerateContent: () => userRole === 'admin',
    canViewReports: () => userRole === 'admin',
    canManageUsers: () => userRole === 'admin',
    
    // Feature access
    canCreateEvents: () => userRole === 'admin',
    canCreateAnnouncements: () => userRole === 'admin',
    canUploadSermons: () => userRole === 'admin',
    canManageUsers: () => userRole === 'admin',
    canViewAnalytics: () => userRole === 'admin',
    
    // Current user info
    currentRole: userRole,
    roleInfo: ROLE_DESCRIPTIONS[userRole] || ROLE_DESCRIPTIONS.user
  };
};

// Helper function to check role access
const checkRoleAccess = (userRole, requiredRole) => {
  const roleHierarchy = {
    'user': 1,
    'member': 1,
    'admin': 2
  };
  
  const userLevel = roleHierarchy[userRole] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;
  
  return userLevel >= requiredLevel;
};

const styles = StyleSheet.create({
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  roleText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    position: 'absolute',
    top: 8,
    right: 8,
  },
  adminBadgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  accessDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  accessDeniedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  accessDeniedText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  accessDeniedSubtext: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});
