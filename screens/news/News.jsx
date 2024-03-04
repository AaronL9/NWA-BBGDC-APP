import {
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
} from "react-native";
import { useEffect, useState } from "react";

// firebase
import firestore from "@react-native-firebase/firestore";

// components
import NewsCard from "../../components/NewsCard.jsx";
import { Colors } from "../../constants/colors.js";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const subscriber = firestore()
          .collection("news")
          .onSnapshot((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => {
              const id = doc.id;
              const { title, imageUrl, updatedAt } = doc.data();
              return { id, title, imageUrl, updatedAt };
            });

            setNews(data);
          });

        return () => subscriber();
      } catch (error) {
        alert("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={news}
        renderItem={({ item }) => (
          <NewsCard
            docId={item.id}
            title={item.title}
            updatedAt={item.updatedAt}
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
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary400,
    width: 65,
  },
});
