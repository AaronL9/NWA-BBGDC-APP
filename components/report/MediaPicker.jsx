import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";

// native feature
import {
  launchCamera,
  launchVideoCamera,
  pickImages,
  pickVideos,
} from "../../util/mediaPicker";

import OutlinedButton from "./OutlinedButton";

export default function MediaPicker({
  setIsLoading,
  containerStyle,
  titleStyle,
  images,
  video,
  setImages,
  setVideo,
}) {
  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>UPLOAD MEDIA</Text>
      <OutlinedButton
        icon={"videocam"}
        onPress={launchVideoCamera.bind(this, setVideo, setIsLoading, video)}
        text="Take a Video"
      />
      <OutlinedButton
        icon={"camera"}
        onPress={launchCamera.bind(this, setImages, setIsLoading, images)}
        text="Take an Image"
      />
      <OutlinedButton
        icon={"images"}
        onPress={pickImages.bind(this, setImages, setIsLoading, images)}
        text="Attach Images"
      />
      <OutlinedButton
        icon={"film"}
        onPress={pickVideos.bind(this, setVideo, setIsLoading, video)}
        text="Attach a Video"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
