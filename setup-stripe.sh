#!/bin/bash

echo "🚀 Stripe Setup for Social Score Future"
echo "========================================"

# Check if .env file exists in root
if [ ! -f "../.env" ]; then
    echo "📝 Creating .env file in root directory..."
    cat > ../.env << EOF
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyBqLZpGRCUV46tyhzS_-uW4814FpTjjLv0
VITE_FIREBASE_AUTH_DOMAIN=influenceriq-cf148.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=influenceriq-cf148
VITE_FIREBASE_STORAGE_BUCKET=influenceriq-cf148.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
EOF
    echo "✅ Created .env file in root directory"
else
    echo "✅ .env file already exists in root directory"
fi

# Check if .env file exists in server
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file in server directory..."
    cat > .env << EOF
# Server Configuration
PORT=3001
CLIENT_URL=http://localhost:5173

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Price IDs (create these in your Stripe dashboard)
STRIPE_BASIC_PRICE_ID=price_basic_monthly
STRIPE_PRO_PRICE_ID=price_pro_monthly
EOF
    echo "✅ Created .env file in server directory"
else
    echo "✅ .env file already exists in server directory"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Go to https://dashboard.stripe.com/register"
echo "2. Create your Stripe account"
echo "3. Get your API keys from Developers → API keys"
echo "4. Create products and prices in Stripe Dashboard"
echo "5. Set up webhooks in Developers → Webhooks"
echo "6. Update the .env files with your actual keys"
echo "7. Run 'npm run dev' in the server directory"
echo "8. Test the payment flow!"
echo ""
echo "📖 See STRIPE_SETUP_INSTRUCTIONS.md for detailed steps" 