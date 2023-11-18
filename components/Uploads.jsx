import { Text, View, StyleSheet, Pressable } from "react-native";

const Uploads = ({ children, onPress }) => {
  return (
    <View style={styles.uploadContainer}>
      <Pressable style={styles.btnWrapper} onPress={onPress}>
        <Text style={styles.btnText}>Upload Image/Video</Text>
      </Pressable>
      {children}
    </View>
  );
};

export default Uploads;

const styles = StyleSheet.create({
  uploadContainer: {
    marginTop: 22,
    backgroundColor: "#ebf3f3",
    width: "80%",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 6,
  },
  btnWrapper: {
    width: "100%",
  },
  btnText: {
    color: "#585861",
    fontWeight: "800",
    textAlign: "center",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  pressed: {
    opacity: 0.8,
  },
});
