import { Alert, Linking } from "react-native";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

const GOOGLE_API_KEY = "AIzaSyDc1tt5TIWOwkIwa_Dh7-YcL1SJB49LP84";

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

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch Address!");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  setAddress(String(address));
}

export async function getAddress(lat, lng) {
  return String(address);
}
