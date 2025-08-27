import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
export default function ButtonPrimary({ title, onPress, disabled }) {
  return (
    <TouchableOpacity style={[styles.btn, disabled && { opacity: 0.6 }]} onPress={onPress} disabled={disabled}>
      <Text style={styles.txt}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn: { backgroundColor: '#5b8ad6', padding: 14, borderRadius: 10, alignItems: 'center', marginVertical: 6 },
  txt: { color: '#fff', fontWeight: '600', fontSize: 16 }
});


