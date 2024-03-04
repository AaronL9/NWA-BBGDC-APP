import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { formatTimeAgo } from "../util/dateFormatter";
import { useNavigation } from "@react-navigation/native";

export default function NewsCard({ docId, title, updatedAt, imageUrl }) {
  const navigation = useNavigation();
  return (
    <>
      <Pressable
        style={{ marginVertical: 8 }}
        onPress={() => navigation.navigate("NewsView", { docId })}
      >
        <View>
          <Image style={styles.image} source={{ uri: imageUrl }} />
          <View style={styles.newsTextContainer}>
            <Text style={styles.newsTitle}>{title}</Text>
            <Text>{formatTimeAgo(updatedAt)}</Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
  newsTextContainer: {
    padding: 10,
    rowGap: 10,
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
});
