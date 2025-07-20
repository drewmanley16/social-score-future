import { useState, useEffect } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  AuthError,
  AuthErrorCodes
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const getErrorMessage = (error: AuthError): string => {
    switch (error.code) {
      case AuthErrorCodes.INVALID_EMAIL:
        return "Invalid email address.";
      case AuthErrorCodes.WEAK_PASSWORD:
        return "Password should be at least 6 characters.";
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/user-not-found":
        return "No account found with this email address.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case AuthErrorCodes.OPERATION_NOT_ALLOWED:
        return "Email/password authentication is not enabled. Please contact support.";
      default:
        return error.message || "An error occurred. Please try again.";
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: result.user };
    } catch (error) {
      const authError = error as AuthError;
      return { 
        success: false, 
        error: new Error(getErrorMessage(authError))
      };
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      
      return { success: true, user: result.user };
    } catch (error) {
      const authError = error as AuthError;
      return { 
        success: false, 
        error: new Error(getErrorMessage(authError))
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      return { 
        success: false, 
        error: new Error(getErrorMessage(authError))
      };
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    logout
  };
}; 