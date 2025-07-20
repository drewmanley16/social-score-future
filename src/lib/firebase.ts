import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqLZpGRCUV46tyhzS_-uW4814FpTjjLv0",
  authDomain: "influenceriq-cf148.firebaseapp.com",
  projectId: "influenceriq-cf148",
  storageBucket: "influenceriq-cf148.firebasestorage.app",
  messagingSenderId: "55396160011",
  appId: "1:55396160011:web:00080b70381889ef0f2d0e",
  measurementId: "G-SJS0QM0HX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

export default app; 