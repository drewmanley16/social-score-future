# Firebase Setup Guide

## Prerequisites

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore in your Firebase project

## Setup Steps

### 1. Get Firebase Configuration

1. Go to your Firebase project settings
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web"
4. Register your app and copy the configuration

### 2. Create Environment File

Create a `.env` file in your project root with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Enable Authentication

1. Go to Authentication in Firebase Console
2. Click "Get started"
3. Enable Email/Password authentication
4. Optionally enable other providers (Google, GitHub, etc.)

### 4. Set up Firestore Database

1. Go to Firestore Database in Firebase Console
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location for your database

### 5. Set up Security Rules (Optional)

Update your Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Allow public read access to leaderboard data
    match /leaderboard/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Usage Examples

### Authentication

```typescript
import { useAuthContext } from "@/contexts/AuthContext";

const { user, signIn, signUp, logout } = useAuthContext();

// Sign in
const handleSignIn = async () => {
  const result = await signIn(email, password);
  if (result.success) {
    console.log("Signed in successfully");
  }
};

// Sign up
const handleSignUp = async () => {
  const result = await signUp(email, password, displayName);
  if (result.success) {
    console.log("Signed up successfully");
  }
};
```

### Firestore Operations

```typescript
import { useCollection, firestoreOperations } from "@/hooks/useFirestore";

// Real-time collection listening
const { data, loading, error } = useCollection("users");

// Add a document
const addUser = async () => {
  const result = await firestoreOperations.addDocument("users", {
    name: "John Doe",
    email: "john@example.com",
  });
};

// Update a document
const updateUser = async (userId: string) => {
  const result = await firestoreOperations.updateDocument("users", userId, {
    name: "Jane Doe",
  });
};
```

## Available Features

### Authentication

- ✅ Email/Password authentication
- ✅ User profile management
- ✅ Real-time auth state
- ✅ Sign in/Sign up/Logout

### Firestore

- ✅ Real-time data listening
- ✅ CRUD operations
- ✅ Query support
- ✅ Document management

### Storage (Ready for use)

- ✅ File upload/download
- ✅ Image storage
- ✅ Security rules support

## Next Steps

1. Create authentication components (Login/Signup forms)
2. Set up protected routes
3. Create data models for your app
4. Implement user-specific features
5. Add error handling and loading states
