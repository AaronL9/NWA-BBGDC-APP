import { ScrollView, StyleSheet, Text, View } from "react-native";
import Hotline from "../../components/info_desk/Hotline";
import { hotlines } from "./infoDeskData";
import { Colors } from "../../constants/colors";

export default function InfoDesk() {
  return (
    <ScrollView>
      <View style={styles.outerHotlineContainer}>
        <Text style={styles.title}>Emergency Hotlines</Text>
        <View style={styles.hotlinesContainer}>
          {hotlines.map((hotline, index) => (
            <Hotline key={index} text={hotline} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerHotlineContainer: {
    backgroundColor: Colors.hotlineBackground,
    marginTop: 32,
    paddingVertical: 16,
    width: "90%",
    borderRadius: 6,
    alignSelf: "center",
    gap: 12,
  },
  title: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
  },
  hotlinesContainer: {
    alignSelf: "center",
  },
});
