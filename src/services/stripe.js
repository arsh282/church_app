import Constants from 'expo-constants';
export const STRIPE_PUBLISHABLE_KEY = Constants.expoConfig?.extra?.stripePublishableKey;
export const FUNCTIONS_ENDPOINT = 'https://us-central1-REPLACE.cloudfunctions.net';
export const createPaymentIntent = async (amountCents, userId) => {
  const res = await fetch(`${FUNCTIONS_ENDPOINT}/createDonationPaymentIntent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amountCents, userId }),
  });
  if (!res.ok) throw new Error('Unable to create PaymentIntent');
  return res.json();
};


