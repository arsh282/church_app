const express = require('express');
const { body, validationResult } = require('express-validator');
const { getFirestore } = require('../config/firebase');
const auth = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();
const db = getFirestore();

// @route   GET /api/donations
// @desc    Get all donations (Admin only)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const donationsSnapshot = await db.collection('donations')
      .orderBy('createdAt', 'desc')
      .get();

    const donations = [];
    donationsSnapshot.forEach(doc => {
      donations.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(donations);
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/donations
// @desc    Create a donation
// @access  Private
router.post('/', [
  auth,
  body('amount', 'Amount is required').isNumeric(),
  body('paymentMethodId', 'Payment method is required').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, paymentMethodId, message } = req.body;

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      return_url: process.env.FRONTEND_URL || 'http://localhost:8081'
    });

    // Save donation to Firestore
    const donation = {
      userId: req.user.id,
      amount: amount,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      message: message || null,
      createdAt: new Date()
    };

    const donationRef = await db.collection('donations').add(donation);
    const donationDoc = await donationRef.get();

    res.json({
      id: donationDoc.id,
      ...donationDoc.data(),
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Create donation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
