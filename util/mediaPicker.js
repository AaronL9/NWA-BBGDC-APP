import { Alert, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

const verifyCameraPermission = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  console.log(status);
  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "to access the camera please allow the camera permission in the app settings",
      [
        { text: "cancel" },
        { text: "Go to settings", onPress: () => Linking.openSettings() },
      ]
    );
    return false;
  }

  return true;
};

const verifyMediaLibrary = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "Please allow the Files and Media permission in the app settings",
      [
        { text: "cancel" },
        { text: "Go to settings", onPress: () => Linking.openSettings() },
      ]
    );
    return false;
  }

  return true;
};

export const pickMedia = async (setFiles, setIsLoading) => {
  const permission = await verifyMediaLibrary();
  if (!permission) return;

  setIsLoading(true);
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0,
      allowsMultipleSelection: true,
      selectionLimit: 3,
    });

    if (!result.canceled) {
      setFiles((prev) => prev.concat(result.assets));
    }
  } catch (error) {
    console.log(permission);
    console.log("Error while selecting file: ", error);
  }
  setIsLoading(false);
};

export const launchVideoCamera = async (setFiles, setIsLoading) => {
  const permission = await verifyCameraPermission();
  if (!permission) return;

  setIsLoading(true);
  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 0,
    });

    if (!result.canceled) setFiles((prev) => prev.concat(result.assets));
  } catch (error) {
    console.log("Error while taking a video: ", error);
  }
  setIsLoading(false);
};

export const launchCamera = async (setFiles, setIsLoading) => {
  const permission = await verifyCameraPermission();

  if (!permission) return;

  setIsLoading(true);
  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) setFiles((prev) => prev.concat(result.assets));
  } catch (error) {
    console.log("Error while taking a picture: ", error);
  }
  setIsLoading(false);
};

export const pickFiles = async (setFiles) => {
  try {
    const docRes = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "video/*"],
      multiple: true,
    });

    const assets = docRes.assets;
    if (!docRes.canceled) setFiles((prev) => prev.concat(assets));
  } catch (error) {
    console.log("Error while selecting file: ", error);
  }
};
