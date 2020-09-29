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
          getImageUri && getImageUri(result.uri)
        }
      }
      catch (error) {
        console.log("Unable to read an Image");
      }
    } else alert("Please allow us permission for storage to select image");
  };
  const onRemoval = () => {
    Alert.alert("Delete", "Do you want to delete your profile picture?", [
      {
        text: "Yes",
        onPress: () => { setImageUri(null); getImageUri && getImageUri(null) }
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
            color: "#696969",
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
  container: {
    flexDirection: "column",
  },
  imgStyle: {
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    width: 100,
    height: 100,
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
  },
});
