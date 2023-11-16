import { Text, TextInput, View, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import * as DocumentPicker from "expo-document-picker";

import { Colors } from "../constants/colors";
import UploadBtn from "../components/UploadBtn";
import { useState } from "react";

export default function Report() {
  const [imageUri, setImageUri] = useState();
  const pickSomething = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "video/*"],
      });

      console.log(docRes);
      setImageUri(docRes.assets[0].uri);
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };

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
            numberOfLines={10}
            selectTextOnFocus={true}
            editable
            placeholder="Desciprtion (optional)"
          />
          <TextInput style={[styles.inputStyle]} placeholder="Location" />
        </View>
        <UploadBtn onPress={pickSomething} />
        {imageUri && (
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: imageUri }}
          />
        )}
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
  dropdownStyle: {},
});