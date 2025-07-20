# Firebase Authentication Setup Guide

## 🔧 **Fix the 400 Error**

The error you're seeing indicates that Firebase Authentication is not properly configured. Follow these steps:

### **Step 1: Enable Authentication in Firebase Console**

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `influenceriq-cf148`
3. **Navigate to Authentication**: Click "Authentication" in the left sidebar
4. **Click "Get started"** (if you haven't set up Authentication yet)

### **Step 2: Enable Email/Password Authentication**

1. **Go to "Sign-in method" tab**
2. **Click on "Email/Password"**
3. **Toggle to "Enabled"**
4. **Click "Save"**

### **Step 3: Set up Security Rules (Optional but Recommended)**

1. **Go to Firestore Database** in the left sidebar
2. **Click "Create database"** if you haven't already
3. **Choose "Start in test mode"** for development
4. **Select a location** (choose the closest to your users)

### **Step 4: Test the Authentication**

After enabling Authentication, try signing up again. The error should be resolved.

## 🚨 **Common Issues & Solutions**

### **Issue 1: "OPERATION_NOT_ALLOWED" Error**

- **Cause**: Email/password authentication is not enabled
- **Solution**: Follow Step 2 above to enable Email/Password authentication

### **Issue 2: "INVALID_EMAIL" Error**

- **Cause**: Email format is incorrect
- **Solution**: Ensure email is in valid format (e.g., user@example.com)

### **Issue 3: "WEAK_PASSWORD" Error**

- **Cause**: Password is less than 6 characters
- **Solution**: Use a password with at least 6 characters

### **Issue 4: "EMAIL_ALREADY_IN_USE" Error**

- **Cause**: User already exists with that email
- **Solution**: Use a different email or try logging in instead

## ✅ **What's Fixed**

1. **Better Error Messages**: Now shows specific, user-friendly error messages
2. **Proper Error Handling**: Handles all common Firebase Auth errors
3. **Improved UX**: Users get clear feedback about what went wrong

## 🧪 **Test the Fix**

1. **Enable Authentication** in Firebase Console (Steps 1-2 above)
2. **Try signing up** with a new email and password
3. **Try logging in** with existing credentials
4. **Check the console** - errors should now be more descriptive

## 📱 **Next Steps**

Once Authentication is working:

1. **Test user registration** with different scenarios
2. **Test login/logout** functionality
3. **Add user profile data** to Firestore
4. **Implement protected routes** for authenticated users

## 🔍 **Debugging Tips**

- **Check Firebase Console**: Look for authentication attempts in the Authentication section
- **Check Browser Console**: Look for detailed error messages
- **Check Network Tab**: See the actual API requests and responses
- **Verify Configuration**: Ensure your Firebase config is correct

The authentication should work perfectly once you enable Email/Password authentication in your Firebase project!
