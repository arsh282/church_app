import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/CustomAuthContext';

const AdminLoginHelper = () => {
  const { login } = useAuth();

  const adminCredentials = {
    email: 'admin@admin.connectfaith.com',
    password: 'admin123456'
  };

  const handleAdminLogin = async () => {
    try {
      console.log('🔐 Testing admin login with:', adminCredentials.email);
      
      const result = await login(adminCredentials.email, adminCredentials.password);
      
      if (result.success) {
        Alert.alert('Success', 'Admin login successful!');
        console.log('✅ Admin login successful');
      } else {
        Alert.alert('Error', `Admin login failed: ${result.error}`);
        console.log('❌ Admin login failed:', result.error);
      }
    } catch (error) {
      Alert.alert('Error', `Login error: ${error.message}`);
      console.log('❌ Admin login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Admin Login Helper</Text>
      <Text style={styles.subtitle}>For testing admin functionality</Text>
      
      <View style={styles.credentialsContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{adminCredentials.email}</Text>
        
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.value}>{adminCredentials.password}</Text>
      </View>
      
      <TouchableOpacity style={styles.loginButton} onPress={handleAdminLogin}>
        <Text style={styles.loginButtonText}>Test Admin Login</Text>
      </TouchableOpacity>
      
      <Text style={styles.note}>
        💡 This helper is for development/testing only. 
        Remove in production.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 15,
  },
  credentialsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: '#212529',
    marginBottom: 10,
    fontFamily: 'monospace',
  },
  loginButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#6c757d',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default AdminLoginHelper;
