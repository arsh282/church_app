const express = require('express');
const { body, validationResult } = require('express-validator');
const { getFirestore } = require('../config/firebase');
const auth = require('../middleware/auth');

const router = express.Router();
const db = getFirestore();

// @route   GET /api/events
// @desc    Get all events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const eventsSnapshot = await db.collection('events')
      .orderBy('date', 'asc')
      .get();

    const events = [];
    eventsSnapshot.forEach(doc => {
      events.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const eventDoc = await db.collection('events').doc(req.params.id).get();
    
    if (!eventDoc.exists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      id: eventDoc.id,
      ...eventDoc.data()
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Admin only)
router.post('/', [
  auth,
  body('title', 'Title is required').notEmpty(),
  body('description', 'Description is required').notEmpty(),
  body('date', 'Date is required').notEmpty(),
  body('location', 'Location is required').notEmpty()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { title, description, date, location, imageUrl, maxAttendees } = req.body;

    const newEvent = {
      title,
      description,
      date: new Date(date),
      location,
      imageUrl: imageUrl || null,
      maxAttendees: maxAttendees || null,
      attendees: [],
      createdBy: req.user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const eventRef = await db.collection('events').add(newEvent);
    const eventDoc = await eventRef.get();

    res.json({
      id: eventDoc.id,
      ...eventDoc.data()
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Private (Admin only)
router.put('/:id', [
  auth,
  body('title', 'Title is required').notEmpty(),
  body('description', 'Description is required').notEmpty(),
  body('date', 'Date is required').notEmpty(),
  body('location', 'Location is required').notEmpty()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { title, description, date, location, imageUrl, maxAttendees } = req.body;

    const updateData = {
      title,
      description,
      date: new Date(date),
      location,
      imageUrl: imageUrl || null,
      maxAttendees: maxAttendees || null,
      updatedAt: new Date()
    };

    await db.collection('events').doc(req.params.id).update(updateData);
    
    const eventDoc = await db.collection('events').doc(req.params.id).get();
    
    res.json({
      id: eventDoc.id,
      ...eventDoc.data()
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Private (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    await db.collection('events').doc(req.params.id).delete();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/events/:id/register
// @desc    Register for an event
// @access  Private
router.post('/:id/register', auth, async (req, res) => {
  try {
    const eventRef = db.collection('events').doc(req.params.id);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const eventData = eventDoc.data();
    
    // Check if user is already registered
    if (eventData.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Check if event is full
    if (eventData.maxAttendees && eventData.attendees.length >= eventData.maxAttendees) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Add user to attendees
    await eventRef.update({
      attendees: [...eventData.attendees, req.user.id]
    });

    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/events/:id/register
// @desc    Unregister from an event
// @access  Private
router.delete('/:id/register', auth, async (req, res) => {
  try {
    const eventRef = db.collection('events').doc(req.params.id);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const eventData = eventDoc.data();
    
    // Remove user from attendees
    const updatedAttendees = eventData.attendees.filter(id => id !== req.user.id);
    
    await eventRef.update({
      attendees: updatedAttendees
    });

    res.json({ message: 'Successfully unregistered from event' });
  } catch (error) {
    console.error('Event unregistration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
