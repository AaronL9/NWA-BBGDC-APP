import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileIconBtn({ name, onPressHanlder }) {
  return (
    <TouchableOpacity onPress={onPressHanlder}>
      <Ionicons name={name} size={32} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
