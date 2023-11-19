import { Text, View, StyleSheet, Pressable } from "react-native";
import { Colors } from "../constants/colors";

const SubmitButton = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={{ width: "80%" }}>
      <View style={styles.submitButtonContainer}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </View>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  submitButtonContainer: {
    backgroundColor: Colors.primary400,
    width: "100%",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
