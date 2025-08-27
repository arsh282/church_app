const express = require('express');
const { body, validationResult } = require('express-validator');
const { getFirestore } = require('../config/firebase');
const auth = require('../middleware/auth');

const router = express.Router();
const db = getFirestore();

// @route   GET /api/chat/messages
// @desc    Get chat messages
// @access  Private
router.get('/messages', auth, async (req, res) => {
  try {
    const messagesSnapshot = await db.collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const messages = [];
    messagesSnapshot.forEach(doc => {
      messages.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(messages.reverse()); // Return in chronological order
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/chat/messages
// @desc    Send a message
// @access  Private
router.post('/messages', [
  auth,
  body('content', 'Message content is required').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content } = req.body;

    const message = {
      content,
      userId: req.user.id,
      createdAt: new Date()
    };

    const messageRef = await db.collection('messages').add(message);
    const messageDoc = await messageRef.get();

    res.json({
      id: messageDoc.id,
      ...messageDoc.data()
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
