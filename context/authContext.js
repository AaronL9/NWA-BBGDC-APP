import { Alert } from "react-native";
import { createContext, useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({
  currentUser: null,
  userData: null,
  setUserData: () => {},
  login: () => {},
  signup: () => {},
  logout: () => {},
  isAuthenticated: false,
  authenticating: false,
  setAuthenticating: () => {},
  authError: null,
});

function AuthContextProvider({ children }) {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [authenticating, setAuthenticating] = useState(false);
  const [authError, setAuthError] = useState(null);

  async function logout() {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error.code, error.message);
    }
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userData = await firestore()
            .collection("users")
            .doc(user.uid)
            .get();
          if (userData.exists) {
            setUserData(userData.data());
          } else {
            setUserData(null);
            const { uid, phoneNumber } = user;
            navigation.navigate("Signup", {
              uid,
              phoneNumber: phoneNumber.replace("+63", "0"),
            });
          }
        } catch (error) {
          console.log(error);
        }
      }

      console.log(user);
      setInitializing(false);
      setAuthenticating(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    setUserData,
    logout,
    authenticating,
    setAuthenticating,
    isAuthenticated: !!currentUser && !!userData,
    authError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!initializing && children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
