import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Theme } from "../constants/Theme";
import Header from "../components/Header";
import AppText from "../components/AppText";
import TextSize from "../constants/TextSize";
import { MaterialIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import GradiantButton from "../components/GradiantButton";
import { SCREENS } from "../constants/Screens";
import client from "../api/client";
import useAuth from "../auth/useAuth";

function Gallery({ navigation, route }) {
  const scrollView = useRef();
  const [count, setCount] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    requestPremision();
  }, []);

  const requestPremision = async () => {
    const result = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!result.granted) alert("you need to grant permision");
  };

  const editMovies = (t) => {
    Alert.alert("Delete", "Are you sure you want to delete this picture?", [
      {
        text: "Yes",
        onPress: async () => {
          setShowIndicator(true);
          const response = await client.put(
            `users/update?email=${user.email}`,
            {
              Gallery: imageList.filter((val) => val !== t),
              user,
            }
          );
          if (!response.ok) {
            Alert.alert(
              "Something wrong happens",
              `Unable to delete this picture`,
              [
                {
                  text: "OK",
                },
              ]
            );
            setShowIndicator(false);
            return;
          }
          setShowIndicator(false);
          setImageList(imageList.filter((val) => val !== t));
        },
      },
      { text: "No" },
    ]);
  };

  const selectImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!res.cancelled) {
        setShowIndicator(true);
        setCount(count + 1);
        const form = new FormData();
        var url =
          "https://storage.googleapis.com/usergallery/" +
          user.email +
          "-gallery-" +
          count +
          "-.png";
        setImageList([...imageList, url]);
        form.append("Gallery", url);
        form.append("Image", {
          uri: res.uri,
          type: "image/png",
          name: "test.png",
        });
        const response = await client.post(
          `users/gallery?email=${user.email}&count=${count}`,
          form,
          user
        );
        if (!response.ok) {
          Alert.alert(
            "Something wrong happens",
            `Unable to add this picture in Gallery`,
            [
              {
                text: "OK",
              },
            ]
          );
          setShowIndicator(false);
          return;
        }
        setShowIndicator(false);
        // setImageList([...imageList, res.uri]);
      }
    } catch (error) {
      console.log("error reading an image", error);
    }
  };
  const AsyncFunc = async () => {
    setShowIndicator(true);
    const response = await client.get(`users/get?email=${user.email}`);
    if (!response.ok) {
      Alert.alert("Attention", "Unable to Load Data", [
        {
          text: "Retry",
          onPress: () => AsyncFunc(),
        },
        { text: "Cancel" },
      ]);
      setShowIndicator(false);
      return;
    }
    setImageList(response.data.Gallery);
    setShowIndicator(false);
  };
  useEffect(() => {
    AsyncFunc();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Header isBack navigation={navigation} text="Criação" />
        <ActivityIndicator animating={showIndicator} color={Theme.spareColor} />
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
        <ScrollView
          ref={scrollView}
          onContentSizeChange={() => scrollView.current.scrollToEnd()}
        >
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
            if (imageList.length < 1) {
              alert("add atleast one image");
            } else {
              if (route.params.Gallery === "Actor") {
                navigation.navigate(SCREENS.ActorHobbies);
              } else navigation.navigate(SCREENS.SingerCD);
            }
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
