import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import SelectDropdown from "react-native-select-dropdown";
import { bonuanArea } from "../../util/staticData";

export default function AddressField({ setCredentials }) {
  const [hasSelected, setHasSelected] = useState(false);

  const onChangeHanlder = async (key, value) => {
    const inputVal = value.trim();
    setCredentials((prev) => ({
      ...prev,
      [key]: inputVal,
    }));
  };

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View style={styles.inputContainerStyle}>
        <Ionicons name="home" size={20} color={Colors.primary400} />
        <TextInput
          placeholder="House address"
          style={styles.inputStyle}
          onChangeText={onChangeHanlder.bind(this, "houseAddress")}
        />
      </View>
      <SelectDropdown
        data={bonuanArea}
        onSelect={(value) => {
          setHasSelected(true);
          return onChangeHanlder("area", value.toLowerCase());
        }}
        renderDropdownIcon={() => (
          <Entypo name="address" size={20} color={Colors.primary400} />
        )}
        buttonStyle={[
          styles.inputContainerStyle,
          { width: "100%", height: 38 },
        ]}
        buttonTextStyle={{
          textAlign: "left",
          fontSize: 14,
          color: hasSelected ? "black" : "grey",
          marginLeft: 0,
        }}
        dropdownIconPosition="left"
        defaultButtonText="Please select your area"
        dropdownStyle={{
          position: "absolute",
          borderRadius: 12,
          marginTop: -20,
          paddingHorizontal: 10,
          paddingVertical: 8,
        }}
        rowStyle={{ borderColor: "transparent" }}
        rowTextStyle={{ textAlign: "left" }}
        showsVerticalScrollIndicator={true}
        selectedRowTextStyle={{ color: Colors.primary200 }}
        selectedRowStyle={{ backgroundColor: "white", borderRadius: 6 }}
      />
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
