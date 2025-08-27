const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
admin.initializeApp();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createDonationPaymentIntent = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { amount, userId } = req.body;
      if (!amount || !userId) return res.status(400).json({ error: 'amount and userId required' });

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        automatic_payment_methods: { enabled: true },
        metadata: { userId },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Internal error' });
    }
  });
});


