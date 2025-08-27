import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function EventsCalendarScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const events = [
    {
      id: 1,
      title: 'Sunday Service',
      date: '2024-03-10',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      type: 'service'
    },
    {
      id: 2,
      title: 'Youth Group Meeting',
      date: '2024-03-12',
      time: '6:00 PM',
      location: 'Youth Hall',
      type: 'youth'
    },
    {
      id: 3,
      title: 'Bible Study',
      date: '2024-03-14',
      time: '7:00 PM',
      location: 'Conference Room',
      type: 'study'
    },
    {
      id: 4,
      title: 'Community Outreach',
      date: '2024-03-16',
      time: '9:00 AM',
      location: 'City Center',
      type: 'outreach'
    }
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Add empty days for padding
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const hasEvent = (date) => {
    return getEventsForDate(date).length > 0;
  };

  const renderCalendarDay = (date, index) => {
    if (!date) {
      return <View key={index} style={styles.emptyDay} />;
    }

    const dayEvents = getEventsForDate(date);
    const isCurrentDay = isToday(date);
    const isCurrentSelected = isSelected(date);
    const hasEvents = dayEvents.length > 0;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.calendarDay,
          isCurrentDay && styles.today,
          isCurrentSelected && styles.selectedDay,
          hasEvents && styles.hasEvent
        ]}
        onPress={() => setSelectedDate(date)}
      >
        <Text style={[
          styles.dayText,
          isCurrentDay && styles.todayText,
          isCurrentSelected && styles.selectedDayText
        ]}>
          {date.getDate()}
        </Text>
        {hasEvents && (
          <View style={styles.eventIndicator} />
        )}
      </TouchableOpacity>
    );
  };

  const renderEventItem = (event) => (
    <TouchableOpacity
      key={event.id}
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetails', { event })}
      activeOpacity={0.8}
    >
      <View style={styles.eventTimeContainer}>
        <Text style={styles.eventTime}>{event.time}</Text>
      </View>
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventLocation}>{event.location}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  const days = getDaysInMonth(currentMonth);
  const selectedDateEvents = getEventsForDate(selectedDate);

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
        <Text style={styles.headerTitle}>Events Calendar</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Month Navigation */}
        <View style={styles.monthNavigation}>
          <TouchableOpacity 
            style={styles.monthButton}
            onPress={() => {
              const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
              setCurrentMonth(newMonth);
            }}
          >
            <Ionicons name="chevron-back" size={24} color="#6699CC" />
          </TouchableOpacity>
          
          <Text style={styles.monthTitle}>
            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
          
          <TouchableOpacity 
            style={styles.monthButton}
            onPress={() => {
              const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
              setCurrentMonth(newMonth);
            }}
          >
            <Ionicons name="chevron-forward" size={24} color="#6699CC" />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarContainer}>
          {/* Day Headers */}
          <View style={styles.dayHeaders}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <Text key={day} style={styles.dayHeader}>{day}</Text>
            ))}
          </View>
          
          {/* Calendar Days */}
          <View style={styles.calendarGrid}>
            {days.map((date, index) => renderCalendarDay(date, index))}
          </View>
        </View>

        {/* Selected Date Info */}
        <View style={styles.selectedDateInfo}>
          <Text style={styles.selectedDateTitle}>{formatDate(selectedDate)}</Text>
          <Text style={styles.selectedDateSubtitle}>
            {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''} scheduled
          </Text>
        </View>

        {/* Events for Selected Date */}
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.eventsList}>
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map(renderEventItem)
            ) : (
              <View style={styles.noEvents}>
                <Ionicons name="calendar-outline" size={48} color="#999" />
                <Text style={styles.noEventsText}>No events scheduled for this date</Text>
              </View>
            )}
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
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  monthButton: {
    padding: 10,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  dayHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: (width - 80) / 7,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 8,
    position: 'relative',
  },
  emptyDay: {
    width: (width - 80) / 7,
    height: 45,
  },
  dayText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  today: {
    backgroundColor: '#FFCC00',
  },
  todayText: {
    color: '#333',
    fontWeight: '700',
  },
  selectedDay: {
    backgroundColor: '#6699CC',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: '700',
  },
  hasEvent: {
    borderWidth: 2,
    borderColor: '#FFCC00',
  },
  eventIndicator: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFCC00',
  },
  selectedDateInfo: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedDateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  selectedDateSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  eventsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  eventsList: {
    gap: 12,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  eventTimeContainer: {
    backgroundColor: '#6699CC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 15,
  },
  eventTime: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#999',
  },
  noEvents: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  noEventsText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
  },
});


