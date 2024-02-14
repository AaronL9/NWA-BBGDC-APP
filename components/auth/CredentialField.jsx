import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";

const CredentialField = ({
  icon,
  placeholder,
  customStyle,
  isPassword = false,
  changeTextHandler = () => {},
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  return (
    <View style={[styles.inputContainerStyle, customStyle]}>
      <MaterialIcons name={icon} size={24} color={Colors.primary400} />
      <TextInput
        autoCapitalize="none"
        secureTextEntry={isPassword && !showPassword}
        style={styles.inputStyle}
        placeholder={placeholder}
        onChangeText={(value) => {
          changeTextHandler(value);
          setHasPassword(!!value);
        }}
      />
      {isPassword && hasPassword && (
        <TouchableOpacity
          onPress={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CredentialField;

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
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyle: {
    flex: 1,
    // borderWidth: 2,
  },
});
