import { View, Text, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

export default function ErrorMessage({ errors }) {
  return (
    Object.keys(errors).length !== 0 && (
      <View style={styles.errorsContainer}>
        {Object.values(errors).map((error, index) => (
          <View key={index} style={styles.error}>
            <Octicons name="dot-fill" size={16} color={Colors.errorBullet} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ))}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  errorsContainer: {
    width: "100%",
    backgroundColor: Colors.errorsContainer,
    gap: 5,
    padding: 12,
    borderRadius: 6,
    marginTop: 12,
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
