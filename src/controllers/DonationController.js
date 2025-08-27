import { db } from '../services/firebase';
// import { createPaymentIntent } from '../services/stripe';
// import { useStripe } from '@stripe/stripe-react-native';
import { useCallback } from 'react';

export function useDonation() {
  // const { confirmPayment } = useStripe();

  const donate = useCallback(async ({ amountCents, userId, method = 'card' }) => {
    // Mock donation for development
    console.log('Mock donation:', { amountCents, userId, method });
    
    // const { clientSecret } = await createPaymentIntent(amountCents, userId);
    // const { error, paymentIntent } = await confirmPayment(clientSecret, { paymentMethodType: 'Card' });
    // if (error) throw error;

    await db.collection('donations').add({
      userId,
      amountCents,
      method,
      status: 'succeeded', // Mock status
      createdAt: new Date(),
    });
    return 'succeeded';
  }, []);

  return { donate };
}


