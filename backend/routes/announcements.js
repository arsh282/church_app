const express = require('express');
const { body, validationResult } = require('express-validator');
const { getFirestore } = require('../config/firebase');
const auth = require('../middleware/auth');

const router = express.Router();
const db = getFirestore();

// @route   GET /api/announcements
// @desc    Get all announcements
// @access  Public
router.get('/', async (req, res) => {
  try {
    const announcementsSnapshot = await db.collection('announcements')
      .orderBy('createdAt', 'desc')
      .get();

    const announcements = [];
    announcementsSnapshot.forEach(doc => {
      announcements.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(announcements);
  } catch (error) {
    console.error('Get announcements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/announcements
// @desc    Create a new announcement
// @access  Private (Admin only)
router.post('/', [
  auth,
  body('title', 'Title is required').notEmpty(),
  body('content', 'Content is required').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { title, content, imageUrl } = req.body;

    const newAnnouncement = {
      title,
      content,
      imageUrl: imageUrl || null,
      createdBy: req.user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const announcementRef = await db.collection('announcements').add(newAnnouncement);
    const announcementDoc = await announcementRef.get();

    res.json({
      id: announcementDoc.id,
      ...announcementDoc.data()
    });
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
