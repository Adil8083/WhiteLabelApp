import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { FontAwesome5 } from "@expo/vector-icons";
import { Theme } from "../constants/Theme";

export default function ImagePickerComponent({ BottomHeading, getImageUri }) {
  const [imageUri, setImageUri] = useState();
  const [PermissionGranted, setPermissionGranted] = useState(false);
  const requestPermission = async () => {
    try {
      const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (!granted)
        alert("Please allow us permission for storage to select image");
      else setPermissionGranted(true);
    } catch (error) {
      console.log("Unable to get permisssion from storage");
    }
  };
  const selectImage = async () => {
    if (PermissionGranted) {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaType: ImagePicker.MediaTypeOptions.Images,
          quality: 0.5,
        });
        if (!result.cancelled) {
          setImageUri(result.uri);
          getImageUri && getImageUri(result.uri);
        }
      } catch (error) {
        console.log("Unable to read an Image");
      }
    } else alert("Please allow us permission for storage to select image");
  };
  const onRemoval = () => {
    Alert.alert("Delete", "Do you want to delete your profile picture?", [
      {
        text: "Yes",
        onPress: () => {
          setImageUri(null);
          getImageUri && getImageUri(null);
        },
      },
      { text: "No" },
    ]);
  };
  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <View>
      <View style={styles.imgStyle}>
        <TouchableOpacity onPress={selectImage}>
          {!imageUri && (
            <FontAwesome5 name="camera" size={25} color="#696969" />
          )}
        </TouchableOpacity>
        {imageUri && (
          <TouchableWithoutFeedback onPress={onRemoval}>
            <Image
              source={{ uri: imageUri }}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
      {BottomHeading && (
        <Text
          style={{
            marginLeft: 5,
            marginTop: 5,
            color: Theme.textColor,
            fontWeight: "bold",
          }}
        >
          {BottomHeading}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  imgStyle: {
    borderRadius: 10,
    backgroundColor: Theme.lightColor,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: Theme.darkColor,
    elevation: 10,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
