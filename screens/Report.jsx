import { useContext, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/authContext";

// firebase
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// native feature
import {
  pickMedia,
  launchCamera,
  launchVideoCamera,
} from "../util/mediaPicker";

// util
import { offense } from "../util/staticData";
import { extractFilename } from "../util/stringFormatter";

// components
import Uploads from "../components/Uploads";
import OutlinedButton from "../components/OutlinedButton";
import SubmitButton from "../components/SubmitButton";
import { getLocationHandler } from "../util/location";
import GetLocationButton from "../components/GetLocationButton";

const initValue = {
  offense: "",
  description: "",
};

export default function Report() {
  const { userData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [files, setFiles] = useState([]);
  const [reports, setReports] = useState(initValue);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState({ lat: 0, long: 0 });
  console.log("Data: ", address);

  const onChangeHandler = (inputIdentifier, enteredValue) => {
    setReports((currentValue) => {
      return {
        ...currentValue,
        [inputIdentifier]: enteredValue,
      };
    });
  };

  const uploadFile = async () => {
    setIsUploading(true);
    try {
      const docRef = await addDoc(collection(db, "reports"), {
        ...reports,
        reporteeName: `${userData.firstName} ${userData.lastName}`,
        contactNum: userData.contactNum,
        createdAt: serverTimestamp(),
      });
      const uploadPromises = files.map(async ({ uri }) => {
        const filename = extractFilename(uri);
        const file = await fetch(uri);
        const blob = await file.blob();

        const storageRef = ref(
          storage,
          `reports/${userData.uid}/${docRef.id}/${filename}`
        );

        return uploadBytes(storageRef, blob);
      });

      const snapshots = await Promise.all(uploadPromises);

      Alert.alert("Succesful", "Your report has been submitted");
      setReports(initValue);
      setFiles([]);
      snapshots.forEach((snapshot) => {
        console.log("File uploaded:", snapshot.metadata.name);
      });
    } catch (error) {
      Alert.alert("Error uploading files", error);
    }
    setIsUploading(false);
  };

  const removeFileHanlder = (indexId) => {
    console.log(indexId);
    setFiles((prev) => prev.filter((_, index) => index !== indexId));
  };

  // useEffect(() => {
  //   console.log(reports);
  // }, [reports]);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.reportContainer}>
        <Text style={styles.title}>Report</Text>
        <View style={styles.inputContainer}>
          <SelectDropdown
            defaultValue={reports.offense}
            data={offense}
            buttonStyle={[styles.inputStyle, styles.dropdownStyle]}
            renderDropdownIcon={() => (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            )}
            onSelect={(selectedItem) =>
              onChangeHandler("offense", selectedItem)
            }
          />
          <TextInput
            value={reports.description}
            style={[styles.inputStyle, styles.textarea]}
            multiline={true}
            numberOfLines={8}
            selectTextOnFocus={true}
            editable
            placeholder="Desciprtion (optional)"
            onChangeText={onChangeHandler.bind(this, "description")}
          />
          <GetLocationButton setAddress={setAddress} setCoords={setCoords} testing={"testing"}/>
          <TextInput
            value={address}
            style={[styles.inputStyle]}
            placeholder="Location"
            onChangeText={(value) => setAddress(value)}
          />
        </View>
        <View style={styles.mediaButtonsContainer}>
          <OutlinedButton
            icon={"videocam-outline"}
            onPress={launchVideoCamera.bind(this, setFiles, setIsLoading)}
          >
            Take a Video
          </OutlinedButton>
          <OutlinedButton
            icon={"camera-outline"}
            onPress={launchCamera.bind(this, setFiles, setIsLoading)}
          >
            Take an Image
          </OutlinedButton>
          <OutlinedButton
            icon={"attach"}
            onPress={pickMedia.bind(this, setFiles, setIsLoading)}
          >
            Attach Images/Videos
          </OutlinedButton>
        </View>
        <Uploads
          files={files}
          onRemove={removeFileHanlder}
          isLoading={isLoading}
        />
        <SubmitButton onPress={uploadFile} uploading={isUploading} />
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
    paddingVertical: 8,
    fontSize: 18,
  },
  textarea: {
    // paddingBottom: 100,
    alignItems: "flex-start",
    textAlignVertical: "top",
  },
});