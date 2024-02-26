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
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";

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
import { dummyData } from "../sample_data";
import { validateReportForm } from "../util/report";
import ErrorMessage from "../components/ErrorMessage";
import VideoLengthChecker from "../components/report/VideoLengthChecker";
import ProgressModal from "../components/ProgressModal";

export default function Report() {
  const { userData } = useContext(AuthContext);

  const route = useRoute();
  const isFocused = useIsFocused();

  const initValue = {
    reporteeName: `${userData.firstName} ${userData.lastName}`,
    status: "report",
    offense: "",
    description: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [error, setError] = useState({});

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);

  const [reports, setReports] = useState(initValue);
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState(null);

  const removeImageHandler = (indexId) => {
    setImages((prev) => prev.filter((_, index) => index !== indexId));
  };
  const removeVideoHandler = (indexId) => {
    setVideo((prev) => prev.filter((_, index) => index !== indexId));
  };

  const uploadMedia = async (docId, media, type) => {
    try {
      const urls = await Promise.all(
        media.map(async ({ uri }) => {
          const filename = extractFilename(uri);
          const file = await fetch(uri);
          const blob = await file.blob();

          const storageRef = storage().ref(
            `reports/${docId}/${type}/${filename}`
          );
          await storageRef.put(blob);

          // Ensure storageRef is properly created before getting downloadURL
          const downloadURL = await storageRef.getDownloadURL();
          console.log(downloadURL);
          return downloadURL;
        })
      );

      return urls;
    } catch (error) {
      console.error("Error uploading media:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  };

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
    console.log(reports);
    const isValid = validateReportForm({ ...reports, address }, setError);
    try {
      if (!isValid) {
        throw Error("Please fill out the required fields");
      }

      const imageURL = await uploadMedia(userData.uid, images, "images");
      const videoURL = await uploadMedia(userData.uid, video, "videos");

      await firestore()
        .collection("reports")
        .add({
          ...reports,
          date: formatDateToString(new Date()),
          timestamp: new Date().getTime(),
          geoPoint: coords,
          location: address,
          imageURL,
          videoURL,
        });

      // dummyData.forEach(async (data) => {
      //   await addDoc(collection(db, "reports"), {
      //     ...data,
      //     date: formatDateToString(new Date(data.date)),
      //     timestamp: new Date(data.date).getTime(),
      //   });
      // });

      Alert.alert(
        "Report Submitted Successfully!",
        "We have received your report and will take the necessary action"
      );

      setReports(initValue);
      setVideo([]);
      setImages([]);
      setVideoPreview([]);
      setAddress("");
    } catch (error) {
      console.log("Error submitting your report: ", error);
      Alert.alert("Something went wrong", error.message);
    }
    setIsUploading(false);
  };

  useEffect(() => {
    const fetchLocationAddress = async () => {
      if (isFocused && route.params) {
        const mapPickedLocation = {
          lat: route.params.pickedLat,
          lng: route.params.pickedLng,
        };
        setCoords(mapPickedLocation);
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
            defaultButtonText="Select an offense"
            dropdownStyle={{ borderRadius: 4, padding: 8 }}
            rowStyle={{ borderColor: "transparent" }}
            rowTextStyle={{ borderWidth: 0, textAlign: "left" }}
            selectedRowTextStyle={{ color: Colors.primary200 }}
            selectedRowStyle={{ backgroundColor: "white", borderRadius: 6 }}
          />
          <TextInput
            value={reports.description}
            style={[styles.inputStyle, styles.textarea]}
            multiline={true}
            numberOfLines={8}
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
          setImages={setImages}
          setVideo={setVideo}
          images={images}
          video={video}
          setIsLoading={setIsLoading}
          containerStyle={styles.buttonsContainer}
          titleStyle={styles.sectionTitle}
          setCompressing={setCompressing}
        />
        <Uploads
          images={images}
          video={video}
          onRemoveImage={removeImageHandler}
          onRemoveVideo={removeVideoHandler}
          isLoading={isLoading}
        />
        <ErrorMessage errors={error} />
        <SubmitButton onPress={uploadFile} uploading={isUploading} />
      </View>
      <ProgressModal progress={compressing} />
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
