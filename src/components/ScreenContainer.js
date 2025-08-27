import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
export default function ScreenContainer({ children }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f7f9fc' },
  inner: { flex: 1, padding: 16 }
});


