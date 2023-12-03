import { StyleSheet, Text, Pressable, View, TextInput } from "react-native";
import { getLocationHandler } from "../../util/location";
import { Colors } from "../../constants/colors";

const LocationField = ({ setAddress, setCoords, address }) => {
  const getAddressHanlder = async () => {
    await getLocationHandler(setCoords, setAddress);
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={getAddressHanlder}>
        <Text style={styles.textColor}>Use Current location</Text>
      </Pressable>
      <TextInput
        value={address}
        style={[styles.inputStyle]}
        placeholder="Location"
        onChangeText={(value) => setAddress(value)}
      />
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
  textColor: {
    color: Colors.primary200,
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
});
