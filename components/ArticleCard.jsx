import { Text, Image, View, StyleSheet, Pressable } from "react-native";

export default function ArticleCard() {
  return (
    <>
      <Pressable
        style={{ marginVertical: 25, borderBottomWidth: 1 }}
        onPress={() => console.log("press")}
      >
        <View>
          <Image style={styles.image} source={require("../assets/news.png")} />
          <View style={styles.articleTextContainer}>
            <Text style={styles.articleTitle}>
              Duterte summoned to answer grave threat complaint filed by Rep.
              Castro
            </Text>
            <Text>1 hour ago</Text>
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
    fontWeight: '500',
  }
});
