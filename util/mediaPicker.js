import { Alert, Linking } from "react-native";
import { Video, getVideoMetaData } from "react-native-compressor";
import * as ImagePicker from "expo-image-picker";

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

export const launchVideoCamera = async (
  setFiles,
  setIsLoading,
  files,
  setCompressing
) => {
  const permission = await verifyCameraPermission();
  if (!permission) return;

  setIsLoading(true);
  try {
    if (files.length > 0) throw new Error("You can only upload one video");

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 0,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const metaData = await getVideoMetaData(uri);

      if (metaData.duration > 200)
        throw new Error(
          "The uploaded video exceeds the maximum allowed duration of 5 minutes."
        );

      let currentUri = uri;
      if (metaData.size > 25) {
        const compressed = await Video.compress(
          result.assets[0].uri,
          {
            compressionMethod: "manual",
            bitrate: 0.1,
            progressDivider: 5,
          },
          (progress) => {
            setCompressing(` ${(progress * 100).toFixed(2)}%`);
          }
        );
        currentUri = compressed;
      }

      const assets = [{ ...result.assets[0], uri: currentUri }];
      setFiles((prev) => prev.concat(assets));
    }
  } catch (error) {
    Alert.alert("Sorry", error.message);
    console.log("Error while taking a video: ", error);
  } finally {
    setIsLoading(false);
    setCompressing(false);
  }
};

export const launchCamera = async (setFiles, setIsLoading, files) => {
  const permission = await verifyCameraPermission();

  if (!permission) return;

  setIsLoading(true);
  try {
    if (files.length >= 4)
      throw new Error("You've reach the maximum number of image to upload");

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      if (result.assets.length + files.length > 4)
        throw new Error("You can only upload 4 images");
      setFiles((prev) => prev.concat(result.assets));
    }
  } catch (error) {
    console.log("Error while taking a picture: ", error);
    Alert.alert("Sorry", error.message);
  }
  setIsLoading(false);
};

export const pickImages = async (setFiles, setIsLoading, files) => {
  const permission = await verifyMediaLibrary();
  if (!permission) return;

  setIsLoading(true);
  try {
    console.log(files.length);
    if (files.length >= 4)
      throw new Error("You've reach the maximum number of image to upload");

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsMultipleSelection: true,
      selectionLimit: 4,
    });

    if (!result.canceled) {
      if (result.assets.length + files.length > 4)
        throw new Error("You can only upload 4 images");

      setFiles((prev) => prev.concat(result.assets));
    }
  } catch (error) {
    Alert.alert("Sorry", error.message);
    console.log("Error while selecting file: ", error);
  }
  setIsLoading(false);
};

export const pickVideos = async (
  setFiles,
  setIsLoading,
  files,
  setCompressing
) => {
  const permission = await verifyMediaLibrary();
  if (!permission) return;

  setIsLoading(true);
  try {
    if (files.length > 0) throw new Error("You can only upload one video");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 0.1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const metaData = await getVideoMetaData(uri);

      if (metaData.duration > 200)
        throw new Error(
          "The uploaded video exceeds the maximum allowed duration of 5 minutes."
        );

      let currentUri = uri;
      if (metaData.size > 1) {
        const compressed = await Video.compress(
          result.assets[0].uri,
          {
            compressionMethod: "manual",
            bitrate: 0.1,
            progressDivider: 5,
          },
          (progress) => {
            setCompressing(` ${(progress * 100).toFixed(2)}%`);
            console.log(
              `compression progress: ${(progress * 100).toFixed(2)}%`
            );
          }
        );
        currentUri = compressed;
      }

      console.log(JSON.stringify(metaData, null, 2));
      const assets = [{ ...result.assets[0], uri: currentUri }];
      setFiles((prev) => prev.concat(assets));
    }
  } catch (error) {
    Alert.alert("Sorry", error.message);
    console.log("Error while selecting file: ", error);
  } finally {
    setIsLoading(false);
    setCompressing(false);
  }
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
