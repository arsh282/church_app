const express = require('express');
const { body, validationResult } = require('express-validator');
const { getFirestore } = require('../config/firebase');
const auth = require('../middleware/auth');

const router = express.Router();
const db = getFirestore();

// @route   GET /api/prayers
// @desc    Get all prayers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const prayersSnapshot = await db.collection('prayers')
      .orderBy('createdAt', 'desc')
      .get();

    const prayers = [];
    prayersSnapshot.forEach(doc => {
      prayers.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(prayers);
  } catch (error) {
    console.error('Get prayers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/prayers
// @desc    Create a prayer request
// @access  Private
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

    const { title, content, isAnonymous } = req.body;

    const prayer = {
      title,
      content,
      isAnonymous: isAnonymous || false,
      userId: isAnonymous ? null : req.user.id,
      prayedFor: [],
      createdAt: new Date()
    };

    const prayerRef = await db.collection('prayers').add(prayer);
    const prayerDoc = await prayerRef.get();

    res.json({
      id: prayerDoc.id,
      ...prayerDoc.data()
    });
  } catch (error) {
    console.error('Create prayer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/prayers/:id/pray
// @desc    Mark prayer as prayed for
// @access  Private
router.post('/:id/pray', auth, async (req, res) => {
  try {
    const prayerRef = db.collection('prayers').doc(req.params.id);
    const prayerDoc = await prayerRef.get();

    if (!prayerDoc.exists) {
      return res.status(404).json({ message: 'Prayer not found' });
    }

    const prayerData = prayerDoc.data();
    
    if (prayerData.prayedFor.includes(req.user.id)) {
      return res.status(400).json({ message: 'Already prayed for this request' });
    }

    await prayerRef.update({
      prayedFor: [...prayerData.prayedFor, req.user.id]
    });

    res.json({ message: 'Prayer marked as prayed for' });
  } catch (error) {
    console.error('Pray for prayer error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
