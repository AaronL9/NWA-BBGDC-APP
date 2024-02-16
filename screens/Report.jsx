import { useContext, useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import { Colors } from "../constants/colors";
import { AuthContext } from "../context/authContext";

// firebase
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

// navigation
import { useRoute, useIsFocused } from "@react-navigation/native";

// util
import { offense } from "../util/staticData";
import { extractFilename } from "../util/stringFormatter";

// components
import Uploads from "../components/report/Uploads";
import SubmitButton from "../components/report/SubmitButton";
import LocationField from "../components/report/LocationField";
import { formatDateToString } from "../util/dateFormatter";
import MediaPicker from "../components/report/MediaPicker";
import { getLocationAddress } from "../util/location";
import SearchLocation from "../components/report/SearchLocation";
// import { dummyData } from "../sample_data";

export default function Report() {
  const { userData } = useContext(AuthContext);

  const route = useRoute();
  const isFocused = useIsFocused();

  const initValue = {
    reporteeName: `${userData.firstName} ${userData.lastName}`,
    contactNum: userData.contactNum,
    status: "report",
    offense: "",
    description: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [files, setFiles] = useState([]);
  const [reports, setReports] = useState(initValue);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

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
        date: formatDateToString(new Date()),
        timestamp: new Date().getTime(),
        geoPoint: coords,
        location: address,
      });

      // dummyData.forEach(async (data) => {
      //   await addDoc(collection(db, "reports"), {
      //     ...data,
      //     date: formatDateToString(new Date(data.date)),
      //     timestamp: new Date(data.date).getTime(),
      //   });
      // });

      files.forEach(async ({ uri }) => {
        const filename = extractFilename(uri);
        const file = await fetch(uri);
        const blob = await file.blob();

        const storageRef = ref(storage, `reports/${docRef.id}/${filename}`);

        uploadBytes(storageRef, blob);
      });

      Alert.alert("Succesful", "Your report has been submitted");
      setReports(initValue);
      setFiles([]);
      setAddress("");
    } catch (error) {
      Alert.alert("Error uploading files", error);
    }
    setIsUploading(false);
  };

  const removeFileHanlder = (indexId) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexId));
  };

  useEffect(() => {
    const fetchLocationAddress = async () => {
      if (isFocused && route.params) {
        const mapPickedLocation = {
          lat: route.params.pickedLat,
          lng: route.params.pickedLng,
        };
        await getLocationAddress(mapPickedLocation, setAddress);
      }
    };
    fetchLocationAddress();
  }, [route, isFocused]);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.reportContainer}>
        <Text style={styles.sectionTitle}>REPORT DETAILS</Text>
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
        </View>
        <LocationField
          setAddress={setAddress}
          setCoords={setCoords}
          address={address}
          coords={coords}
          titleStyle={styles.sectionTitle}
        />
        <MediaPicker
          setFiles={setFiles}
          setIsLoading={setIsLoading}
          containerStyle={styles.buttonsContainer}
          titleStyle={styles.sectionTitle}
        />
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
    paddingTop: 15,
    paddingBottom: 30,
    backgroundColor: "white",
    alignSelf: "center",
    width: "80%",
  },
  buttonsContainer: {
    flex: 1,
    alignItems: "stretch",
    marginTop: 25,
  },
  title: {
    fontSize: 28,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    textAlign: "center",
    alignSelf: "stretch",
    textTransform: "uppercase",
    fontWeight: "bold",
    backgroundColor: "#303134",
    color: "white",
    borderRadius: 8,
    paddingVertical: 4,
  },
  sectionTitle: {
    fontWeight: "bold",
    borderLeftWidth: 3,
    borderLeftColor: Colors.bgPrimaary400,
    paddingLeft: 12,
    fontSize: 18,
    marginBottom: 12,
    marginTop: 8,
    marginLeft: 4,
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
    gap: 12,
  },
  inputStyle: {
    backgroundColor: "#f6f6f6",
    borderBottomColor: Colors.primary400,
    borderBottomWidth: 2,
    borderRadius: 6,
    width: "100%",
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
