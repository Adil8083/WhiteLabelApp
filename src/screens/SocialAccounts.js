import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Linking,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import API from "apisauce";

import GradiantButton from "../components/GradiantButton";
import Header from "../components/Header";
import TextInputComponent from "../components/TextInputComponent";
import { SCREENS } from "../constants/Screens";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import FacebookHelpModal from "../components/FacebookHelpModal";
import AppText from "../components/AppText";
import ErrorMessgae from "../components/forms/ErrorMessgae";
import SubHeading from "../components/SubHeading";
import { set } from "react-native-reanimated";
const baseURL = "http://192.168.10.9:3000/api";
const api = API.create({
  baseURL: baseURL,
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFhYTU1NzAwM2RkODIxZTQyOGY0YjciLCJpYXQiOjE2MDUwMTg5Njh9.5YyRrgRx8avimh25pEgAPVWuIEmHhcyH8zdjW4sIxFo",
  },
});
export default function ({ navigation }) {
  const [FacebookAccPath, setFacebookAccPath] = useState();
  const [InstagramAccPath, setInstagramAccPath] = useState();
  const [TwitterAccPath, setTwitterAccPath] = useState();
  const [YoutubeChannelPath, setYoutubeChannelPath] = useState();
  const [ShowFacebookHelp, setShowFacebookHelp] = useState(false);

  function VarifyFbPath() {
    var arr = FacebookAccPath.split(".", 2);
    if (arr[0] === "https://www" && arr[1] === "facebook") {
      var id = FacebookAccPath.split("id=")[1];
      if (id) return true;
      else if (!id) {
        var name = FacebookAccPath.split(".com/")[1];
        if (name) return true;
        else return false;
      }
    } else return false;
  }

  function VarifyInstaPath() {
    if (InstagramAccPath) {
      return true;
    } else {
      return false;
    }
  }

  function VarifyTwitterPath() {
    if (TwitterAccPath) {
      return true;
    } else {
      return false;
    }
  }

  function VarifyYoutubePath() {
    var arr = YoutubeChannelPath.split(".", 2);
    if (arr[0] === "https://www" && arr[1] === "youtube") {
      return true;
    } else return false;
  }

  const openFacebook = () => [Linking.openURL(FacebookAccPath)];

  const openInstagram = () => [
    Linking.openURL("https://www.instagram.com/" + InstagramAccPath),
  ];

  const openTwitter = () => [
    Linking.openURL("https://twitter.com/" + TwitterAccPath),
  ];

  const openYoutube = () => {
    [Linking.openURL(YoutubeChannelPath)];
  };
  useEffect(() => {
    api
      .get("users/get")
      .then((Response) => {
        Response.data.Facebook !== " " &&
          setFacebookAccPath(Response.data.Facebook);
        Response.data.Insta !== " " && setInstagramAccPath(Response.data.Insta);
        Response.data.Twitter !== " " &&
          setTwitterAccPath(Response.data.Twitter);
        Response.data.Youtube !== " " &&
          setYoutubeChannelPath(Response.data.Youtube);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <View style={styles.container}>
      <Header isBack navigation={navigation} text="Criação" />
      <SubHeading
        title="Social Accounts"
        style={{ width: "90%", alignSelf: "center" }}
      />
      <ScrollView>
        <View style={styles.formStlying}>
          <Text style={styles.subHeading}>Facebook Account</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInputComponent
              placeholder="Account/Page Path"
              defaultValue={FacebookAccPath && FacebookAccPath}
              onChangeText={(val) => setFacebookAccPath(val)}
              containerStyle={{ width: "90%" }}
            />
            <TouchableOpacity
              onPress={() => setShowFacebookHelp(!ShowFacebookHelp)}
            >
              <Entypo
                name="help-with-circle"
                style={{ marginTop: 15, paddingVertical: 5.5, marginLeft: 2 }}
                size={24}
                color={Theme.spareColor}
              />
            </TouchableOpacity>
          </View>
          {FacebookAccPath
            ? !VarifyFbPath() && (
                <ErrorMessgae
                  error="Link is not Valid, you may use our help"
                  visible={true}
                />
              )
            : console.log()}
          {FacebookAccPath
            ? VarifyFbPath() && (
                <AppText
                  children="Link is valid"
                  styleText={{ color: "green", fontStyle: "italic" }}
                />
              )
            : console.log()}
          {ShowFacebookHelp && (
            <FacebookHelpModal toggle={(val) => setShowFacebookHelp(val)} />
          )}
          {FacebookAccPath
            ? VarifyFbPath() && (
                <GradiantButton title="Varify Account" onPress={openFacebook} />
              )
            : console.log()}
          <Text style={styles.subHeading}>Instagram Account</Text>
          <TextInputComponent
            placeholder="Enter Instagram UserName"
            defaultValue={InstagramAccPath && InstagramAccPath}
            onChangeText={(val) => setInstagramAccPath(val)}
            containerStyle={{ width: "90%" }}
          />
          {InstagramAccPath
            ? VarifyInstaPath && (
                <GradiantButton
                  title="Varify Account"
                  onPress={openInstagram}
                />
              )
            : console.log()}
          <Text style={styles.subHeading}>Twitter Handle</Text>
          <TextInputComponent
            placeholder="Enter Twitter Handle"
            defaultValue={TwitterAccPath && TwitterAccPath}
            onChangeText={(val) => setTwitterAccPath(val)}
            containerStyle={{ width: "90%" }}
          />
          {TwitterAccPath
            ? VarifyTwitterPath && (
                <GradiantButton title="Varify Account" onPress={openTwitter} />
              )
            : console.log()}
          <Text style={styles.subHeading}>Youtube Link</Text>
          <TextInputComponent
            placeholder="Enter Youtube Channel Link"
            defaultValue={YoutubeChannelPath && YoutubeChannelPath}
            onChangeText={(val) => setYoutubeChannelPath(val)}
            containerStyle={{ width: "90%" }}
          />
          {YoutubeChannelPath
            ? !VarifyYoutubePath() && (
                <ErrorMessgae error="Link is not Valid" visible={true} />
              )
            : console.log()}
          {YoutubeChannelPath
            ? VarifyYoutubePath() && (
                <GradiantButton title="Varify Channel" onPress={openYoutube} />
              )
            : console.log()}
          <GradiantButton
            title="Next"
            onPress={() => {
              navigation.navigate(SCREENS.Category);
              FacebookAccPath &&
                api
                  .put("users/update?email=uzair12naseem@gmail.com", {
                    Facebook: FacebookAccPath,
                  })
                  .then((Response) => console.log(Response.data))
                  .catch((error) => console.log(error));
              InstagramAccPath &&
                api
                  .put("users/update?email=uzair12naseem@gmail.com", {
                    Insta: InstagramAccPath,
                  })
                  .then((Response) => console.log(Response.data))
                  .catch((error) => console.log(error));
              TwitterAccPath &&
                api
                  .put("users/update?email=uzair12naseem@gmail.com", {
                    Twitter: TwitterAccPath,
                  })
                  .then((Response) => console.log(Response.data))
                  .catch((error) => console.log(error));
              YoutubeChannelPath &&
                api
                  .put("users/update?email=uzair12naseem@gmail.com", {
                    Youtube: YoutubeChannelPath,
                  })
                  .then((Response) => console.log(Response.data))
                  .catch((error) => console.log(error));
            }}
            styleButton={{ marginTop: 20 }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: Theme.primary,
  },
  formStlying: {
    width: "90%",
    backgroundColor: Theme.secondary,
    marginLeft: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 5,
  },
  subHeading: {
    color: Theme.textColor,
    fontSize: TextSize.SubHeading,
    marginTop: 20,
  },
});
