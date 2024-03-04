import { StyleSheet, Text, View, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { bonuanArea } from "../../util/staticData";
import { Colors } from "../../constants/colors";
import { Entypo } from "@expo/vector-icons";

export default function ProfileInfoArea({
  setData,
  propKey,
  label,
  currentValue,
  isEditing,
}) {
  const disabledStyle = isEditing ? "white" : "#888888";
  const defaultValue =
    currentValue.charAt(0).toUpperCase() + currentValue.slice(1);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <SelectDropdown
        data={bonuanArea}
        defaultValue={defaultValue}
        onSelect={(value) => setData((prev) => ({ ...prev, [propKey]: value }))}
        renderDropdownIcon={() => (
          <Entypo name="chevron-thin-down" size={20} color={disabledStyle} />
        )}
        dropdownIconPosition="right"
        buttonStyle={[styles.textInput, { width: "100%", height: 38 }]}
        buttonTextStyle={{
          textAlign: "left",
          fontSize: 14,
          color: disabledStyle,
          marginLeft: 0,
        }}
        dropdownStyle={{
          borderRadius: 12,
          marginTop: 100,
          alignSelf: "center",
          paddingHorizontal: 10,
          paddingVertical: 8,
        }}
        rowStyle={{ borderColor: "transparent" }}
        rowTextStyle={{ textAlign: "left" }}
        showsVerticalScrollIndicator={true}
        selectedRowTextStyle={{ color: Colors.primary200 }}
        selectedRowStyle={{ backgroundColor: "white", borderRadius: 6 }}
        disabled={!isEditing}
      />
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
  },
});
