import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useAuth } from '../../context/CustomAuthContext';

export default function DonationsScreen({ navigation }) {
  const { user } = useAuth();
  const [amount, setAmount] = useState('0.00');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [donationType, setDonationType] = useState('one-time');

  const paymentMethods = [
    { id: 'card', name: 'Card', icon: 'card-outline', color: '#4ECDC4' },
    { id: 'bank', name: 'Bank', icon: 'business-outline', color: '#FF6B35' },
    { id: 'paypal', name: 'PayPal / Other', icon: 'wallet-outline', color: '#96CEB4' }
  ];

  const donationHistory = [
    {
      id: 1,
      fund: 'Weekly Offering',
      date: '2023-10-26',
      amount: '$50.00',
      method: 'Card'
    },
    {
      id: 2,
      fund: 'Mission Trip Fund',
      date: '2023-09-19',
      amount: '$25.00',
      method: 'Bank Transfer'
    },
    {
      id: 3,
      fund: 'Building Fund',
      date: '2023-08-05',
      amount: '$100.00',
      method: 'PayPal'
    },
    {
      id: 4,
      fund: 'Weekly Offering',
      date: '2023-07-12',
      amount: '$50.00',
      method: 'Card'
    },
    {
      id: 5,
      fund: 'Youth Program',
      date: '2023-06-30',
      amount: '$75.00',
      method: 'Card'
    }
  ];

  const handleDonate = () => {
    const numAmount = parseFloat(amount);
    if (numAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid donation amount.');
      return;
    }
    
    Alert.alert(
      'Confirm Donation',
      `Donate $${amount} using ${selectedPaymentMethod}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Donate', 
          onPress: () => {
            Alert.alert('Thank You!', 'Your donation has been processed successfully.');
            setAmount('0.00');
          }
        }
      ]
    );
  };

  const renderPaymentMethod = (method) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.paymentMethodButton,
        selectedPaymentMethod === method.id && styles.paymentMethodButtonActive
      ]}
      onPress={() => setSelectedPaymentMethod(method.id)}
    >
      <Ionicons 
        name={method.icon} 
        size={24} 
        color={selectedPaymentMethod === method.id ? '#fff' : method.color} 
      />
      <Text style={[
        styles.paymentMethodText,
        selectedPaymentMethod === method.id && styles.paymentMethodTextActive
      ]}>
        {method.name}
      </Text>
    </TouchableOpacity>
  );

  const renderDonationHistoryItem = (item) => (
    <View key={item.id} style={styles.historyItem}>
      <View style={styles.historyContent}>
        <Text style={styles.historyFund}>{item.fund}</Text>
        <Text style={styles.historyDate}>{item.date}</Text>
      </View>
      <View style={styles.historyRight}>
        <Text style={styles.historyAmount}>{item.amount}</Text>
        <Text style={styles.historyMethod}>{item.method}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Donations</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Donation Amount Input */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Donation Amount</Text>
          <View style={styles.amountInput}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountTextInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethodsGrid}>
            {paymentMethods.map(renderPaymentMethod)}
          </View>
        </View>

        {/* Donate Button */}
        <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
          <Text style={styles.donateButtonText}>Donate Now</Text>
        </TouchableOpacity>

        {/* Donation Type Tabs */}
        <View style={styles.donationTypeSection}>
          <View style={styles.typeTabs}>
            <TouchableOpacity
              style={[
                styles.typeTab,
                donationType === 'one-time' && styles.typeTabActive
              ]}
              onPress={() => setDonationType('one-time')}
            >
              <Text style={[
                styles.typeTabText,
                donationType === 'one-time' && styles.typeTabTextActive
              ]}>
                One-time
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeTab,
                donationType === 'recurring' && styles.typeTabActive
              ]}
              onPress={() => setDonationType('recurring')}
            >
              <Text style={[
                styles.typeTabText,
                donationType === 'recurring' && styles.typeTabTextActive
              ]}>
                Recurring
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Donation History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Past Donations</Text>
          <View style={styles.historyList}>
            {donationHistory.map(renderDonationHistoryItem)}
          </View>
        </View>

        {/* Generate Statement Button */}
        <TouchableOpacity style={styles.statementButton}>
          <Ionicons name="download-outline" size={24} color="#FFD700" />
          <Text style={styles.statementButtonText}>Generate Giving Statement</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  amountSection: {
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  amountTextInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  paymentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 16,
  },
  paymentMethodsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  paymentMethodButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e9ecef',
    gap: 8,
  },
  paymentMethodButtonActive: {
    backgroundColor: '#4ECDC4',
    borderColor: '#4ECDC4',
  },
  paymentMethodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  paymentMethodTextActive: {
    color: '#fff',
  },
  donateButton: {
    backgroundColor: '#4ECDC4',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  donationTypeSection: {
    marginBottom: 24,
  },
  typeTabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  typeTab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  typeTabActive: {
    backgroundColor: '#4ECDC4',
  },
  typeTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  typeTabTextActive: {
    color: '#fff',
  },
  historySection: {
    marginBottom: 24,
  },
  historyList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyContent: {
    flex: 1,
  },
  historyFund: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
    color: '#666',
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ECDC4',
    marginBottom: 4,
  },
  historyMethod: {
    fontSize: 14,
    color: '#666',
  },
  statementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    gap: 8,
  },
  statementButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
  },
});


