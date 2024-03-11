import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { getLocationHandler } from "../../util/location";
import { Colors } from "../../constants/colors";
import LocationPicker from "./LocationPicker";
import firestore from "@react-native-firebase/firestore";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialIcons } from "@expo/vector-icons";

const LocationField = ({
  setAddress,
  setCoords,
  address,
  titleStyle,
  areaSelectRef,
  onChangeHandler,
}) => {
  const [loading, setLoading] = useState(false);
  const [area, setArea] = useState([]);

  const getAddressHanlder = async () => {
    await getLocationHandler(setCoords, setAddress, setLoading);
  };

  useEffect(() => {
    const getAreas = async () => {
      const areas = await firestore()
        .collection("static_data")
        .doc("area")
        .get();

      setArea(areas.data().options);
    };
    getAreas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={titleStyle}>SELECT LOCATION</Text>
      {!!area.length && (
        <SelectDropdown
          ref={areaSelectRef}
          data={area}
          buttonStyle={[styles.selectStyle]}
          renderDropdownIcon={() => (
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          )}
          onSelect={(selectedItem) => onChangeHandler("area", selectedItem)}
          defaultButtonText="Select area"
          dropdownStyle={{ borderRadius: 4, padding: 8 }}
          buttonTextStyle={{ textTransform: "lowercase" }}
          rowStyle={{ borderColor: "transparent" }}
          rowTextStyle={{
            borderWidth: 0,
            textAlign: "left",
            textTransform: "capitalize",
          }}
          selectedRowTextStyle={{
            color: Colors.primary200,
          }}
          selectedRowStyle={{ backgroundColor: "white", borderRadius: 6 }}
        />
      )}
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
  selectStyle: {
    backgroundColor: "#f6f6f6",
    borderBottomColor: Colors.primary400,
    borderBottomWidth: 2,
    borderRadius: 6,
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 8,
    fontSize: 18,
    marginBottom: 12,
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
