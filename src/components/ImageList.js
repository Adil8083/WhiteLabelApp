import React, { useRef } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import ImageComponent from "./ImageComponent";

export default function ImageList({
  imageUris = [],
  onRemoveImage,
  onAddImage,
}) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageComponent
                imageUri={uri}
                onChangeImage={() => {
                  onRemoveImage(uri);
                }}
              />
            </View>
          ))}
          <ImageComponent onChangeImage={(uri) => onAddImage(uri)} />
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
