import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";

export default function NewsView({ route }) {
  const { docId } = route.params;
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `https://nwa-bbgdc-news.vercel.app/${docId}`,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
