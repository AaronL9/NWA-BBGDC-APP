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
import { useState } from "react";

const LocationField = ({ setAddress, setCoords, address }) => {
  
  const [loading, setLoading] = useState(false);
  const getAddressHanlder = async () => {
    setLoading(true);
    await getLocationHandler(setCoords, setAddress);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={getAddressHanlder}>
        <Text style={styles.pressableText}>Use Current location</Text>
      </Pressable>
      <TextInput
        value={address}
        style={[styles.inputStyle]}
        placeholder="Location"
        onChangeText={(value) => setAddress(value)}
      />
      {loading && (
        <ActivityIndicator style={styles.loader} size="small" color="black" />
      )}
    </View>
  );
};

export default LocationField;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginTop: 12,
    // borderWidth: 2,
  },
  pressableText: {
    color: Colors.primary200,
    fontSize: 20,
  },
  inputStyle: {
    backgroundColor: "#f6f6f6",
    borderBottomColor: Colors.primary400,
    borderBottomWidth: 2,
    borderRadius: 6,
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 8,
    fontSize: 18,
    marginTop: 6,
  },
  loader: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 35,
    bottom: 0,
  },
});
