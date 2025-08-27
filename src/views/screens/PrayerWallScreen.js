import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function PrayerWallScreen({ navigation }) {
  const [prayerText, setPrayerText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [prayers, setPrayers] = useState([
    {
      id: 1,
      text: "Praying for healing and strength for my friend going through a tough time with their health. May they feel comforted and recover quickly.",
      author: "Sarah P.",
      isAnonymous: false,
      prayerCount: 15,
      hasPrayed: false,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      text: "Please pray for my family as we navigate some difficult decisions. We need wisdom and guidance from above.",
      author: "Anonymous",
      isAnonymous: true,
      prayerCount: 8,
      hasPrayed: true,
      timestamp: "1 day ago"
    },
    {
      id: 3,
      text: "Praying for our church community to grow stronger in faith and love. May we be a light to those around us.",
      author: "Pastor John",
      isAnonymous: false,
      prayerCount: 23,
      hasPrayed: false,
      timestamp: "3 days ago"
    }
  ]);

  const handleSubmitPrayer = () => {
    if (!prayerText.trim()) {
      return;
    }

    const newPrayer = {
      id: Date.now(),
      text: prayerText,
      author: isAnonymous ? "Anonymous" : "You",
      isAnonymous: isAnonymous,
      prayerCount: 0,
      hasPrayed: false,
      timestamp: "Just now"
    };

    setPrayers([newPrayer, ...prayers]);
    setPrayerText('');
    setIsAnonymous(false);
  };

  const handlePrayFor = (prayerId) => {
    setPrayers(prayers.map(prayer => 
      prayer.id === prayerId 
        ? { ...prayer, prayerCount: prayer.prayerCount + 1, hasPrayed: true }
        : prayer
    ));
  };

  const renderPrayerItem = (prayer) => (
    <TouchableOpacity 
      key={prayer.id}
      style={styles.prayerItem}
      onPress={() => handlePrayFor(prayer.id)}
      activeOpacity={0.8}
    >
      <Text style={styles.prayerText}>{prayer.text}</Text>
      <View style={styles.prayerFooter}>
        <Text style={styles.prayerAuthor}>— {prayer.author}</Text>
        <View style={styles.prayerActions}>
          <TouchableOpacity 
            style={[
              styles.prayButton,
              prayer.hasPrayed && styles.prayButtonActive
            ]}
            onPress={() => handlePrayFor(prayer.id)}
          >
            <Ionicons 
              name={prayer.hasPrayed ? "heart" : "heart-outline"} 
              size={20} 
              color={prayer.hasPrayed ? "#6699CC" : "#6699CC"} 
            />
            <Text style={[
              styles.prayButtonText,
              prayer.hasPrayed && styles.prayButtonTextActive
            ]}>
              I'm praying ({prayer.prayerCount})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.prayerTimestamp}>{prayer.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6699CC" translucent />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prayer Wall</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Prayer Submission Section */}
        <View style={styles.submissionSection}>
          <Text style={styles.sectionTitle}>Share Your Prayer Request</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.prayerInput}
              placeholder="Write your prayer request here..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={prayerText}
              onChangeText={setPrayerText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.anonymousToggle}>
            <Text style={styles.toggleLabel}>Post anonymously</Text>
            <Switch
              value={isAnonymous}
              onValueChange={setIsAnonymous}
              trackColor={{ false: 'rgba(255,255,255,0.3)', true: '#FFCC00' }}
              thumbColor={isAnonymous ? '#fff' : '#fff'}
            />
          </View>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmitPrayer}
            disabled={!prayerText.trim()}
          >
            <Text style={styles.submitButtonText}>Submit Prayer Request</Text>
          </TouchableOpacity>
        </View>

        {/* Prayer List */}
        <View style={styles.prayersSection}>
          <Text style={styles.sectionTitle}>Community Prayers</Text>
          <View style={styles.prayersList}>
            {prayers.map(renderPrayerItem)}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    backgroundColor: '#6699CC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  submissionSection: {
    backgroundColor: '#6699CC',
    borderRadius: 20,
    padding: 25,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  prayerInput: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    padding: 20,
    fontSize: 18,
    color: '#fff',
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  anonymousToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  toggleLabel: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#FFCC00',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonText: {
    color: '#333',
    fontSize: 20,
    fontWeight: '700',
  },
  prayersSection: {
    marginBottom: 30,
  },
  prayersList: {
    gap: 20,
  },
  prayerItem: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  prayerText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 28,
    marginBottom: 15,
  },
  prayerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  prayerAuthor: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  prayerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  prayButtonActive: {
    backgroundColor: '#6699CC',
    borderColor: '#6699CC',
  },
  prayButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  prayButtonTextActive: {
    color: '#fff',
  },
  prayerTimestamp: {
    fontSize: 14,
    color: '#999',
    textAlign: 'right',
    marginTop: 10,
  },
});


