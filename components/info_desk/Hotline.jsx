import { StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Hotline({ text }) {
  return (
    <View style={styles.container}>
      <Entypo name="dot-single" size={24} color="white" />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  }
});
