import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function ProfileInfoAddress({
  label,
  setData,
  currentValue,
  isEditing,
}) {
  const disabledStyle = isEditing ? "white" : "#888888";

  const onChangeHandler = (key, value) => {
    setData((prev) => ({
      ...prev,
      address: { ...prev.address, [key]: value },
    }));
  };

  return (
    <View style={{ gap: 4 }}>
      <Text style={{ fontWeight: "bold" }}>{label}</Text>
      <View style={{ flexDirection: "row", gap: 6 }}>
        <View style={styles.textInput}>
          <TextInput
            value={currentValue.houseNo}
            style={{ color: disabledStyle }}
            editable={isEditing}
            onChangeText={onChangeHandler.bind(this, "houseNo")}
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            value={currentValue.street}
            style={{ color: disabledStyle }}
            editable={isEditing}
            onChangeText={onChangeHandler.bind(this, "street")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: { fontWeight: "bold" },
  textInput: {
    height: 40,
    fontSize: 16,
    backgroundColor: "#303134",
    color: "white",
    paddingHorizontal: 4,
    borderRadius: 4,
    justifyContent: "center",
    flex: 1,
  },
});
