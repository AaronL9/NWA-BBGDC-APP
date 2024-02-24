import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, StatusBar, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/authContext";

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

const Signup = () => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  const [credential, setCredential] = useState(signUpInitValue);
  const [errors, setErrors] = useState({});

  const signUpHanlder = async () => {
    const isValid = validateSignUpForm(credential, setErrors);
    if (isValid) {
      authCtx.signup(credential);
      return;
    }
  };

  useEffect(() => {}, [credential]);

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
            <CredentialField {...inputProps.email} />
            <CredentialField {...inputProps.phone} />
            <AddressField setCredentials={setCredential} />
            <BirthDatePicker setCredentials={setCredential} />
            <CredentialField {...inputProps.passowrd} />
            <CredentialField {...inputProps.confirmPassword} />
          </View>
          <ErrorMessage errors={errors} />
          <AuthButton title={"Signup"} onPress={signUpHanlder} />
          <Text style={{ color: "white" }}>
            Already have an account?{" "}
            <Text
              style={styles.loginLink}
              onPress={() => navigation.replace("Login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

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
