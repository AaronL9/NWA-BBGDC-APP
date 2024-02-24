import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDateToString } from "../../util/dateFormatter";

export default function ProfileInfoBirthDate({
  label,
  currentValue,
  setData,
  isEditing,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDateHandler = (event, selectedDate) => {
    console.log(formatDateToString(selectedDate));
    setShowDatePicker(false);

    if (event.type === "set") {
      const birthdate = formatDateToString(selectedDate);
      setData((prev) => ({
        ...prev,
        birthDate: birthdate,
      }));
    }
  };

  const disabledStyle = isEditing ? "white" : "#888888";

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={styles.textInput}
        onPress={() => (isEditing ? setShowDatePicker(true) : null)}
      >
        <Text style={[{ fontSize: 16, color: disabledStyle }]}>
          {currentValue}
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={onChangeDateHandler}
          />
        )}
      </Pressable>
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
  },
});
