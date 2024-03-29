import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDateToString } from "../../util/dateFormatter";
import { parse } from "date-fns";

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
        birthdate,
      }));
    }
  };

  const disabledStyle = isEditing ? "black" : "#888888";

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
            value={parse(currentValue, "MMMM d, yyyy", new Date())}
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
  label: { fontWeight: "500", textTransform: "capitalize" },
  textInput: {
    height: 40,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "white",
    paddingHorizontal: 4,
    borderRadius: 4,
    justifyContent: "center",
  },
});
