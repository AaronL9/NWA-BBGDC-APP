import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OutlinedButton from "./OutlinedButton";
import { useNavigation } from "@react-navigation/native";

export default function LocationPicker({ onGetCurrentLocation }) {
  const navigation = useNavigation();
  return (
    <View style={styles.locationBtnContainer}>
      <OutlinedButton
        onPress={() => navigation.navigate("Map")}
        text="Pick on map"
        icon="map"
      />
      <OutlinedButton
        onPress={onGetCurrentLocation}
        text="Use device location"
        icon="location"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  locationBtnContainer: {
    alignItems: "stretch",
  },
});
