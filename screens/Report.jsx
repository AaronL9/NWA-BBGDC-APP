import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import { ref, uploadBytes } from "firebase/storage";

import {
  pickMedia,
  launchCamera,
  launchVideoCamera,
} from "../util/mediaPicker";
import { storage } from "../config/firebase";
import { Colors } from "../constants/colors";
import Uploads from "../components/Uploads";
import OutlinedButton from "../components/OutlinedButton";
import { extractFilename } from "../util/stringFormatter";

export default function Report() {
  const [files, setFiles] = useState([]);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadFile = async () => {
    const uploadPromises = files.map(async ({ uri }) => {
      const filename = extractFilename(uri);
      const file = await fetch(uri);
      const blob = await file.blob();

      const storageRef = ref(storage, `images/${filename}`);

      return uploadBytes(storageRef, blob);
    });

    console.log(status);

    try {
      const snapshots = await Promise.all(uploadPromises);

      console.log("All uploads complete!");
      setFiles([]);
      snapshots.forEach((snapshot) => {
        console.log("File uploaded:", snapshot.metadata.name);
      });
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const removeFileHanlder = (indexId) => {
    console.log(indexId);
    setFiles((prev) => prev.filter((_, index) => index !== indexId));
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.reportContainer}>
        <Text style={styles.title}>Report</Text>
        <View style={styles.inputContainer}>
          <SelectDropdown
            defaultValue={"1"}
            data={["1", "2", "3"]}
            buttonStyle={[styles.inputStyle, styles.dropdownStyle]}
            renderDropdownIcon={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            )}
          />
          <TextInput
            style={[styles.inputStyle, styles.textarea]}
            multiline={true}
            numberOfLines={8}
            selectTextOnFocus={true}
            editable
            placeholder="Desciprtion (optional)"
          />
          <TextInput style={[styles.inputStyle]} placeholder="Location" />
        </View>
        <View style={styles.mediaButtonsContainer}>
          <OutlinedButton
            icon={"videocam-outline"}
            onPress={launchVideoCamera.bind(this, setFiles)}
          >
            Take a Video
          </OutlinedButton>
          <OutlinedButton
            icon={"camera-outline"}
            onPress={launchCamera.bind(this, setFiles)}
          >
            Take an Image
          </OutlinedButton>
          <OutlinedButton
            icon={"attach"}
            onPress={pickMedia.bind(this, setFiles)}
          >
            Attach Images/Videos
          </OutlinedButton>
        </View>
        <Uploads files={files} onRemove={removeFileHanlder} />
        <Button title="Submit" onPress={uploadFile} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  reportContainer: {
    flex: 1,
    padding: 12,
    paddingTop: 30,
    backgroundColor: "white",
    alignItems: "center",
    // borderWidth: 5,
  },
  mediaButtonsContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },
  title: {
    fontSize: 28,
    borderBottomWidth: 3,
    textAlign: "center",
    width: 100,
    alignSelf: "center",
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
  },
  inputStyle: {
    backgroundColor: "#f6f6f6",
    borderBottomColor: Colors.primary400,
    borderBottomWidth: 2,
    borderRadius: 6,
    width: "80%",
    marginTop: 16,
    paddingHorizontal: 5,
  },
  textarea: {
    // paddingBottom: 100,
    alignItems: "flex-start",
    textAlignVertical: "top",
  },
});
