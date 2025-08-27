import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function InputField({ style, ...props }) {
  return (
    <TextInput 
      placeholderTextColor="#8a8a8a" 
      style={[styles.input, style]} 
      {...props} 
    />
  );
}

const styles = StyleSheet.create({
  input: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: '#e5e7eb', 
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
  }
});


