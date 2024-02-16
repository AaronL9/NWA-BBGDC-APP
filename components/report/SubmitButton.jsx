import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../constants/colors";

const SubmitButton = ({ onPress, uploading }) => {
  return (
    <Pressable
      disabled={uploading}
      onPress={onPress}
      style={({ pressed }) => [{ width: "100%" }, pressed && styles.pressed]}
    >
      <View style={styles.submitButtonContainer}>
        {uploading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.buttonText}>SUBMIT</Text>
        )}
      </View>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  submitButtonContainer: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: Colors.primary400,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.5,
  },
});
