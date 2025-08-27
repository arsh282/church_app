import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { AuthController } from '../../controllers/AuthController';

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [zone, setZone] = useState('');
  const [loading, setLoading] = useState(false);

  const locationOptions = [
    'Downtown',
    'River Heights – Fort Garry',
    'Assiniboine South',
    'St. James – Assiniboia',
    'Seven Oaks',
    'Inkster',
    'Point Douglas',
    'Transcona',
    'Elmwood – East Kildonan',
    'River East',
    'Fort Rouge – East Fort Garry',
    'St. Boniface'
  ];

  const zoneOptions = [
    'North',
    'South',
    'East',
    'West',
    'Central'
  ];

  // Simple email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async () => {
    // Trim all input values
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedLocation = location.trim();
    const trimmedZone = zone.trim();

    if (!trimmedFullName || !trimmedEmail || !password || !confirmPassword || !trimmedLocation || !trimmedZone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      // Do not log password or sensitive info
      const result = await AuthController.register(
        trimmedEmail,
        password,
        trimmedFullName,
        trimmedLocation,
        trimmedZone
      );

      if (result.success) {
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setLocation('');
        setZone('');
        Alert.alert(
          'Success',
          'Account created successfully! Please sign in with your new credentials.',
          [
            {
              text: 'OK',
              onPress: () => {
                setTimeout(() => {
                  navigation.navigate('Login');
                }, 500);
              }
            }
          ]
        );
      } else {
        Alert.alert('Registration Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6699CC" />
      <Image
        source={require('../../../assets/images/church-building-1.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['rgba(102, 153, 204, 0.7)', 'rgba(102, 153, 204, 0.9)']}
        style={styles.overlay}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Image
                source={require('../../../assets/images/connectfaith-logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.logoText}>ConnectFaith</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.signUpTitle}>Create Account</Text>
            <Text style={styles.signUpSubtitle}>Join our church community</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              autoCorrect={false}
              maxLength={50}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={50}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={32}
            />

            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={32}
            />

            <Picker
              selectedValue={location}
              onValueChange={(itemValue) => setLocation(itemValue)}
              style={styles.input}
              dropdownIconColor="#6699CC"
            >
              <Picker.Item label="Select Location" value="" />
              {locationOptions.map((loc) => (
                <Picker.Item key={loc} label={loc} value={loc} />
              ))}
            </Picker>

            <Picker
              selectedValue={zone}
              onValueChange={(itemValue) => setZone(itemValue)}
              style={styles.input}
              dropdownIconColor="#6699CC"
            >
              <Picker.Item label="Select Zone" value="" />
              {zoneOptions.map((z) => (
                <Picker.Item key={z} label={z} value={z} />
              ))}
            </Picker>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleSignUp}
              disabled={loading}
            >
              <LinearGradient
                colors={['#6699CC', '#6699CC']}
                style={styles.buttonGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Create Account</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleBackToLogin}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 3,
    borderColor: 'rgba(255, 204, 0, 0.3)',
  },
  logo: {
    width: 60,
    height: 60,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6699CC',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  signUpTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6699CC',
    textAlign: 'center',
    marginBottom: 8,
  },
  signUpSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  continueButton: {
    borderRadius: 12,
    marginTop: 10,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
  },
  loginLink: {
    color: '#6699CC',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;