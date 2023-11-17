import { Text, TextInput, View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import * as DocumentPicker from "expo-document-picker";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

import { Colors } from "../constants/colors";
import UploadBtn from "../components/UploadBtn";
import { useEffect, useState } from "react";
import FileNamePreview from "../components/FileNamePreview";

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

  const uploadFile = async (uri, name) => {
    const file = await fetch(uri);
    const blob = await file.blob();

    const storageRef = ref(storage, `images/${name}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  const removeFileHanlder = (indexId) => {
    console.log(indexId);
    setFiles((prev) => prev.filter((_, index) => index !== indexId));
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <>
      <View style={styles.rootContainer}>
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
        <UploadBtn onPress={pickSomething}>
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
        </UploadBtn>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    padding: 12,
    paddingTop: 30,
    flex: 1,
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
