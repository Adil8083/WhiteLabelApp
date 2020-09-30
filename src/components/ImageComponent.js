import React, { useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import { Theme } from "../constants/Theme";

function ImageComponent({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPremision();
  }, []);

  const requestPremision = async () => {
    const result = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!result.granted) alert("you need to grant permision");
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else {
      Alert.alert("Delete", "Are you sure you want to delete image?", [
        {
          text: "Yes",
          onPress: () => onChangeImage(null),
        },
        { text: "No" },
      ]);
    }
  };

  const selectImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!res.cancelled) onChangeImage(res.uri);
    } catch (error) {
      console.log("error reading an image", error);
    }
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styles.bodyContainer}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons name="camera" size={40} color="grey" />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    borderRadius: 10,
    backgroundColor: Theme.lightColor,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: Theme.darkColor,
    elevation: 10,
    width: 100,
    height: 100,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default ImageComponent;
