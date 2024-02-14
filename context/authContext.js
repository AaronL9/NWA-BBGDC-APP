import { Alert } from "react-native";
import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { validateLoginForm } from "../util/formValidation";

export const AuthContext = createContext({
  currentUser: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  isAuthenticated: false,
  authenticating: false,
  authError: null,
  userData: {},
});

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);
  const [authError, setAuthError] = useState(null);

  async function signup(credential) {
    setAuthenticating(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        credential.email,
        credential.password
      );
      const { firstName, lastName, contactNum } = credential;
      const data = {
        uid: user.uid,
        firstName,
        lastName,
        contactNum,
      };
      await setDoc(doc(db, "users", user.uid), data);
    } catch (error) {
      setAuthenticating(false);
      let errorMessage = "Failed to sign you up";
      if (error.message.includes("email-already-in-use")) {
        errorMessage = "Email already in use";
      }
      Alert.alert("Signup Failed", errorMessage);
    }
  }

  async function login({ email, password }) {
    setAuthenticating(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.code);
      setAuthError(validateLoginForm(error.code));
      setAuthenticating(false);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.code, error.message);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user)
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          setUserData(docSnap.data());
        } catch (error) {
          console.log(error);
        }
      else {
        setUserData(null);
      }

      setLoading(false);
      setAuthenticating(false);
    });

    console.log(userData);
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    setUserData,
    login,
    signup,
    logout,
    authenticating,
    isAuthenticated: !!currentUser && !!userData,
    authError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
