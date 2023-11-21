import { View, StyleSheet } from "react-native";
import CredentialField from "../components/CredentialField";
import {
  credentialFieldProps,
  signUpInitValue,
} from "../util/credentialFieldProps";
import { useContext, useState } from "react";
import AuthButton from "../components/AuthButton";
import { AuthContext } from "../context/authContext";


const Signup = () => {
  const [credential, setCredential] = useState(signUpInitValue);

  const authCtx = useContext(AuthContext)

  const signUpHanlder = async () => {
    authCtx.signup(credential.email, credential.password)
  }

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
});
