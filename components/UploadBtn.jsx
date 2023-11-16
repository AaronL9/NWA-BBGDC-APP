import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const UploadBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <View style={styles.btnWrapper}>
        <Text style={styles.btnText}>Upload Image/Video</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UploadBtn;

const styles = StyleSheet.create({
  btnWrapper: {
    backgroundColor: "black",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 22,
  },
  btnText: {
    color: "white",
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.8,
  },
});
