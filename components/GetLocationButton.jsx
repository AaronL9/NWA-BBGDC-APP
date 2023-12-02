import { StyleSheet, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { getLocationHandler } from "../util/location";
import { Colors } from "../constants/colors";

const GetLocationButton = ({ setAddress, setCoords }) => {
  const getAddressHanlder = async () => {
    await getLocationHandler(setCoords, setAddress);
  };
  return (
    <Pressable onPress={getAddressHanlder}>
      <Text style={styles.textColor}>Use Current location</Text>
    </Pressable>
  );
};

export default GetLocationButton;

const styles = StyleSheet.create({
  textColor: {
    color: Colors.primary200,
  },
});
