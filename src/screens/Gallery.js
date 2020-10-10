import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
} from "react-native";
import { Theme } from "../constants/Theme";
import Header from "../components/Header";
import AppText from "../components/AppText";
import TextSize from "../constants/TextSize";
import { MaterialIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import GradiantButton from "../components/GradiantButton";
import { SCREENS } from "../constants/Screens";

function Gallery({ navigation, route }) {
  const scrollView = useRef();
  const [imageList, setImageList] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    requestPremision();
  }, []);

  const requestPremision = async () => {
    const result = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!result.granted) alert("you need to grant permision");
  };

  const editMovies = (t) => {
    Alert.alert("Delete", "Are you sure you want to delete this movie?", [
      {
        text: "Yes",
        onPress: () => delImage(t),
      },
      { text: "No" },
    ]);
  };
  const delImage = (t) => {
    for (var i = 0; i < imageList.length; i++) {
      if (imageList[i] === t) {
        imageList.splice(i, 1);
        if (update) {
          setUpdate(false);
        } else {
          setUpdate(true);
        }
      }
    }
  };

  const selectImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!res.cancelled) {
        setImageList([...imageList, res.uri]);
      }
    } catch (error) {
      console.log("error reading an image", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Header isBack navigation={navigation} text="Criação" />
        <View
          style={{
            backgroundColor: Theme.secondary,
            flexDirection: "row",
            borderRadius: 8,
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <AppText
            styleText={{
              color: Theme.textColor,
              fontSize: TextSize.SubHeading,
              marginLeft: 2,
            }}
          >
            Make Your Own Gallery
          </AppText>
          {imageList.length < 9 && (
            <TouchableOpacity onPress={selectImage}>
              <MaterialIcons
                name="add"
                size={30}
                color={Theme.iconColor}
                style={{ color: Theme.iconColor }}
              />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView ref={scrollView}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: Theme.secondary,
              marginTop: 8,
              borderRadius: 8,
            }}
          >
            {imageList.map((item) => (
              <View key={item}>
                <TouchableOpacity onPress={() => editMovies(item)}>
                  <Image
                    source={{ uri: item }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      marginVertical: 15,
                      marginHorizontal: 8,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
        <GradiantButton
          title="Next"
          styleButton={{ width: "40%" }}
          onPress={() => {
            if (route.params.Gallery === "Actor") {
              navigation.navigate(SCREENS.ActorEdu);
            } else navigation.navigate(SCREENS.SingerCD);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
    backgroundColor: Theme.primary,
  },
});

export default Gallery;
