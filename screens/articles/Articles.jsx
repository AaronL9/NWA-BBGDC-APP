import { Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";

// firebase
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase.js";

// components
import ArticleCard from "../../components/ArticleCard.jsx";
import { Colors } from "../../constants/colors.js";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = () => {
      const articlesCollection = collection(db, "articles");

      const unsubscribe = onSnapshot(articlesCollection, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const obj = doc.data();
          obj.id = doc.id;
          data.push(obj);
        });

        setArticles(data);
      });
      return unsubscribe;
    };

    const unsubscribe = fetchArticles();

    return () => {
      unsubscribe();
    };
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
