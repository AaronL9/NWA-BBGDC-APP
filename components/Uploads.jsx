import { View, StyleSheet, Text } from "react-native";

import FileNamePreview from "./FileNamePreview";
import { extractFilename } from "../util/stringFormatter";

const Uploads = ({ files, onRemove }) => {
  return (
    <View style={styles.uploadContainer}>
      {files.length !== 0 ? (
        <View style={styles.filePreview}>
          {files.map((file, index) => (
            <FileNamePreview
              key={index}
              fileName={extractFilename(file.uri)}
              onPress={() => onRemove(index)}
            />
          ))}
        </View>
      ) : (
        <Text>No Images/Videos</Text>
      )}
    </View>
  );
};

export default Uploads;

const styles = StyleSheet.create({
  uploadContainer: {
    marginVertical: 22,
    backgroundColor: "#ebf3f3",
    width: "80%",
    alignItems: "center",
    borderRadius: 6,
    paddingVertical: 8,
  },
});
