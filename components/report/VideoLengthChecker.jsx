import * as React from "react";
import { View, Alert } from "react-native";
import { Video } from "expo-av";

export default function VideoLengthChecker({
  videoFile,
  setVideos,
  setLoading,
  setPreview,
}) {
  const video = React.useRef(null);

  const formatDuration = (milliseconds) => {
    const totalSeconds = milliseconds / 1000;
    const minutes = totalSeconds / 60;

    if (minutes <= 5) {
      setPreview([videoFile]);
    } else {
      setVideos([]);
      setPreview([]);
      Alert.alert(
        "Maximum Video Length Exceeded",
        "The uploaded video exceeds the maximum allowed duration of 5 minutes."
      );
    }
    setLoading(false);
  };

  return (
    <View>
      {videoFile && (
        <Video
          ref={video}
          source={{
            uri: videoFile.uri,
          }}
          onLoad={(data) => formatDuration(data.durationMillis)}
        />
      )}
    </View>
  );
}
