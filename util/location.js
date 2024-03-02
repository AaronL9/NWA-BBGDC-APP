import { Alert, Linking } from "react-native";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

async function verifyPermissions() {
  const { status } = await requestForegroundPermissionsAsync();
  console.log(status);
  if (status === "denied") {
    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant location permissions to use this app.",
      [
        { text: "cancel" },
        { text: "Go to settings", onPress: () => Linking.openSettings() },
      ]
    );
    return false;
  }
  return true;
}

export async function getLocationHandler(setCoords, setAddress, setLoading) {
  const hasPermission = await verifyPermissions();

  if (!hasPermission) {
    return;
  }

  setLoading(true);
  const location = await getCurrentPositionAsync();
  const lat = location.coords.latitude;
  const lng = location.coords.longitude;
  setCoords({ lat, lng });

  try {
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_API_KEY}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&location_type=ROOFTOP&key=${process.env.EXPO_PUBLIC_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch Address!");
    }

    const address = [];
    for (let i = 0; i < 3; i++) {
      const address_component =
        data?.results[0]?.address_components[i]?.long_name;
      if (!address_component) throw new Error("No address components found");

      address.push(address_component);
    }

    setAddress(String(address.join(", ")));
  } catch (error) {
    Alert.alert("Something went wrong", "sorry we can't get your location");
    console.log(error.message);
  } finally {
    setLoading(false);
  }
}

export async function getLocationAddress(coords, setAddress) {
  const { lat, lng } = coords;

  try {
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_API_KEY}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&location_type=ROOFTOP&key=${process.env.EXPO_PUBLIC_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok) {
      throw new Error("Failed to fetch Address!");
    }

    const address = [];
    for (let i = 0; i < 3; i++) {
      const address_component =
        data?.results[0]?.address_components[i]?.long_name;
      if (!address_component) throw new Error("No address components found");

      address.push(address_component);
    }

    setAddress(String(address.join(", ")));
  } catch (error) {
    Alert.alert(
      "Location Services Error",
      "There seems to be an error with your device's location services. Please check your settings and ensure they are functioning properly. If you need help, feel free to reach out to our support team."
    );
    console.log(error.message);
  }
}
