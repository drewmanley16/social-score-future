require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Debug: Check if environment variables are loaded
console.log('🔧 Environment Check:');
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Loaded' : '❌ Missing');
console.log('STRIPE_PRO_PRICE_ID:', process.env.STRIPE_PRO_PRICE_ID ? '✅ Loaded' : '❌ Missing');
console.log('STRIPE_BASIC_PRICE_ID:', process.env.STRIPE_BASIC_PRICE_ID ? '✅ Loaded' : '❌ Missing');

// Middleware
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:5173',
    'http://localhost:8080'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Create checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { plan, userId, email } = req.body;
    
    if (!plan || !userId || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields: plan, userId, email' 
      });
    }

    // Define price IDs based on plan
    let priceId;
    switch (plan) {
      case 'BASIC':
        priceId = process.env.STRIPE_BASIC_PRICE_ID;
        break;
      case 'PRO':
        priceId = process.env.STRIPE_PRO_PRICE_ID;
        break;
      case 'ELITE':
        priceId = process.env.STRIPE_ELITE_PRICE_ID;
        break;
      default:
        return res.status(400).json({ 
          error: 'Invalid plan. Must be BASIC, PRO, or ELITE' 
        });
    }

    if (!priceId) {
      return res.status(500).json({ 
        error: 'Price ID not configured for this plan' 
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard?canceled=true`,
      customer_email: email,
      metadata: {
        userId: userId,
        plan: plan
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      subscription_data: {
        metadata: {
          userId: userId,
          plan: plan
        }
      }
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to create checkout session' 
    });
  }
});

// Handle webhooks
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('Received webhook event:', event.type);

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful for user:', session.metadata.userId);
      // Here you would update the user's subscription status in your database
      // For now, we'll just log it
      break;
    
    case 'customer.subscription.created':
      const subscription = event.data.object;
      console.log('Subscription created:', subscription.id);
      break;
    
    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object;
      console.log('Subscription updated:', updatedSubscription.id);
      break;
    
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object;
      console.log('Subscription canceled:', deletedSubscription.id);
      break;
    
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.json({received: true});
});

// Get subscription status
app.get('/api/subscription/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // In a real app, you'd look up the user's subscription in your database
    // For now, we'll return a mock response
    res.json({
      userId,
      status: 'active',
      plan: 'PRO',
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💳 Stripe webhook: http://localhost:${PORT}/webhook`);
}); 