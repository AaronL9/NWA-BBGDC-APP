import { Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";

// firebase
import firestore from "@react-native-firebase/firestore";

// components
import ArticleCard from "../../components/ArticleCard.jsx";
import { Colors } from "../../constants/colors.js";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection("articles")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const obj = doc.data();
          obj.id = doc.id;
          data.push(obj);
        });

        setArticles(data);
      });
    return () => subscriber();
  }, []);

  return (
    <>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <ArticleCard
            title={item.title}
            timestamp={item.createdAt}
            body={item.body}
            imageUrl={item.imageUrl[0]}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.title}>News</Text>}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 16,
    marginLeft: 10,
    // borderWidth: 2
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary400,
    width: 65,
  },
});
