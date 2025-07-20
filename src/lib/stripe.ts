import { loadStripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment variables
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PUBLISHABLE_KEY) {
  console.warn('⚠️ Stripe publishable key not found. Please add VITE_STRIPE_PUBLISHABLE_KEY to your .env file');
}

export const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_key_here');

export const PRICE_IDS = {
  PRO_MONTHLY: 'price_pro_monthly',
  PRO_YEARLY: 'price_pro_yearly',
  BASIC_MONTHLY: 'price_basic_monthly',
  BASIC_YEARLY: 'price_basic_yearly'
};

export const SUBSCRIPTION_PLANS = {
  BASIC: {
    name: 'Basic',
    price: 9.99,
    period: 'month',
    features: [
      '3 profile analyses per month',
      'Basic insights and recommendations',
      'Email support',
      'Standard leaderboard access'
    ]
  },
  PRO: {
    name: 'Pro',
    price: 19.99,
    period: 'month',
    features: [
      'Unlimited profile analyses',
      'Advanced AI insights',
      'Competitor analysis',
      'Growth predictions',
      'Priority support',
      'Custom reporting',
      'API access'
    ]
  }
};

// Helper function to check if Stripe is properly configured
export const isStripeConfigured = () => {
  return !!STRIPE_PUBLISHABLE_KEY && STRIPE_PUBLISHABLE_KEY !== 'pk_test_your_stripe_key_here';
}; 