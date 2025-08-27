module.exports = {
  expo: {
    name: 'ConnectFaith',
    slug: 'connectfaith-app',
    scheme: 'connectfaith',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: { 
      image: './assets/splash.png', 
      resizeMode: 'contain', 
      backgroundColor: '#6699CC' 
    },
    assetBundlePatterns: ['**/*'],
    ios: { 
      supportsTablet: true, 
      bundleIdentifier: 'com.connectfaith.app',
      infoPlist: {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true
        }
      }
    },
    android: { 
      package: 'com.connectfaith.app',
      permissions: [
        'android.permission.ACCESS_NETWORK_STATE',
        'android.permission.INTERNET'
      ]
    },
    plugins: [
      'expo-notifications',
      '@react-native-community/datetimepicker'
    ],
    extra: {
      firebase: {
        apiKey: "AIzaSyDrgokfc1x-SY0zLSwQBGHebBTzRbKuupk",
        authDomain: "connectfaith-1e009.firebaseapp.com",
        projectId: "connectfaith-1e009",
        storageBucket: "connectfaith-1e009.firebasestorage.app",
        messagingSenderId: "652950877900",
        appId: "1:652950877900:web:7f7a6c666d0fa6fa22b469",
        measurementId: "G-DVW7PC6NJW"
      },
    },
  },
};


