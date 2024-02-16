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

export async function getLocationHandler(setCoords, setAddress) {
  const hasPermission = await verifyPermissions();

  if (!hasPermission) {
    return;
  }

  const location = await getCurrentPositionAsync();
  const lat = location.coords.latitude;
  const lng = location.coords.longitude;
  setCoords({ lat, lng });

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const address = data.results[0].formatted_address;
    setAddress(String(address));
    if (!response.ok) {
      throw new Error("Failed to fetch Address!");
    }
  } catch (error) {
    Alert.alert("Something went wrong", "sorry we can't get your location");
    console.log(error.message);
  }
}

export async function getLocationAddress(coords, setAddress) {
  const { lat, lng } = coords;

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const address = data.results[0].formatted_address;
    setAddress(String(address));
    if (!response.ok) {
      throw new Error("Failed to fetch Address!");
    }
  } catch (error) {
    console.log(error);
  }
}
