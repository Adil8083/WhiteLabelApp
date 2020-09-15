import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function ImageList({ movieList = [] }) {
  const scrollView = useRef();
  console.log(movieList);
  movieList.map((item) => {
    console.log(item.imageUri);
  });
  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {movieList.map((item) => (
            <View key={item} style={styles.image}>
              <Text>{item.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
  },
});
