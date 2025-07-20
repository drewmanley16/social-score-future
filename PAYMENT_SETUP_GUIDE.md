# Payment & Subscription Setup Guide

## 🎯 **Overview**

Your app now has a complete user journey:

1. **Sign up/Login** → User creates account
2. **Dashboard** → Shows analysis results and upgrade prompts
3. **Payment Processing** → Stripe integration for subscriptions
4. **Premium Features** → Advanced analytics and insights

## 💳 **Payment Processing Options**

### **Option 1: Stripe (Recommended)**

- **Pros**: Industry standard, excellent documentation, webhook support
- **Cons**: 2.9% + 30¢ per transaction
- **Setup**: Easy integration with React

### **Option 2: PayPal**

- **Pros**: Widely trusted, good for international
- **Cons**: Higher fees, less developer-friendly
- **Setup**: Requires PayPal Business account

### **Option 3: Paddle**

- **Pros**: Built for SaaS, handles taxes automatically
- **Cons**: Higher fees than Stripe
- **Setup**: Good for international businesses

## 🚀 **Stripe Setup (Recommended)**

### **Step 1: Create Stripe Account**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create account and verify business details
3. Get your API keys from the dashboard

### **Step 2: Set Up Products & Prices**

1. **Go to Products** in Stripe Dashboard
2. **Create Basic Plan**:
   - Name: "Basic Plan"
   - Price: $9.99/month
   - Billing: Recurring
3. **Create Pro Plan**:
   - Name: "Pro Plan"
   - Price: $19.99/month
   - Billing: Recurring

### **Step 3: Backend API Setup**

You'll need a backend server to handle Stripe webhooks. Here's a basic Express.js setup:

```javascript
// server.js
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());

// Create checkout session
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { plan, userId, email } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan === "PRO" ? "price_pro_monthly" : "price_basic_monthly",
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.CLIENT_URL}/dashboard?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard?canceled=true`,
      customer_email: email,
      metadata: {
        userId: userId,
        plan: plan,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle webhooks
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // Update user subscription status in Firestore
      await updateUserSubscription(
        session.metadata.userId,
        session.metadata.plan
      );
    }

    res.json({ received: true });
  }
);
```

### **Step 4: Environment Variables**

Add to your `.env` file:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 📊 **Premium Features Implementation**

### **Free Tier Features:**

- ✅ Basic profile analysis (3 per month)
- ✅ Standard insights and recommendations
- ✅ Email support
- ✅ Basic leaderboard access

### **Pro Tier Features:**

- ✅ Unlimited profile analyses
- ✅ Advanced AI insights
- ✅ Competitor analysis
- ✅ Growth predictions
- ✅ Priority support
- ✅ Custom reporting
- ✅ API access

## 🔧 **Firestore Integration**

### **User Subscription Schema:**

```javascript
// users/{userId}
{
  email: "user@example.com",
  displayName: "John Doe",
  subscription: {
    status: "active", // active, canceled, past_due
    plan: "PRO", // BASIC, PRO
    stripeCustomerId: "cus_xxx",
    stripeSubscriptionId: "sub_xxx",
    currentPeriodEnd: "2024-02-20T00:00:00Z",
    cancelAtPeriodEnd: false
  },
  analytics: {
    totalAnalyses: 15,
    lastAnalysisDate: "2024-01-20T10:30:00Z",
    analysesThisMonth: 3
  }
}
```

### **Usage Tracking:**

```javascript
// Track analysis usage
const trackAnalysis = async (userId) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();

  const analysesThisMonth = userData.analytics.analysesThisMonth || 0;
  const plan = userData.subscription?.plan || "FREE";

  // Check limits
  if (plan === "FREE" && analysesThisMonth >= 3) {
    throw new Error(
      "Monthly analysis limit reached. Upgrade to Pro for unlimited analyses."
    );
  }

  // Update usage
  await updateDoc(userRef, {
    "analytics.totalAnalyses": increment(1),
    "analytics.analysesThisMonth": increment(1),
    "analytics.lastAnalysisDate": new Date(),
  });
};
```

## 🎨 **UI/UX Enhancements**

### **Subscription Status Indicators:**

- Show current plan in dashboard
- Display usage limits and remaining analyses
- Highlight premium features with upgrade prompts

### **Payment Flow:**

1. User clicks "Upgrade"
2. Payment modal opens with plan details
3. Stripe Checkout redirects to payment page
4. Success/cancel redirects back to dashboard
5. Webhook updates user subscription status

## 🔒 **Security Considerations**

### **Client-Side Security:**

- Never expose Stripe secret keys in frontend
- Always verify payments server-side
- Use webhooks for reliable payment confirmation

### **Server-Side Security:**

- Validate webhook signatures
- Check user authentication before payment
- Implement proper error handling

## 📈 **Business Model Options**

### **Option 1: Freemium**

- **Free**: 3 analyses/month, basic insights
- **Pro ($19.99/month)**: Unlimited analyses, advanced features

### **Option 2: Tiered Pricing**

- **Basic ($9.99/month)**: 10 analyses/month, basic insights
- **Pro ($19.99/month)**: Unlimited analyses, advanced features
- **Enterprise ($49.99/month)**: API access, white-label options

### **Option 3: Pay-Per-Use**

- **Free**: 1 analysis
- **Pay-per-analysis**: $2.99 per analysis
- **Bulk discounts**: 10 analyses for $19.99

## 🚀 **Next Steps**

1. **Set up Stripe account** and get API keys
2. **Create backend server** for payment processing
3. **Implement webhook handling** for subscription management
4. **Add usage tracking** to limit free tier features
5. **Test payment flow** in Stripe test mode
6. **Deploy and go live** with real payments

## 💡 **Additional Features to Consider**

- **Trial periods** (7-day free trial)
- **Annual discounts** (save 20% with annual billing)
- **Team plans** for agencies
- **White-label options** for resellers
- **API access** for developers
- **Custom reporting** for enterprise clients

The payment system is now ready to be connected to your backend! 🎉
