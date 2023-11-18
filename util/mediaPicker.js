import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

export const pickMedia = async (setFiles) => {

  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0,
      allowsMultipleSelection: true,
      selectionLimit: 3,
    });

    if (!result.canceled) setFiles((prev) => prev.concat(result.assets));
  } catch (error) {
    console.log("Error while selecting file: ", error);
  }
};

export const launchVideoCamera = async (setFiles) => {
  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 0,
    });

    if (!result.canceled) setFiles(result.assets);
  } catch (error) {
    console.log("Error while taking a video: ", error);
  }
};

export const launchCamera = async (setFiles) => {
  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0,
    });

    if (!result.canceled) setFiles((prev) => prev.concat(result.assets));
  } catch (error) {
    console.log("Error while taking a picture: ", error);
  }
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
