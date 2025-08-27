import React from 'react';
import { CustomAuthProvider } from './src/context/CustomAuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <CustomAuthProvider>
      <AppNavigator />
    </CustomAuthProvider>
  );
}


