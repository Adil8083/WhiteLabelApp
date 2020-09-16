import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  StatusBar
} from "react-native";

import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "../constants/Screens";

export default function VideoPickerList() {
  navigation = useNavigation();
  const [SongsUriList, setSongsUriList] = useState([]);
  const [PermissionGranted, setPermissionGranted] = useState(false);
  const requestPermission = async () => {
    try {
      const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (!granted)
        alert("Please allow us permission for storage to select Video");
      else setPermissionGranted(true);
    } catch (error) {
      console.log("Unable to get permisssion from Video Library");
    }
  };
  const selectVideo = async () => {
    if (PermissionGranted) {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: "video/*",
        });
        if (result.type == "success")
          setSongsUriList([...SongsUriList, result.uri]);
      } catch (error) {
        console.log("Unable to read a Video", error);
      }
    } else alert("Please allow us permission for storage to select Video");
  };
  const onRemoval = (songUri) => {
    Alert.alert("Delete", "Do you want to delete your selected Video?", [
      {
        text: "Yes",
        onPress: () => {
          setSongsUriList(SongsUriList.filter((sngUri) => sngUri !== songUri));
        },
      },
      { text: "No" },
    ]);
  };
  const videoError = () => alert("Unable to load Video");
  const scrollView = useRef();
  useEffect(() => {
    requestPermission();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Criação</Text>
      <View>
        <Text
          style={{
            color: "#696969",
            fontWeight: "bold",
            fontSize: 18.5,
            marginLeft: 10,
            marginTop: 30
          }}
        >
          Add your Songs
        </Text>
      </View>

      <ScrollView
        style={styles.miniContainer}
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        {SongsUriList.length > 0 &&
          SongsUriList.map((songUri) => (
            <TouchableWithoutFeedback
              key={songUri}
              onPress={() => onRemoval(songUri)}
            >
              <Video
                source={{ uri: songUri }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.videoStyles}
              />
            </TouchableWithoutFeedback>
          ))}
        <TouchableOpacity
          style={[styles.Selector, { marginLeft: 10 }]}
          onPress={selectVideo}
        >
          <Ionicons name="md-musical-note" size={40} color="#696969" />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.albumContainer}>
        <Text
          style={{
            color: "#696969",
            fontWeight: "bold",
            fontSize: 18.5,
          }}
        >
          Create Album
        </Text>
        <TouchableOpacity
          style={[styles.Selector, { marginTop: 20 }]}
          onPress={() =>
            navigation.navigate(SCREENS.AlbumInput, {
              SongsUriList,
            })
          }
        >
          <MaterialIcons name="library-music" size={40} color="#696969" />
        </TouchableOpacity>
      </View>
    </View >
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: StatusBar.currentHeight,
    marginLeft: 15,
  },
  miniContainer: {
    marginTop: 20,
  }, textStyle: {
    fontSize: 30,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    color: "#696969",
    paddingTop: 30,
    paddingBottom: 10,
  },
  Selector: {
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    width: 120,
    height: 120,
    borderRadius: 20,
    justifyContent: "center",
  },
  videoStyles: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginLeft: 5,
  },
  albumContainer: {
    marginTop: 50,
    marginLeft: 10,
    flexDirection: "column",
  },
});
