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
  body('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 254 }),
  body('password', 'Password is required')
    .isLength({ min: 8, max: 128 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
  body('firstName', 'First name is required').notEmpty().trim().isLength({ min: 1, max: 50 }),
  body('lastName', 'Last name is required').notEmpty().trim().isLength({ min: 1, max: 50 })
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { email, password, firstName, lastName, phone, ...otherData } = req.body;

    // Prevent admin email registration
    if (email.endsWith('@admin.connectfaith.com')) {
      return res.status(400).json({ message: 'Admin emails cannot be registered through this form' });
    }

    // Check if user already exists
    try {
      const userRecord = await firebaseAuth.getUserByEmail(email);
      return res.status(400).json({ message: 'User already exists with this email address' });
    } catch (error) {
      // User doesn't exist, continue with registration
    }

    // Create user in Firebase Auth (Firebase handles password hashing internally)
    const userRecord = await firebaseAuth.createUser({
      email,
      password, // Firebase will handle the hashing and salting internally
      displayName: `${firstName} ${lastName}`,
      phoneNumber: phone || null
    });

    // Create user profile in Firestore
    const userProfile = {
      uid: userRecord.uid,
      email: email.toLowerCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone || null,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      // Store additional user data if provided
      ...otherData
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
  body('email', 'Please include a valid email')
    .isEmail()
    .normalizeEmail(),
  body('password', 'Password is required')
    .isLength({ min: 1 })
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    try {
      // Verify user exists and get user record
      const userRecord = await firebaseAuth.getUserByEmail(email);

      // Get user profile from Firestore
      const userDoc = await db.collection('users').doc(userRecord.uid).get();
      if (!userDoc.exists) {
        return res.status(401).json({ message: 'Invalid email or password' });
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
    } catch (firebaseError) {
      // Handle Firebase Auth errors
      if (firebaseError.code === 'auth/user-not-found') {
        return res.status(401).json({ message: 'Invalid email or password' });
      } else if (firebaseError.code === 'auth/wrong-password') {
        return res.status(401).json({ message: 'Invalid email or password' });
      } else if (firebaseError.code === 'auth/too-many-requests') {
        return res.status(429).json({ message: 'Too many failed login attempts. Please try again later.' });
      } else {
        console.error('Firebase Auth error:', firebaseError);
        return res.status(500).json({ message: 'Authentication error' });
      }
    }
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
