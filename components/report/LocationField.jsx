import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { getLocationHandler } from "../../util/location";
import { Colors } from "../../constants/colors";
import LocationPicker from "./LocationPicker";

const LocationField = ({ setAddress, setCoords, address, titleStyle }) => {
  const [loading, setLoading] = useState(false);

  const getAddressHanlder = async () => {
    setLoading(true);
    await getLocationHandler(setCoords, setAddress);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={titleStyle}>SELECT LOCATION</Text>
      <LocationPicker onGetCurrentLocation={getAddressHanlder} />
      <View style={styles.inputStyle}>
        {loading ? (
          <ActivityIndicator style={styles.loader} size="small" color="black" />
        ) : (
          <Text style={{ fontWeight: "bold" }}>
            {address ? address : "No selected location"}
          </Text>
        )}
      </View>
    </View>
  );
};

export default LocationField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 12,
  },
  pressableText: {
    color: Colors.primary200,
    fontSize: 20,
  },
  inputStyle: {
    backgroundColor: "#f6f6f6",
    borderRadius: 6,
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 8,
    fontSize: 18,
    marginTop: 6,
  },
});
