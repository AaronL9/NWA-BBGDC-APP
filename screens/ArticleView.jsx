import { View, StyleSheet, useWindowDimensions } from "react-native";
import HTML from "react-native-render-html";

const ArticleView = ({ route }) => {
  const { body } = route.params;
  const { height, width } = useWindowDimensions();
  console.log(body);
  return (
    <View style={styles.container}>
      <HTML
        source={{ html: body }}
        baseFontStyle={{ fontSize: 16, fontFamily: "Arial" }}
        contentWidth={width}
        tagsStyles={{
          p: { margin: 0 },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
});

export default ArticleView;
