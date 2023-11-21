import { View, StyleSheet, Text } from "react-native";
import CredentialField from "../components/CredentialField";
import {
  credentialFieldProps,
  signUpInitValue,
} from "../util/credentialFieldProps";
import { useContext, useEffect, useState } from "react";
import AuthButton from "../components/AuthButton";
import { AuthContext } from "../context/authContext";
import { validateSignUpForm } from "../util/formValidation";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

const Signup = () => {
  const [credential, setCredential] = useState(signUpInitValue);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  const authCtx = useContext(AuthContext);

  const signUpHanlder = async () => {
    validateSignUpForm(credential, setErrors, setIsFormValid);
    if (isFormValid) {
      authCtx.signup(credential.email, credential.password);
      return;
    }
    alert("invalid form");
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.rowContainer}>
        <CredentialField {...credentialFieldProps(setCredential).firstName} />
        <CredentialField {...credentialFieldProps(setCredential).lastName} />
      </View>
      <View style={styles.stackContainer}>
        <CredentialField {...credentialFieldProps(setCredential).email} />
        <CredentialField {...credentialFieldProps(setCredential).phone} />
        <CredentialField {...credentialFieldProps(setCredential).passowrd} />
        <CredentialField
          {...credentialFieldProps(setCredential).confirmPassword}
        />
      </View>
      <AuthButton onPress={signUpHanlder} />
      <View style={styles.errorsContainer}>
        {Object.values(errors).map((error, index) => (
          <View style={styles.error}>
            <Octicons name="dot-fill" size={16} color={Colors.errorBullet} />
            <Text key={index} style={styles.errorText}>
              {error}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 16,
    // borderWidth: 2,
  },
  stackContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%",
  },
  errorsContainer: {
    width: "80%",
    backgroundColor: Colors.errorsContainer,
    gap: 5,
    padding: 12,
    borderRadius: 6,
  },
  error: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  errorText: {
    color: Colors.errorText,
  },
});
