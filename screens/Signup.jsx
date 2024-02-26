import { useContext, useState } from "react";
import { View, StyleSheet, StatusBar, ScrollView } from "react-native";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/authContext";
import firestore from "@react-native-firebase/firestore";

// utils
import {
  credentialFieldProps,
  signUpInitValue,
} from "../util/credentialFieldProps";
import { validateSignUpForm } from "../util/formValidation";

// components
import CredentialField from "../components/auth/CredentialField";
import AuthButton from "../components/auth/AuthButton";
import Header from "../components/Header";
import AddressField from "../components/auth/AddressField";
import BirthDatePicker from "../components/auth/BirthDatePicker";
import ErrorMessage from "../components/ErrorMessage";

export default function Signup({ route, navigation }) {
  const { setAuthenticating, setUserData } = useContext(AuthContext);
  const { uid, phoneNumber } = route.params;

  const [credential, setCredential] = useState(signUpInitValue);
  const [errors, setErrors] = useState({});

  const signUpHanlder = async () => {
    setErrors(null);
    setAuthenticating(true);
    const isValid = validateSignUpForm(credential, setErrors);
    if (isValid) {
      try {
        const userData = { uid, phoneNumber, ...credential };
        await firestore().collection("users").doc(uid).set(userData);
        setUserData(userData);
      } catch (error) {
        console.log("Error creating user: ", error);
      }
    }
    setAuthenticating(false);
  };

  const inputProps = credentialFieldProps(setCredential);

  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <Header
          customStyle={styles.headerSytle}
          imageStyle={styles.headerImage}
        />
        <View style={styles.loginContainer}>
          <View style={styles.rowContainer}>
            <CredentialField {...inputProps.firstName} />
            <CredentialField {...inputProps.lastName} />
          </View>
          <View style={styles.stackContainer}>
            <AddressField setCredentials={setCredential} />
            <BirthDatePicker setCredentials={setCredential} />
          </View>
          <ErrorMessage errors={errors} />
          <AuthButton title={"Continue"} onPress={signUpHanlder} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: StatusBar.currentHeight + 25,
    flex: 1,
    backgroundColor: Colors.bgPrimaary400,
  },
  headerSytle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
  headerImage: {
    width: 100,
    height: 100,
  },
  loginContainer: {
    flex: 5,
    justifyContent: "start",
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
    // borderWidth: 2,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 16,
    // borderWidth: 2,
  },
  stackContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  loginLink: {
    color: Colors.accent,
  },
});
