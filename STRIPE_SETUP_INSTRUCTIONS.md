# 🚀 Stripe Setup Instructions

## Step 1: Create Stripe Account

1. **Go to Stripe**: https://dashboard.stripe.com/register
2. **Sign up** with your business details
3. **Verify your account** (email, phone, business info)

## Step 2: Get Your API Keys

1. **Go to Developers** → **API keys** in Stripe Dashboard
2. **Copy your publishable key** (starts with `pk_test_`)
3. **Copy your secret key** (starts with `sk_test_`)

## Step 3: Create Products & Prices

### Create Basic Plan:

1. Go to **Products** in Stripe Dashboard
2. Click **Add product**
3. **Name**: "Basic Plan"
4. **Price**: $9.99/month
5. **Billing**: Recurring
6. **Copy the Price ID** (starts with `price_`)

### Create Pro Plan:

1. Click **Add product** again
2. **Name**: "Pro Plan"
3. **Price**: $19.99/month
4. **Billing**: Recurring
5. **Copy the Price ID** (starts with `price_`)

## Step 4: Set Up Environment Variables

### Frontend (.env file in root):

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

### Backend (.env file in server folder):

```env
PORT=3001
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_BASIC_PRICE_ID=price_basic_monthly_id_here
STRIPE_PRO_PRICE_ID=price_pro_monthly_id_here
```

## Step 5: Set Up Webhooks

1. **Go to Developers** → **Webhooks** in Stripe Dashboard
2. **Click "Add endpoint"**
3. **Endpoint URL**: `http://localhost:3001/webhook` (for development)
4. **Events to send**:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. **Copy the webhook secret** (starts with `whsec_`)

## Step 6: Install Backend Dependencies

```bash
cd server
npm install
```

## Step 7: Start the Backend Server

```bash
cd server
npm run dev
```

## Step 8: Test the Payment Flow

1. **Start your React app**: `npm run dev`
2. **Start the backend**: `cd server && npm run dev`
3. **Sign up/login** to your app
4. **Go to dashboard** and click "Upgrade Now"
5. **Test with Stripe test cards**:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

## 🔧 Troubleshooting

### Common Issues:

1. **"Stripe is not properly configured"**

   - Check your `.env` file has the correct publishable key
   - Restart your React app after adding environment variables

2. **"Failed to create checkout session"**

   - Make sure your backend server is running on port 3001
   - Check your secret key and price IDs are correct

3. **Webhook errors**
   - Use Stripe CLI for local webhook testing
   - Install: `brew install stripe/stripe-cli/stripe`
   - Run: `stripe listen --forward-to localhost:3001/webhook`

### Stripe CLI Setup (Optional but Recommended):

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3001/webhook
```

## 🧪 Testing Cards

### Successful Payments:

- `4242 4242 4242 4242` - Visa
- `4000 0566 5566 5556` - Visa (debit)
- `5555 5555 5555 4444` - Mastercard

### Failed Payments:

- `4000 0000 0000 0002` - Generic decline
- `4000 0000 0000 9995` - Insufficient funds
- `4000 0000 0000 9987` - Lost card

## 🚀 Production Deployment

### For Production:

1. **Switch to live keys** in Stripe Dashboard
2. **Update environment variables** with live keys
3. **Deploy backend** to your hosting provider
4. **Update webhook URL** to your production domain
5. **Test with real cards** (small amounts)

### Environment Variables for Production:

```env
# Frontend
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key

# Backend
STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret
CLIENT_URL=https://yourdomain.com
```

## 📊 Monitoring

### Stripe Dashboard:

- **Payments**: View successful/failed payments
- **Customers**: Manage customer data
- **Subscriptions**: Track recurring payments
- **Webhooks**: Monitor webhook delivery

### Your App:

- Check server logs for webhook events
- Monitor user subscription status in your database
- Set up alerts for failed payments

## ✅ Success Checklist

- [ ] Stripe account created and verified
- [ ] API keys copied to environment variables
- [ ] Products and prices created in Stripe
- [ ] Webhook endpoint configured
- [ ] Backend server running on port 3001
- [ ] Frontend can create checkout sessions
- [ ] Test payments working
- [ ] Webhook events being received

Once you've completed these steps, your payment system will be fully functional! 🎉
