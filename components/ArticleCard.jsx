import { Text, Image, View, StyleSheet, Pressable } from "react-native";
import { formatTimestamp } from "../util/dateFormatter";
import { useNavigation } from "@react-navigation/native";

export default function ArticleCard({ title, timestamp, body }) {
  const navigation = useNavigation();
  return (
    <>
      <Pressable
        style={{ marginVertical: 25, borderBottomWidth: 1 }}
        onPress={() => navigation.navigate("ArticleView", { body })}
      >
        <View>
          <Image style={styles.image} source={require("../assets/news.png")} />
          <View style={styles.articleTextContainer}>
            <Text style={styles.articleTitle}>{title}</Text>
            <Text>{formatTimestamp(timestamp)}</Text>
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
  articleTextContainer: {
    padding: 10,
    rowGap: 10,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
});
