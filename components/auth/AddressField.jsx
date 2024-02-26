import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function AddressField({ setCredentials }) {
  const onChangeHanlder = async (key, value) => {
    const inputVal = value.trim();
    setCredentials((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: inputVal },
    }));
  };

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        gap: 16,
      }}
    >
      <View style={styles.inputContainerStyle}>
        <Ionicons name="home" size={20} color={Colors.primary400} />
        <TextInput
          placeholder="House No."
          style={styles.inputStyle}
          onChangeText={onChangeHanlder.bind(this, "houseNo")}
        />
      </View>
      <View style={styles.inputContainerStyle}>
        <Ionicons name="home" size={20} color={Colors.primary400} />
        <TextInput
          placeholder="Street name"
          style={styles.inputStyle}
          onChangeText={onChangeHanlder.bind(this, "street")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    marginTop: 16,
    borderRadius: 6,
    flexDirection: "row",
    borderBottomWidth: 2,
    paddingHorizontal: 5,
    paddingVertical: 5,
    gap: 5,
    borderBottomColor: Colors.primary400,
    backgroundColor: "#f6f6f6",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  inputStyle: {
    flex: 1,
    // borderWidth: 2,
  },
});
