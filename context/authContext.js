import { Alert } from "react-native";
import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export const AuthContext = createContext({
  user: {},
  login: () => {},
  signup: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();

  async function signup(credential) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credential.email,
        credential.password
      );
      const uid = userCredential.user.uid;
      const { email, firstName, lastName, contactNum } = credential;
      const userData = {
        uid,
        email,
        firstName,
        lastName,
        contactNum,
      };
      const user = await addDoc(collection(db, "users"), userData);
      setUser(userData)
      
    } catch (error) {
      let errorMessage = "Failed to sign you up";

      if (error.message.includes("email-already-in-use")) {
        errorMessage = "Email already in use";
      }

      Alert.alert("Signup Failed", errorMessage);
    }
  }

  async function login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error.code, error.message);
    }
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      console.log("user:", user);
    });

    return unsubscribe;
  }, [user]);

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
