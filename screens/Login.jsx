import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
} from "react-native";
import { useContext, useState } from "react";
import CredentialField from "../components/CredentialField";
import { credentialFieldProps } from "../util/credentialFieldProps";
import AuthButton from "../components/AuthButton";
import { AuthContext } from "../context/authContext";
import { Colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";


let headerSize;

export default function Login() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  const [credential, setCredential] = useState({
    email: "",
    passowrd: "",
  });

  const loginInHandler = async () => {
    authCtx.login(credential);
  };

  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <Header customStyle={styles.headerStyle} imageStyle={styles.headerImage} />
        <View style={styles.loginContainer}>
          <View style={styles.inputContainerStyle}>
            <CredentialField {...credentialFieldProps(setCredential).email} />
            <CredentialField
              {...credentialFieldProps(setCredential).passowrd}
            />
          </View>
          <AuthButton title={"Login"} onPress={loginInHandler} />
          <Text style={{ color: "white" }}>
            Don't have an account?{" "}
            <Text
              style={styles.signUpLink}
              onPress={() => navigation.navigate('Signup')}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: StatusBar.currentHeight + 25,
    flex: 1,
    backgroundColor: "white",
    backgroundColor: Colors.bgPrimaary400,
  },
  headerStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: 200,
    height: 200,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    // borderWidth: 2,
  },
  inputContainerStyle: {
    width: "80%",
  },
  inputStyle: {
    flex: 1,
    // borderWidth: 2,
  },
  signUpLink: {
    color: Colors.accent,
  },
});
