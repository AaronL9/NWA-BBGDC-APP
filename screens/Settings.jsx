import {
  Alert,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import ProfileInfoEditor from "../components/settings/ProfileInfoEditor";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import firestore from "@react-native-firebase/firestore";
import ProfileIconBtn from "../components/settings/ProfileIconBtn";
import ProfileInfoBirthDate from "../components/settings/ProfileInfoBirthDate";
import ProfileInfoAddress from "../components/settings/ProfileInfoAddress";
import { getAge } from "../util/AgeCalculator";
import ProfileInfoArea from "../components/settings/ProfileInfoArea";

export default function Settings() {
  const { userData, setUserData } = useContext(AuthContext);

  const [data, setData] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onUpdateHandler = async () => {
    setLoading(true);
    setIsEditing(false);

    try {
      const age = getAge(data.birthdate);
      if (!isNaN(age)) data.age = age;
      await firestore().collection("users").doc(userData.uid).update(data);
      setUserData(data);
      Alert.alert("Updated", "You have successfully updated your profile");
    } catch (error) {
      const message = error.message ?? "can't update your profile";
      Alert.alert("Error", message);
    }
    setLoading(false);
  };

  const onCancleHandler = () => {
    setData(userData);
    setIsEditing(false);
  };

  const onEditHandler = () => {
    setIsEditing(true);
  };

  return (
    <ScrollView>
      <View style={styles.settingsContainer}>
        <View style={{ alignItems: "flex-end" }}>
          {loading ? (
            <ActivityIndicator color="black" size="small" />
          ) : isEditing ? (
            <View style={{ flexDirection: "row", gap: 8 }}>
              <ProfileIconBtn
                name={"checkmark-sharp"}
                onPressHanlder={onUpdateHandler}
              />
              <ProfileIconBtn name={"close"} onPressHanlder={onCancleHandler} />
            </View>
          ) : (
            <ProfileIconBtn
              name="create-outline"
              onPressHanlder={onEditHandler}
            />
          )}
        </View>
        <ProfileInfoEditor
          label="FIRST NAME"
          currentValue={data.firstName}
          setData={setData}
          propKey={"firstName"}
          isEditing={isEditing}
        />
        <ProfileInfoEditor
          label="LAST NAME"
          currentValue={data.lastName}
          setData={setData}
          propKey={"lastName"}
          isEditing={isEditing}
        />
        <ProfileInfoBirthDate
          label="BIRTHDATE"
          currentValue={data.birthdate}
          setData={setData}
          propKey={"birthdate"}
          isEditing={isEditing}
        />
        <ProfileInfoEditor
          label="HOUSE ADDRESS"
          currentValue={data.houseAddress}
          setData={setData}
          propKey={"houseAddress"}
          isEditing={isEditing}
        />
        <ProfileInfoArea
          label="AREA"
          currentValue={data.area}
          setData={setData}
          propKey={"area"}
          isEditing={isEditing}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    width: "80%",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 18,
    gap: 12,
  },
});
