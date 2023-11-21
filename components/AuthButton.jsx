import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../constants/colors";

const AuthButton = ({ onPress }) => {
  return (
    <View style={styles.buttonWrapper}>
      <Pressable onPress={onPress}>
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
    </View>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: Colors.primary400,
    borderRadius: 6,
    paddingVertical: 8,
    width: "80%",
    marginVertical: 16,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
