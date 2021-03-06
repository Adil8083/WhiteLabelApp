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

export default function ImagePickerComponent({
  BottomHeading,
  getImageUri,
  BottomTextColor,
}) {
  const [imageUri, setImageUri] = useState();
  const [PermissionGranted, setPermissionGranted] = useState(false);
  const requestPermission = async () => {
    try {
      const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (!granted) alert("You need to enable permissions for Camera Roll");
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
    } else alert("You need to enable permissions for Camera Roll");
  };
  const onRemoval = () => {
    Alert.alert("Delete", "Are you sure you want to delete this image?", [
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
      <View style={{ width: 100 }}>
        <View style={styles.imgStyle}>
          <TouchableOpacity onPress={selectImage}>
            {!imageUri && (
              <FontAwesome5 name="camera" size={30} color="#696969" />
            )}
          </TouchableOpacity>
          {imageUri && (
            <TouchableWithoutFeedback onPress={onRemoval}>
              <Image
                source={{ uri: imageUri }}
                style={{ width: "100%", height: "100%", borderRadius: 10 }}
              />
            </TouchableWithoutFeedback>
          )}
        </View>
        {BottomHeading && (
          <Text
            style={{
              textAlign: "center",
              marginTop: 7,
              color: BottomTextColor ? BottomTextColor : Theme.textColor,
              fontWeight: "bold",
            }}
          >
            {BottomHeading}
          </Text>
        )}
      </View>
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
