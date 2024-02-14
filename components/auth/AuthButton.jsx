import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Colors } from "../../constants/colors";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const AuthButton = ({ title, onPress }) => {
  const { authenticating } = useContext(AuthContext);
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonWrapper,
        pressed && !authenticating && styles.feedback,
      ]}
      onPress={onPress}
      disabled={authenticating}
    >
      <View>
        {authenticating ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: Colors.primary200,
    borderRadius: 6,
    paddingVertical: 8,
    marginVertical: 16,
    width: "100%",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  feedback: {
    opacity: 0.5,
  },
});
