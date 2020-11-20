import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

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
import * as Api from "../api/SocialAccApi";
import useAuth from "../auth/useAuth";

export default function ({ navigation }) {
  const [FacebookAccPath, setFacebookAccPath] = useState();
  const [InstagramAccPath, setInstagramAccPath] = useState();
  const [TwitterAccPath, setTwitterAccPath] = useState();
  const [YoutubeChannelPath, setYoutubeChannelPath] = useState();
  const [ShowFacebookHelp, setShowFacebookHelp] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  function VerifyFbPath() {
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

  function VerifyInstaPath() {
    if (InstagramAccPath) {
      return true;
    } else {
      return false;
    }
  }

  function VerifyTwitterPath() {
    if (TwitterAccPath) {
      return true;
    } else {
      return false;
    }
  }

  function VerifyYoutubePath() {
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
  const { user } = useAuth();
  const AsynFunc = async () => {
    setShowIndicator(true);
    const Response = await Api.get(user);
    if (!Response.ok) {
      setShowIndicator(false);
      Alert.alert("Unable to Load Data", [
        {
          text: "Retry",
          onPress: () => AsynFunc(),
        },
        { text: "Cancel" },
      ]);
      return;
    }
    Response.data.Facebook !== " " &&
      setFacebookAccPath(Response.data.Facebook);
    Response.data.Insta !== " " && setInstagramAccPath(Response.data.Insta);
    Response.data.Twitter !== " " && setTwitterAccPath(Response.data.Twitter);
    Response.data.Youtube !== " " &&
      setYoutubeChannelPath(Response.data.Youtube);
    setShowIndicator(false);
  };
  useEffect(() => {
    AsynFunc();
  }, []);
  return (
    <View style={styles.container}>
      <Header isBack navigation={navigation} text="Criação" />
      <SubHeading
        title="Social Accounts"
        style={{ width: "90%", alignSelf: "center" }}
      />
      <ActivityIndicator animating={showIndicator} color={Theme.spareColor} />
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
            ? !VerifyFbPath() && (
                <ErrorMessgae
                  error="Link is not Valid, you may use our help"
                  visible={true}
                />
              )
            : console.log()}
          {FacebookAccPath
            ? VerifyFbPath() && (
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
            ? VerifyFbPath() && (
                <GradiantButton title="Verify Account" onPress={openFacebook} />
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
            ? VerifyInstaPath && (
                <GradiantButton
                  title="Verify Account"
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
            ? VerifyTwitterPath && (
                <GradiantButton title="Verify Account" onPress={openTwitter} />
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
            ? !VerifyYoutubePath() && (
                <ErrorMessgae error="Link is not Valid" visible={true} />
              )
            : console.log()}
          {YoutubeChannelPath
            ? VerifyYoutubePath() && (
                <GradiantButton title="Verify Channel" onPress={openYoutube} />
              )
            : console.log()}
          <GradiantButton
            title="Next"
            onPress={async () => {
              navigation.navigate(SCREENS.Category);
              FacebookAccPath &&
                (await Api.add(
                  {
                    Facebook: FacebookAccPath,
                  },
                  user
                ));
              InstagramAccPath &&
                (await Api.add(
                  {
                    Insta: InstagramAccPath,
                  },
                  user
                ));
              TwitterAccPath &&
                (await Api.add(
                  {
                    Twitter: TwitterAccPath,
                  },
                  user
                ));
              YoutubeChannelPath &&
                (await Api.add(
                  {
                    Youtube: YoutubeChannelPath,
                  },
                  user
                ));
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
