import { View, StyleSheet, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

export default function Login() {
  return (
    <View style={styles.loginContainer}>
      <View style={[styles.inputContainerStyle]}>
        <MaterialIcons name="mail" size={24} color={Colors.primary400} />
        <TextInput style={styles.inputStyle} placeholder="Email" />
      </View>
      <View style={[styles.inputContainerStyle]}>
        <MaterialIcons name="lock" size={24} color={Colors.primary400} />
        <TextInput style={styles.inputStyle} placeholder="Password" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainerStyle: {
    width: "80%",
    marginTop: 16,
    borderRadius: 6,
    flexDirection: 'row',
    borderBottomWidth: 2,
    paddingHorizontal: 5,
    paddingVertical: 5,
    gap: 5,
    borderBottomColor: Colors.primary400,
    backgroundColor: "#f6f6f6",
  },
  inputStyle: {
    flex: 1,
    // borderWidth: 2,
  }
});