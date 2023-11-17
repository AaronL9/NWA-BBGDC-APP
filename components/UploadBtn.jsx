import { Text, View, StyleSheet, Pressable } from "react-native";

const UploadBtn = ({ children, onPress }) => {
  return (
    <View style={styles.btnOuterWrapper}>
      <Pressable style={styles.btnWrapper} onPress={onPress}>
        <Text style={styles.btnText}>Upload Image/Video</Text>
      </Pressable>
      {children}
    </View>
  );
};

export default UploadBtn;

const styles = StyleSheet.create({
  btnOuterWrapper: {
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
