import React from 'react';
import { StyleSheet, View } from 'react-native';

export const MegaphoneIcon = ({ size = 60, color = '#FF6B35' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View style={[styles.megaphone, { backgroundColor: color }]}>
      <View style={styles.megaphoneHandle} />
      <View style={styles.megaphoneOpening} />
    </View>
  </View>
);

export const CalendarIcon = ({ size = 60, color = '#4ECDC4' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View style={[styles.calendar, { backgroundColor: color }]}>
      <View style={styles.calendarHeader} />
      <View style={styles.calendarBody} />
      <View style={styles.calendarDates}>
        <View style={styles.dateRow}>
          <View style={styles.date} />
          <View style={styles.date} />
          <View style={styles.date} />
        </View>
        <View style={styles.dateRow}>
          <View style={styles.date} />
          <View style={styles.date} />
          <View style={styles.date} />
        </View>
      </View>
    </View>
  </View>
);

export const SermonIcon = ({ size = 60, color = '#45B7D1' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View style={[styles.sermon, { backgroundColor: color }]}>
      <View style={styles.playButton}>
        <View style={styles.playTriangle} />
      </View>
      <View style={styles.sermonWaves}>
        <View style={styles.wave} />
        <View style={styles.wave} />
        <View style={styles.wave} />
      </View>
    </View>
  </View>
);

export const DonationsIcon = ({ size = 60, color = '#96CEB4' }) => (
  <View style={[styles.container, { width: size, height: size }]}>
    <View style={styles.donations}>
      <View style={[styles.hands, { backgroundColor: color }]}>
        <View style={styles.handLeft} />
        <View style={styles.handRight} />
      </View>
      <View style={styles.coins}>
        <View style={[styles.coin, { backgroundColor: '#FFD700' }]} />
        <View style={[styles.coin, { backgroundColor: '#FFD700' }]} />
        <View style={[styles.coin, { backgroundColor: '#FFD700' }]} />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Megaphone Icon
  megaphone: {
    width: 40,
    height: 30,
    borderRadius: 20,
    position: 'relative',
  },
  megaphoneHandle: {
    position: 'absolute',
    left: -8,
    top: 8,
    width: 6,
    height: 14,
    backgroundColor: '#FF6B35',
    borderRadius: 3,
  },
  megaphoneOpening: {
    position: 'absolute',
    right: -5,
    top: 5,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: '#FF6B35',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  // Calendar Icon
  calendar: {
    width: 45,
    height: 35,
    borderRadius: 8,
    position: 'relative',
  },
  calendarHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  calendarBody: {
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  calendarDates: {
    position: 'absolute',
    top: 12,
    left: 4,
    right: 4,
    bottom: 4,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  date: {
    width: 6,
    height: 6,
    backgroundColor: '#4ECDC4',
    borderRadius: 3,
  },
  // Sermon Icon
  sermon: {
    width: 50,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playButton: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderLeftColor: '#45B7D1',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 2,
  },
  sermonWaves: {
    position: 'absolute',
    bottom: -5,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wave: {
    width: 3,
    height: 8,
    backgroundColor: '#45B7D1',
    borderRadius: 2,
    marginHorizontal: 1,
  },
  // Donations Icon
  donations: {
    width: 50,
    height: 40,
    position: 'relative',
  },
  hands: {
    width: 40,
    height: 25,
    borderRadius: 20,
    position: 'relative',
  },
  handLeft: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 18,
    height: 20,
    borderRadius: 9,
  },
  handRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 18,
    height: 20,
    borderRadius: 9,
  },
  coins: {
    position: 'absolute',
    top: -5,
    left: 15,
    flexDirection: 'row',
  },
  coin: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
  },
});
