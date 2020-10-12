import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import * as Facebook from "expo-facebook";
import auth, { firebase } from "@react-native-firebase/auth";

import GradiantButton from "../components/GradiantButton";
import Header from "../components/Header";
import TextInputComponent from "../components/TextInputComponent";
import { SCREENS } from "../constants/Screens";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";
export default function ({ navigation }) {
  const [FacebookAccPath, setFacebookAccPath] = useState();
  const [InstagramAccPath, setInstagramAccPath] = useState();
  const [TwitterAccPath, setTwitterAccPath] = useState();
  const [YoutubeChannelPath, setYoutubeChannelPath] = useState();
  async function onFacebookButtonPress() {
    try {
      await Facebook.initializeAsync("1043603759421756");
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const auth = await Facebook.getAuthenticationCredentialAsync();
        if (!auth) {
          throw new Error(
            "User is not authenticated. Ensure `logInWithReadPermissionsAsync` has successfully resolved before attempting to use the FBSDK Graph API."
          );
        }
        console.log("toke", token);
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
    // "1043603759421756",
    // {
    //   permissions: ["public_profile"],
    // }
    // if (type == "success") {
    //   const credential = firebase.auth.FacebookAuthProvider.credential(token);
    //   firebase
    //     .auth()
    //     .signInWithCredential(credential)
    //     .catch((error) => console.log(error));
    // }

    // Firebase code
    // const result = await LoginManager.logInWithPermissions([
    //   "public_profile",
    //   "email",
    // ]);
    // if (result.isCancelled) {
    //   throw "User cancelled the login process";
    // }
    // // Once signed in, get the users AccesToken
    // const data = await AccessToken.getCurrentAccessToken();
    // if (!data) {
    //   throw "Something went wrong obtaining access token";
    // }
    // // Create a Firebase credential with the AccessToken
    // const facebookCredential = auth.FacebookAuthProvider.credential(
    //   data.accessToken
    // );
    // // Sign-in the user with the credential
    // return auth().signInWithCredential(facebookCredential);
  }
  return (
    <View style={styles.container}>
      <Header navigation={navigation} text="Criação" />
      <ScrollView>
        <View style={styles.formStlying}>
          <Text style={styles.subHeading}>Facebook Account</Text>
          <TextInputComponent
            placeholder="Page Path"
            onChange={(val) => setFacebookAccPath(val)}
            containerStyle={{ width: 220 }}
          />
          <GradiantButton
            title="FacebBokk Login"
            onPress={() => onFacebookButtonPress()}
          />
          {/* <Text style={styles.subHeading}>Instagram Account</Text>
          <TextInputComponent
            placeholder="Page Path"
            onChange={(val) => setInstagramAccPath(val)}
            containerStyle={{ width: 220 }}
          />
          <Text style={styles.subHeading}>Twitter Account</Text>
          <TextInputComponent
            placeholder="Page Path"
            onChange={(val) => setTwitterAccPath(val)}
            containerStyle={{ width: 220 }}
          />
          <Text style={styles.subHeading}>Youtube Channel</Text>
          <TextInputComponent
            placeholder="Channel Path"
            onChange={(val) => setYoutubeChannelPath(val)}
            containerStyle={{ width: 220 }}
          /> */}
          <GradiantButton
            title="Next"
            onPress={() => navigation.navigate(SCREENS.Category)}
            styleButton={{ marginTop: 10 }}
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
    paddingHorizontal: 30,
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
