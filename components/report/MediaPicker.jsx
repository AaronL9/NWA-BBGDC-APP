import { StyleSheet, Text, View } from "react-native";
import React from "react";

// native feature
import {
  pickMedia,
  launchCamera,
  launchVideoCamera,
} from "../../util/mediaPicker";

import OutlinedButton from "./OutlinedButton";

export default function MediaPicker({
  setFiles,
  setIsLoading,
  containerStyle,
  titleStyle,
}) {
  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>UPLOAD MEDIA</Text>
      <OutlinedButton
        icon={"videocam"}
        onPress={launchVideoCamera.bind(this, setFiles, setIsLoading)}
        text="Take a Video"
      />
      <OutlinedButton
        icon={"camera"}
        onPress={launchCamera.bind(this, setFiles, setIsLoading)}
        text="Take an Image"
      />
      <OutlinedButton
        icon={"images"}
        onPress={pickMedia.bind(this, setFiles, setIsLoading)}
        text="Attach Images/Videos"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
