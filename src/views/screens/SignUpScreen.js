import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../../context/CustomAuthContext';
import { getPasswordRequirements, validateEmail, validatePassword } from '../../utils/passwordValidation';

const SignUpScreen = ({ navigation }) => {
  const { register } = useAuth();
  
  // Personal Information
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Address Information
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  // Account Information
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [zone, setZone] = useState('');

  // UI States
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  // Country and region options
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Spain', 'Italy', 'Japan', 'China', 'India', 'Brazil', 'Mexico', 'Argentina', 'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'Morocco', 'Tunisia'
  ];

  // Zone options
  const zones = [
    'Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E', 'Zone F', 'Zone G', 'Zone H', 'Zone I', 'Zone J',
    'North Zone', 'South Zone', 'East Zone', 'West Zone', 'Central Zone',
    'Downtown Zone', 'Suburban Zone', 'Rural Zone', 'Urban Zone'
  ];

  const regions = {
    'United States': ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
    'Canada': ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory'],
    'Germany': ['Baden-Württemberg', 'Bavaria', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg', 'Hesse', 'Lower Saxony', 'Mecklenburg-Vorpommern', 'North Rhine-Westphalia', 'Rhineland-Palatinate', 'Saarland', 'Saxony', 'Saxony-Anhalt', 'Schleswig-Holstein', 'Thuringia'],
    'France': ['Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne', 'Centre-Val de Loire', 'Corse', 'Grand Est', 'Hauts-de-France', 'Île-de-France', 'Normandie', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Côte d\'Azur'],
    'Spain': ['Andalucía', 'Aragón', 'Asturias', 'Cantabria', 'Castilla-La Mancha', 'Castilla y León', 'Cataluña', 'Extremadura', 'Galicia', 'Islas Baleares', 'Islas Canarias', 'La Rioja', 'Madrid', 'Murcia', 'Navarra', 'País Vasco', 'Valencia'],
    'Italy': ['Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche', 'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia', 'Toscana', 'Trentino-Alto Adige', 'Umbria', 'Valle d\'Aosta', 'Veneto'],
    'Japan': ['Hokkaido', 'Tohoku', 'Kanto', 'Chubu', 'Kansai', 'Chugoku', 'Shikoku', 'Kyushu'],
    'China': ['Beijing', 'Tianjin', 'Hebei', 'Shanxi', 'Inner Mongolia', 'Liaoning', 'Jilin', 'Heilongjiang', 'Shanghai', 'Jiangsu', 'Zhejiang', 'Anhui', 'Fujian', 'Jiangxi', 'Shandong', 'Henan', 'Hubei', 'Hunan', 'Guangdong', 'Guangxi', 'Hainan', 'Chongqing', 'Sichuan', 'Guizhou', 'Yunnan', 'Tibet', 'Shaanxi', 'Gansu', 'Qinghai', 'Ningxia', 'Xinjiang', 'Hong Kong', 'Macau', 'Taiwan'],
    'India': ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'],
    'Brazil': ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'],
    'Mexico': ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima', 'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'],
    'Argentina': ['Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Ciudad Autónoma de Buenos Aires', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán'],
    'South Africa': ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'],
    'Nigeria': ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Federal Capital Territory', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'],
    'Kenya': ['Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo Marakwet', 'Embu', 'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera', 'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi', 'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita Taveta', 'Tana River', 'Tharaka Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'],
    'Egypt': ['Alexandria', 'Aswan', 'Asyut', 'Beheira', 'Beni Suef', 'Cairo', 'Dakahlia', 'Damietta', 'Faiyum', 'Gharbia', 'Giza', 'Ismailia', 'Kafr El Sheikh', 'Luxor', 'Matruh', 'Minya', 'Monufia', 'New Valley', 'North Sinai', 'Port Said', 'Qalyubia', 'Qena', 'Red Sea', 'Sharqia', 'Sohag', 'South Sinai', 'Suez'],
    'Morocco': ['Agadir-Ida Ou Tanane', 'Al Haouz', 'Al Hoceima', 'Assa-Zag', 'Azilal', 'Béni Mellal', 'Béni Mellal-Khénifra', 'Berkane', 'Berrechid', 'Boujdour', 'Boulemane', 'Casablanca-Settat', 'Chefchaouen', 'Chichaoua', 'Chtouka-Ait Baha', 'Dakhla-Oued Ed-Dahab', 'El Hajeb', 'El Jadida', 'El Kelaa des Sraghna', 'Errachidia', 'Es Semara', 'Essaouira', 'Fahs-Anjra', 'Fès-Meknès', 'Figuig', 'Fquih Ben Salah', 'Guelmim-Oued Noun', 'Ifrane', 'Inezgane-Ait Melloul', 'Jerada', 'Kénitra', 'Khemisset', 'Khenifra', 'Khouribga', 'Laâyoune-Sakia El Hamra', 'Larache', 'Marrakech-Safi', 'Médiouna', 'Meknès', 'Midelt', 'Mohammedia', 'Moulay Yacoub', 'Nador', 'Nouaceur', 'Ouarzazate', 'Oued Ed-Dahab-Lagouira', 'Oujda-Angad', 'Ouezzane', 'Rabat-Salé-Kénitra', 'Rehamna', 'Safi', 'Salé', 'Sefrou', 'Settat', 'Sidi Bennour', 'Sidi Ifni', 'Sidi Kacem', 'Sidi Slimane', 'Skhirate-Témara', 'Tanger-Tétouan-Al Hoceima', 'Tan-Tan', 'Taounate', 'Taourirt', 'Taroudannt', 'Tata', 'Taza', 'Tétouan', 'Tiflet', 'Tinghir', 'Tiznit', 'Youssoufia', 'Zagora'],
    'Tunisia': ['Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili', 'Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan']
  };



  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!street1.trim()) newErrors.street1 = 'Street address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!region.trim()) newErrors.region = 'Region/State is required';
    if (!postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!country.trim()) newErrors.country = 'Country is required';
    if (!zone.trim()) newErrors.zone = 'Zone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0]; // Show first error
      }
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    return validateEmail(email);
  };

  const isValidPhone = (phone) => {
    return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''));
  };

  // Get password strength and requirements
  const passwordValidation = validatePassword(password);
  const passwordStrength = passwordValidation.strength;
  const requirements = getPasswordRequirements(password);

  // Date picker handlers
  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const hideDatePickerModal = () => {
    setShowDatePicker(false);
  };

  const handleDateChange = (event, selectedDate) => {
    hideDatePickerModal();
    if (selectedDate) {
      setDateOfBirth(selectedDate);
      setErrors(prev => ({ ...prev, dateOfBirth: null }));
    }
  };

  // Navigation between steps
  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Registration handler
  const handleSignUp = async () => {
    if (!validateStep3()) return;

    setLoading(true);
    try {
      const userData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        middleName: middleName.trim() || null,
        email: email.trim().toLowerCase(),
        phoneNumber: phoneNumber.trim() || null,
        DOB: dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : null,
        street1: street1.trim(),
        street2: street2.trim() || null,
        city: city.trim(),
        region: region.trim(),
        postalCode: postalCode.trim(),
        country: country.trim(),
        zone: zone.trim(),
        role: 'Member', // Default role
        password: password
      };

      const result = await register(userData);

      if (result.success) {
        // User is automatically logged in and redirected by AppNavigator
        // No need for manual navigation or alert
        console.log('✅ SignUpScreen: Registration successful, user automatically logged in');
        console.log('✅ SignUpScreen: Result data:', result.data);
      } else {
        console.log('❌ SignUpScreen: Registration failed:', result.error);
        Alert.alert('Registration Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render step content
  const renderStep1 = () => (
    <View>
      <Text style={styles.stepTitle}>Personal Information</Text>
      
      <TextInput
        style={[styles.input, errors.firstName && styles.inputError]}
        placeholder="First Name *"
        placeholderTextColor="#999"
        value={firstName}
        onChangeText={(text) => {
          setFirstName(text);
          setErrors(prev => ({ ...prev, firstName: null }));
        }}
        autoCapitalize="words"
        autoCorrect={false}
      />
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Middle Name (Optional)"
        placeholderTextColor="#999"
        value={middleName}
        onChangeText={setMiddleName}
        autoCapitalize="words"
        autoCorrect={false}
      />

      <TextInput
        style={[styles.input, errors.lastName && styles.inputError]}
        placeholder="Last Name *"
        placeholderTextColor="#999"
        value={lastName}
        onChangeText={(text) => {
          setLastName(text);
          setErrors(prev => ({ ...prev, lastName: null }));
        }}
        autoCapitalize="words"
        autoCorrect={false}
      />
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email Address *"
        placeholderTextColor="#999"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors(prev => ({ ...prev, email: null }));
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Phone Number (Optional)"
        placeholderTextColor="#999"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={[styles.datePickerButton, errors.dateOfBirth && styles.inputError]}
        onPress={showDatePickerModal}
      >
        <Text style={[styles.datePickerText, !dateOfBirth && { color: '#999' }]}>
          {dateOfBirth ? dateOfBirth.toLocaleDateString() : 'Date of Birth *'}
        </Text>
      </TouchableOpacity>
      {errors.dateOfBirth && <Text style={styles.errorText}>{errors.dateOfBirth}</Text>}
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text style={styles.stepTitle}>Address Information</Text>
      
      <TextInput
        style={[styles.input, errors.street1 && styles.inputError]}
        placeholder="Street Address *"
        placeholderTextColor="#999"
        value={street1}
        onChangeText={(text) => {
          setStreet1(text);
          setErrors(prev => ({ ...prev, street1: null }));
        }}
        autoCapitalize="words"
        autoCorrect={false}
      />
      {errors.street1 && <Text style={styles.errorText}>{errors.street1}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Street Address 2 (Optional)"
        placeholderTextColor="#999"
        value={street2}
        onChangeText={setStreet2}
        autoCapitalize="words"
        autoCorrect={false}
      />

      <TextInput
        style={[styles.input, errors.city && styles.inputError]}
        placeholder="City *"
        placeholderTextColor="#999"
        value={city}
        onChangeText={(text) => {
          setCity(text);
          setErrors(prev => ({ ...prev, city: null }));
        }}
        autoCapitalize="words"
        autoCorrect={false}
      />
      {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

      <Picker
        selectedValue={country}
        onValueChange={(itemValue) => {
          setCountry(itemValue);
          setRegion(''); // Reset region when country changes
          setErrors(prev => ({ ...prev, country: null }));
        }}
        style={[styles.input, errors.country && styles.inputError]}
      >
        <Picker.Item label="Select Country *" value="" />
        {countries.map((countryName) => (
          <Picker.Item key={countryName} label={countryName} value={countryName} />
        ))}
      </Picker>
      {errors.country && <Text style={styles.errorText}>{errors.country}</Text>}

      {country && regions[country] && (
        <Picker
          selectedValue={region}
          onValueChange={(itemValue) => {
            setRegion(itemValue);
            setErrors(prev => ({ ...prev, region: null }));
          }}
          style={[styles.input, errors.region && styles.inputError]}
        >
          <Picker.Item label="Select Region/State *" value="" />
          {regions[country].map((regionName) => (
            <Picker.Item key={regionName} label={regionName} value={regionName} />
          ))}
        </Picker>
      )}
      {errors.region && <Text style={styles.errorText}>{errors.region}</Text>}

      <TextInput
        style={[styles.input, errors.postalCode && styles.inputError]}
        placeholder="Postal Code *"
        placeholderTextColor="#999"
        value={postalCode}
        onChangeText={(text) => {
          setPostalCode(text);
          setErrors(prev => ({ ...prev, postalCode: null }));
        }}
        autoCapitalize="characters"
        autoCorrect={false}
      />
      {errors.postalCode && <Text style={styles.errorText}>{errors.postalCode}</Text>}

      <Picker
        selectedValue={zone}
        onValueChange={(itemValue) => {
          setZone(itemValue);
          setErrors(prev => ({ ...prev, zone: null }));
        }}
        style={[styles.input, errors.zone && styles.inputError]}
      >
        <Picker.Item label="Select Zone *" value="" />
        {zones.map((zoneName) => (
          <Picker.Item key={zoneName} label={zoneName} value={zoneName} />
        ))}
      </Picker>
      {errors.zone && <Text style={styles.errorText}>{errors.zone}</Text>}
    </View>
  );

  const renderStep3 = () => (
    <View>
      <Text style={styles.stepTitle}>Account Security</Text>
      
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Password *"
        placeholderTextColor="#999"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors(prev => ({ ...prev, password: null }));
        }}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      
      {/* Password Strength Indicator */}
      {password && (
        <View style={styles.passwordStrengthContainer}>
          <View style={styles.strengthBar}>
            <View 
              style={[
                styles.strengthFill, 
                { 
                  width: `${(passwordStrength.score / 5) * 100}%`,
                  backgroundColor: passwordStrength.color 
                }
              ]} 
            />
          </View>
          <Text style={[styles.strengthText, { color: passwordStrength.color }]}>
            {passwordStrength.label}
          </Text>
        </View>
      )}
      
      {/* Password Requirements */}
      <View style={styles.requirementsContainer}>
        <Text style={styles.requirementsTitle}>Password Requirements:</Text>
        <Text style={[styles.requirement, requirements.length && styles.requirementMet]}>
          • At least 8 characters long
        </Text>
        <Text style={[styles.requirement, requirements.lowercase && styles.requirementMet]}>
          • At least one lowercase letter
        </Text>
        <Text style={[styles.requirement, requirements.uppercase && styles.requirementMet]}>
          • At least one uppercase letter
        </Text>
        <Text style={[styles.requirement, requirements.number && styles.requirementMet]}>
          • At least one number
        </Text>
        <Text style={[styles.requirement, requirements.special && styles.requirementMet]}>
          • At least one special character
        </Text>
      </View>

      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        placeholder="Confirm Password *"
        placeholderTextColor="#999"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setErrors(prev => ({ ...prev, confirmPassword: null }));
        }}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6699CC" />
      
      <Image
        source={require('../../../assets/images/church-building-1.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <LinearGradient
        colors={['rgba(25, 118, 210, 0.6)', 'rgba(21, 101, 192, 0.8)']}
        style={styles.overlay}
      >
        <View style={styles.content}>
          {/* Create Account Message */}
          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountTitle}>Create Account</Text>
            <Text style={styles.createAccountSubtitle}>Join our church community</Text>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(currentStep / 3) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>Step {currentStep} of 3</Text>
          </View>

          {/* Form Container */}
          <ScrollView 
            style={styles.formContainer} 
            contentContainerStyle={styles.formContentContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >


            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <View style={styles.buttonContainer}>
              {currentStep > 1 && (
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={prevStep}
                  disabled={loading}
                >
                  <Text style={styles.secondaryButtonText}>Previous</Text>
                </TouchableOpacity>
              )}

              {currentStep < 3 ? (
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={nextStep}
                  disabled={loading}
                >
                  <Text style={styles.primaryButtonText}>Next</Text>
                </TouchableOpacity>
              ) : (
            <TouchableOpacity
                  style={styles.primaryButton}
              onPress={handleSignUp}
              disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.primaryButtonText}>Create Account</Text>
                )}
            </TouchableOpacity>
              )}
          </View>
          </ScrollView>

          {/* Back to Login */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
          
          {/* Spacer */}
          <View style={styles.spacer} />
        </View>
      </LinearGradient>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date of Birth</Text>
              <TouchableOpacity onPress={hideDatePickerModal}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={dateOfBirth || new Date()}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              maximumDate={new Date()}
              minimumDate={new Date(1900, 0, 1)}
            />
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
  createAccountContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 15,
  },
  createAccountTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  createAccountSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFCC00',
    borderRadius: 2,
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    maxHeight: '70%',
  },
  formContentContainer: {
    padding: 25,
    paddingBottom: 35,
  },

  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6699CC',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputError: {
    borderColor: '#ff6b6b',
    borderWidth: 2,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    marginLeft: 4,
  },
  datePickerButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#6699CC',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6699CC',
  },
  secondaryButtonText: {
    color: '#6699CC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 'auto',
    paddingBottom: 20,
  },
  spacer: {
    height: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
  },
  loginLink: {
    color: '#FFCC00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6699CC',
  },
  modalClose: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
  // Password strength indicator styles
  passwordStrengthContainer: {
    marginTop: 8,
    marginBottom: 12,
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 4,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  requirementsContainer: {
    marginTop: 8,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  requirementsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 6,
  },
  requirement: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  requirementMet: {
    color: '#00AA00',
    fontWeight: '500',
  },
});

export default SignUpScreen;