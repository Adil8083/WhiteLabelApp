import React, { useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ImageList({ movieList = [], onDelImage }) {
  const scrollView = useRef();

  let filter = movieList.filter((x) => {
    if (x.imageUri != "" || x.title != "") {
      return x;
    }
  });
  const editMovies = (t) => {
    Alert.alert("Delete", "Are you sure you want to delete this movie?", [
      {
        text: "Yes",
        onPress: () => onDelImage(t),
      },
      { text: "No" },
    ]);
  };
  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {filter.map((item, key) => {
            return (
              <View key={item.title}>
                <TouchableOpacity onPress={() => editMovies(item)}>
                  <Image
                    source={{ uri: item.imageUri }}
                    style={[styles.image, { marginLeft: key > 0 ? 10 : 0 }]}
                  />
                  <Text style={styles.text}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
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
    width: 150,
    height: 150,
    overflow: "hidden",
    borderRadius: 20,
    flexDirection: "row",
    marginTop: 10,
  },
  text: {
    alignSelf: "center",
    fontSize: 15,
    marginTop: 10,
    color: "#fff",
  },
});
