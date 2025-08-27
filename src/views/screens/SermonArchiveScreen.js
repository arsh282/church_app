import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SermonArchiveScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  const filters = ['All', 'Audio', 'Video', 'Tags'];

  const sermons = [
    {
      id: 1,
      title: 'The Power of Forgiveness',
      speaker: 'Pastor John Smith',
      date: 'March 10, 2024',
      type: 'VIDEO',
      image: require('../../../assets/images/sermon-church-1.png'),
      icon: 'videocam'
    },
    {
      id: 2,
      title: 'Finding Peace in Chaos',
      speaker: 'Deacon Jane Doe',
      date: 'February 25, 2024',
      type: 'AUDIO',
      image: require('../../../assets/images/sermon-church-2.png'),
      icon: 'volume-high'
    },
    {
      id: 3,
      title: 'Walking in Faith',
      speaker: 'Pastor John Smith',
      date: 'February 18, 2024',
      type: 'VIDEO',
      image: require('../../../assets/images/sermon-church-3.png'),
      icon: 'videocam'
    },
    {
      id: 4,
      title: 'The Gift of Grace',
      speaker: 'Deacon Jane Doe',
      date: 'February 11, 2024',
      type: 'AUDIO',
      image: require('../../../assets/images/sermon-church-4.png'),
      icon: 'volume-high'
    }
  ];

  const renderFilterButton = (filter) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterButton,
        activeFilter === filter && styles.filterButtonActive
      ]}
      onPress={() => setActiveFilter(filter)}
    >
      <Text style={[
        styles.filterButtonText,
        activeFilter === filter && styles.filterButtonTextActive
      ]}>
        {filter}
      </Text>
    </TouchableOpacity>
  );

  const renderSermonCard = (sermon) => (
    <TouchableOpacity 
      key={sermon.id}
      style={styles.sermonCard}
      onPress={() => navigation.navigate('SermonDetails', { sermon })}
      activeOpacity={0.8}
    >
      <View style={styles.sermonImageContainer}>
        <Image 
          source={sermon.image}
          style={styles.sermonImage}
          resizeMode="cover"
        />
        <View style={styles.mediaTypeLabel}>
          <Text style={styles.mediaTypeText}>{sermon.type}</Text>
        </View>
        <View style={styles.mediaIcon}>
          <Ionicons name={sermon.icon} size={16} color="#007AFF" />
        </View>
      </View>
      <View style={styles.sermonContent}>
        <Text style={styles.sermonTitle}>{sermon.title}</Text>
        <Text style={styles.sermonMeta}>{sermon.speaker} • {sermon.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#6699CC" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sermons</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {filters.map(renderFilterButton)}
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search sermons..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        </View>

        {/* Sermon Cards */}
        <View style={styles.sermonsList}>
          {sermons.map(renderSermonCard)}
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
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
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
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: '#6699CC',
    borderColor: '#6699CC',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 45,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  sermonsList: {
    gap: 15,
  },
  sermonCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  sermonImageContainer: {
    position: 'relative',
    height: 200,
  },
  sermonImage: {
    width: '100%',
    height: '100%',
  },
  mediaTypeLabel: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#FFCC00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  mediaTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  mediaIcon: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sermonContent: {
    padding: 20,
  },
  sermonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sermonMeta: {
    fontSize: 14,
    color: '#999',
  },
});


