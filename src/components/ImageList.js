import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import AppText from "./AppText";

export default function ImageList({ movieList = [] }) {
  const scrollView = useRef();

  let filter = movieList.filter((x) => {
    if (x.imageUri != "" || x.title != "") {
      return x;
    }
  });

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {filter.map((item) => (
            <View key={item.imageUri}>
              <Image source={{ uri: item.imageUri }} style={styles.image} />
              <Text style={styles.text}>{item.title}</Text>
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
    width: 120,
    height: 150,
    overflow: "hidden",
    borderRadius: 20,
    flexDirection: "row",
    margin: 10,
  },
  text: {
    alignSelf: "center",
    fontSize: 20,
  },
});
