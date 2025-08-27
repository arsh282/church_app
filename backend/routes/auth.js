const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getFirestore, getAuth } = require('../config/firebase');
const auth = require('../middleware/auth');

const router = express.Router();
const db = getFirestore();
const firebaseAuth = getAuth();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  body('firstName', 'First name is required').notEmpty(),
  body('lastName', 'Last name is required').notEmpty()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user already exists
    try {
      const userRecord = await firebaseAuth.getUserByEmail(email);
      return res.status(400).json({ message: 'User already exists' });
    } catch (error) {
      // User doesn't exist, continue with registration
    }

    // Create user in Firebase Auth
    const userRecord = await firebaseAuth.createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
      phoneNumber: phone
    });

    // Create user profile in Firestore
    const userProfile = {
      uid: userRecord.uid,
      email,
      firstName,
      lastName,
      phone: phone || null,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection('users').doc(userRecord.uid).set(userProfile);

    // Create JWT token
    const payload = {
      user: {
        id: userRecord.uid,
        email: userRecord.email,
        role: 'user'
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: userRecord.uid,
            email: userRecord.email,
            firstName,
            lastName,
            role: 'user'
          }
        });
      }
    );
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists()
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Verify user exists and get user record
    const userRecord = await firebaseAuth.getUserByEmail(email);

    // Get user profile from Firestore
    const userDoc = await db.collection('users').doc(userRecord.uid).get();
    if (!userDoc.exists) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const userProfile = userDoc.data();

    // Create JWT token
    const payload = {
      user: {
        id: userRecord.uid,
        email: userRecord.email,
        role: userProfile.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: userRecord.uid,
            email: userRecord.email,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            role: userProfile.role
          }
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const userDoc = await db.collection('users').doc(req.user.id).get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userProfile = userDoc.data();
    res.json({
      user: {
        id: req.user.id,
        email: userProfile.email,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        role: userProfile.role,
        phone: userProfile.phone
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
