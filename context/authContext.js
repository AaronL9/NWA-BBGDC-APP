import { Alert } from "react-native";
import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export const AuthContext = createContext({
  currentUser: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  isAuthenticated: false,
  authenticating: false,
});

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);

  async function signup(credential) {
    setAuthenticating(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        credential.email,
        credential.password
      );
      const uid = user.uid;
      const { email, firstName, lastName, contactNum } = credential;
      const userData = {
        uid,
        email,
        firstName,
        lastName,
        contactNum,
      };
      await addDoc(collection(db, "users"), userData);
    } catch (error) {
      let errorMessage = "Failed to sign you up";

      if (error.message.includes("email-already-in-use")) {
        errorMessage = "Email already in use";
      }
      Alert.alert("Signup Failed", errorMessage);
    }
    setAuthenticating(false);
  }

  async function login({ email, password }) {
    setAuthenticating(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.code, error.message);
    }
    setAuthenticating(false);
  }

  async function logout() {
    try {
      const data = await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.log(error.code, error.message);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      // console.log("user:", user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    authenticating,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
