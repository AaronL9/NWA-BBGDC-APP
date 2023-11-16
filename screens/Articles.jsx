import { Text, StyleSheet, ScrollView } from "react-native";
import ArticleCard from "../components/ArticleCard";

export default function Articles() {
  return (
    <>
      <ScrollView>
        <Text style={styles.title}>News</Text>
        <ArticleCard />
        <ArticleCard />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: 10,
    // borderWidth: 2
  },
});
