import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import * as DocumentPicker from "expo-document-picker";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import FileNamePreview from "../components/FileNamePreview";
import Uploads from "../components/Uploads";

export default function Report() {
  const [files, setFiles] = useState([]);

  const pickSomething = async () => {
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

  const uploadFile = async () => {
    const uploadPromises = files.map(async ({ uri, name }) => {
      const file = await fetch(uri);
      const blob = await file.blob();

      const storageRef = ref(storage, `images/${name}`);

      return uploadBytes(storageRef, blob);
    });

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

  useEffect(() => {
    console.log(files);
  }, [files]);

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
        <Uploads onPress={pickSomething}>
          {files.length !== 0 && (
            <View style={styles.filePreview}>
              {files.map((file, index) => (
                <FileNamePreview
                  key={index}
                  fileName={file.name}
                  onPress={() => removeFileHanlder(index)}
                />
              ))}
            </View>
          )}
        </Uploads>
        <Button title="Submit" onPress={uploadFile} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'white'
  },
  reportContainer: {
    flex: 1,
    padding: 12,
    paddingTop: 30,
    backgroundColor: "white",
    alignItems: "center",
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
  filePreview: {
    marginTop: 20,
  },
});
