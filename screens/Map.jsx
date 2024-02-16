import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconBtn from "../components/global/IconBtn";
import SearchLocation from "../components/report/SearchLocation.jsx";

export default function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const region = {
    latitude: selectedLocation?.lat ?? 16.07199971187593,
    longitude: selectedLocation?.lng ?? 120.34104072737861,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location (by tapping on the map) first!"
      );
      return;
    }

    navigation.navigate("Report", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconBtn
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <View style={{ flex: 1 }}>
      <SearchLocation setCoords={setSelectedLocation} />
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={selectLocationHandler}
        zoomEnabled
        minZoomLevel={15}
        mapType="hybrid"
        loadingEnabled
        zoomControlEnabled
      >
        {selectedLocation && (
          <Marker
            title="Picked Location"
            accessibilityLabel=""
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
            draggable={true}
            onDragStart={(e) => {
              console.log("Drag Start", e.nativeEvent.coordinate);
            }}
            onDragEnd={(e) => {
              const lat = e.nativeEvent.coordinate.latitude;
              const lng = e.nativeEvent.coordinate.longitude;
              setSelectedLocation({ lat, lng });
            }}
            on
          />
        )}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
