import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

import FileNamePreview from "./FileNamePreview";
import { extractFilename } from "../../util/stringFormatter";

export default function Uploads({
  isLoading,
  images,
  video,
  onRemoveImage,
  onRemoveVideo,
}) {
  return (
    <View style={styles.uploadContainer}>
      {video.length !== 0 && (
        <View style={styles.filePreview}>
          {video.map((vid, index) => (
            <FileNamePreview
              key={index}
              fileName={extractFilename(vid.uri)}
              fileType={vid.type}
              onPress={() => onRemoveVideo(index)}
            />
          ))}
        </View>
      )}
      {images.length !== 0 && (
        <View style={styles.filePreview}>
          {images.map((image, index) => (
            <FileNamePreview
              key={index}
              fileName={extractFilename(image.uri)}
              fileType={image.type}
              onPress={() => onRemoveImage(index)}
            />
          ))}
        </View>
      )}

      {video.length === 0 && images.length === 0 && !isLoading && (
        <Text>No image/videos attach</Text>
      )}
      {isLoading && <ActivityIndicator size="small" color="black" />}
    </View>
  );
}

const styles = StyleSheet.create({
  uploadContainer: {
    marginTop: 10,
    backgroundColor: "#ebf3f3",
    width: "100%",
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 8,
    marginBottom: 10,
    gap: 5,
  },
  filePreview: {
    gap: 5,
  },
});
