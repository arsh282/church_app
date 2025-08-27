const express = require('express');
const { body, validationResult } = require('express-validator');
const { getFirestore } = require('../config/firebase');
const auth = require('../middleware/auth');

const router = express.Router();
const db = getFirestore();

// @route   GET /api/sermons
// @desc    Get all sermons
// @access  Public
router.get('/', async (req, res) => {
  try {
    const sermonsSnapshot = await db.collection('sermons')
      .orderBy('date', 'desc')
      .get();

    const sermons = [];
    sermonsSnapshot.forEach(doc => {
      sermons.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(sermons);
  } catch (error) {
    console.error('Get sermons error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/sermons
// @desc    Create a new sermon
// @access  Private (Admin only)
router.post('/', [
  auth,
  body('title', 'Title is required').notEmpty(),
  body('preacher', 'Preacher is required').notEmpty(),
  body('date', 'Date is required').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { title, preacher, date, description, audioUrl, videoUrl, notes } = req.body;

    const sermon = {
      title,
      preacher,
      date: new Date(date),
      description: description || null,
      audioUrl: audioUrl || null,
      videoUrl: videoUrl || null,
      notes: notes || null,
      createdBy: req.user.id,
      createdAt: new Date()
    };

    const sermonRef = await db.collection('sermons').add(sermon);
    const sermonDoc = await sermonRef.get();

    res.json({
      id: sermonDoc.id,
      ...sermonDoc.data()
    });
  } catch (error) {
    console.error('Create sermon error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
