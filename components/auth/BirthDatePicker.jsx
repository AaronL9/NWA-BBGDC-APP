import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { formatDateToString } from "../../util/dateFormatter";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function BirthDatePicker({ setCredentials }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [dateValue, setDateValue] = useState("Birthdate");

  const onChangeDateHandler = (event, selectedDate) => {
    console.log(formatDateToString(selectedDate));
    setShowDatePicker(false);

    if (event.type === "set") {
      const birthdate = formatDateToString(selectedDate);
      setDateValue(birthdate);
      setCredentials((prev) => ({
        ...prev,
        birthDate: birthdate,
      }));
    }
  };
  return (
    <View style={{ width: "100%" }}>
      <Pressable
        style={styles.inputContainerStyle}
        onPress={() => setShowDatePicker(true)}
      >
        <Ionicons name="calendar" size={20} color={Colors.primary400} />
        <Text>{dateValue}</Text>
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
  inputContainerStyle: {
    marginTop: 16,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    paddingHorizontal: 5,
    paddingVertical: 5,
    gap: 5,
    borderBottomColor: Colors.primary400,
    backgroundColor: "#f6f6f6",
    flex: 1,
  },
  inputStyle: {
    flex: 1,
    // borderWidth: 2,
  },
});
