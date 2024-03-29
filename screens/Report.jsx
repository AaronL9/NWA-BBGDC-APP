import { useContext, useState, useEffect, useRef } from "react";
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

// components
import Uploads from "../components/report/Uploads";
import SubmitButton from "../components/report/SubmitButton";
import LocationField from "../components/report/LocationField";
import { formatDateToString } from "../util/dateFormatter";
import MediaPicker from "../components/report/MediaPicker";
import { getLocationAddress } from "../util/location";
import { validateReportForm } from "../util/report";
import ErrorMessage from "../components/ErrorMessage";
import ProgressModal from "../components/ProgressModal";
import { uuidv4 } from "react-native-compressor";

export default function Report() {
  const { userData, userToken } = useContext(AuthContext);

  const route = useRoute();
  const reportSelectRef = useRef(null);
  const areaSelectRef = useRef(null);
  const isFocused = useIsFocused();

  const initValue = {
    reporteeName: `${userData.firstName} ${userData.lastName}`,
    status: "report",
    offense: "",
    area: "",
    description: "",
  };

  const [offense, setOffense] = useState([]);
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

  const uploadMedia = async (docId, media) => {
    try {
      const urls = await Promise.all(
        media.map(async ({ uri }, index) => {
          const storageRef = storage().ref(`reports/${docId}/${index}`);
          await storageRef.putFile(uri);

          const downloadURL = await storageRef.getDownloadURL();
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

    const isValid = validateReportForm({ ...reports, address }, setError);
    try {
      if (!isValid) {
        throw Error("Please fill out the required fields");
      }

      const uuid = uuidv4();

      const imageURL = await uploadMedia(uuid, images);
      const videoURL = await uploadMedia(uuid, video);

      await firestore()
        .collection("reports")
        .doc(uuid)
        .set({
          ...reports,
          date: formatDateToString(new Date()),
          timestamp: new Date().getTime(),
          geoPoint: coords,
          location: address,
          imageURL,
          videoURL,
        });

      fetch(
        `https://${process.env.EXPO_PUBLIC_API_ENDPOINT}/api/push/alert-admins`,
        {
          method: "GET",
          headers: {
            Authorization: userToken,
          },
        }
      );

      Alert.alert(
        "Report Submitted Successfully!",
        "We have received your report and will take the necessary action"
      );

      setReports(initValue);
      setVideo([]);
      setImages([]);
      setAddress("");
      if (reportSelectRef) {
        reportSelectRef.current.reset();
      }
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

  useEffect(() => {
    const getOffenses = async () => {
      const result = await firestore()
        .collection("static_data")
        .doc("offense")
        .get();

      const options = result.data().options;
      setOffense(options);
    };
    getOffenses();
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.reportContainer}>
        <Text style={styles.sectionTitle}>REPORT DETAILS</Text>
        <View style={styles.inputContainer}>
          {!!offense.length && (
            <SelectDropdown
              ref={reportSelectRef}
              data={offense}
              buttonStyle={[styles.inputStyle]}
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
              buttonTextStyle={{ textTransform: "lowercase" }}
              rowStyle={{ borderColor: "transparent" }}
              rowTextStyle={{
                borderWidth: 0,
                textAlign: "left",
                textTransform: "capitalize",
              }}
              selectedRowTextStyle={{
                color: Colors.primary200,
              }}
              selectedRowStyle={{ backgroundColor: "white", borderRadius: 6 }}
            />
          )}
          <TextInput
            value={reports.description}
            style={[styles.inputStyle, styles.textarea]}
            multiline={true}
            numberOfLines={8}
            editable
            placeholder="Details (e.g. time, location, and relevant information)"
            scrollEnabled
            onChangeText={onChangeHandler.bind(this, "description")}
          />
        </View>
        <LocationField
          setAddress={setAddress}
          setCoords={setCoords}
          address={address}
          coords={coords}
          titleStyle={styles.sectionTitle}
          areaSelectRef={areaSelectRef}
          onChangeHandler={onChangeHandler}
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
    paddingTop: 0,
    textAlignVertical: "top",
    height: 200,
  },
});
