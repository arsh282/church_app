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
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function EventDetailsScreen({ navigation, route }) {
  const { event } = route.params || {
    id: 1,
    title: 'Sunday Service',
    date: '2024-03-10',
    time: '10:00 AM',
    location: 'Main Sanctuary',
    type: 'service',
    description: 'Join us for our weekly Sunday service featuring inspiring worship, powerful preaching, and fellowship with our church family. This week, Pastor John will be sharing a message about "Walking in Faith Through Difficult Times."',
    image: require('../../../assets/images/events-placeholder.png'),
    attendees: 45,
    maxAttendees: 100,
    isRSVP: false,
    needsVolunteers: true,
    volunteerRoles: ['Greeters', 'Ushers', 'Children\'s Ministry', 'Sound Team']
  };

  const [isRSVP, setIsRSVP] = useState(event.isRSVP);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'service': return '#6699CC';
      case 'youth': return '#FFCC00';
      case 'study': return '#6699CC';
      case 'outreach': return '#FFCC00';
      default: return '#6699CC';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'service': return 'church';
      case 'youth': return 'people';
      case 'study': return 'book';
      case 'outreach': return 'heart';
      default: return 'calendar';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleRSVP = () => {
    setIsRSVP(!isRSVP);
  };

  const handleVolunteer = () => {
    setShowVolunteerModal(true);
  };

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
        <Text style={styles.headerTitle}>Event Details</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroSection}>
          <Image 
            source={event.image}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay} />
          <View style={styles.eventTypeBadge}>
            <Ionicons name={getEventTypeIcon(event.type)} size={16} color="#fff" />
            <Text style={styles.eventTypeText}>{event.type.toUpperCase()}</Text>
          </View>
        </View>

        {/* Event Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.eventTitle}>{event.title}</Text>
          
          <View style={styles.eventMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar" size={20} color="#6699CC" />
              <Text style={styles.metaText}>{formatDate(event.date)}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time" size={20} color="#6699CC" />
              <Text style={styles.metaText}>{event.time}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location" size={20} color="#6699CC" />
              <Text style={styles.metaText}>{event.location}</Text>
            </View>
          </View>

          <Text style={styles.description}>{event.description}</Text>

          {/* Attendance */}
          <View style={styles.attendanceSection}>
            <Text style={styles.sectionTitle}>Attendance</Text>
            <View style={styles.attendanceBar}>
              <View style={styles.attendanceProgress}>
                <View 
                  style={[
                    styles.attendanceFill, 
                    { width: `${(event.attendees / event.maxAttendees) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.attendanceText}>
                {event.attendees} of {event.maxAttendees} spots filled
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[
              styles.actionButton,
              styles.rsvpButton,
              isRSVP && styles.rsvpButtonActive
            ]}
            onPress={handleRSVP}
          >
            <Ionicons 
              name={isRSVP ? "checkmark-circle" : "add-circle-outline"} 
              size={24} 
              color={isRSVP ? "#fff" : "#6699CC"} 
            />
            <Text style={[
              styles.actionButtonText,
              isRSVP && styles.actionButtonTextActive
            ]}>
              {isRSVP ? 'RSVP\'d' : 'RSVP'}
            </Text>
          </TouchableOpacity>

          {event.needsVolunteers && (
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleVolunteer}
            >
              <Ionicons name="people" size={24} color="#FFCC00" />
              <Text style={styles.actionButtonText}>Volunteer</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <Text style={styles.sectionTitle}>Additional Information</Text>
          
          <View style={styles.infoItem}>
            <Ionicons name="information-circle" size={20} color="#6699CC" />
            <Text style={styles.infoText}>
              Please arrive 10 minutes early to find parking and get settled.
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="restaurant" size={20} color="#6699CC" />
            <Text style={styles.infoText}>
              Light refreshments will be served after the event.
            </Text>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="car" size={20} color="#6699CC" />
            <Text style={styles.infoText}>
              Free parking available in the church parking lot.
            </Text>
          </View>
        </View>

        {/* Contact */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Questions?</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Ionicons name="mail" size={20} color="#6699CC" />
            <Text style={styles.contactButtonText}>Contact Event Organizer</Text>
          </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    position: 'relative',
    height: 250,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  eventTypeBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#FFCC00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  eventTypeText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  eventTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    lineHeight: 34,
  },
  eventMeta: {
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  metaText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 25,
  },
  attendanceSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  attendanceBar: {
    marginBottom: 8,
  },
  attendanceProgress: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  attendanceFill: {
    height: '100%',
    backgroundColor: '#6699CC',
    borderRadius: 4,
  },
  attendanceText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    gap: 8,
  },
  rsvpButton: {
    borderWidth: 2,
    borderColor: '#6699CC',
  },
  rsvpButtonActive: {
    backgroundColor: '#6699CC',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionButtonTextActive: {
    color: '#fff',
  },
  additionalInfo: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  contactSection: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 30,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6699CC',
  },
});


