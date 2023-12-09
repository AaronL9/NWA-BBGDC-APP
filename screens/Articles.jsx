import { Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";

// firebase
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

// components
import ArticleCard from "../components/ArticleCard.jsx";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const data = [];
      querySnapshot.forEach((doc) => {
        const obj = doc.data();
        obj.id = doc.id;
        data.push(obj);
      });
      setArticles(data);
    };
    fetchArticles();
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
    // borderWidth: 2
  },
});
