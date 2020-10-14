import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import * as Facebook from "expo-facebook";

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

const path = 100014136782080;
export default function ({ navigation }) {
  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user != null) {
  //       console.log(user);
  //     }
  //   });
  // }, []);

  const [FacebookAccPath, setFacebookAccPath] = useState();
  const [InstagramAccPath, setInstagramAccPath] = useState();
  const [TwitterAccPath, setTwitterAccPath] = useState();
  const [YoutubeChannelPath, setYoutubeChannelPath] = useState();
  const [ShowFacebookHelp, setShowFacebookHelp] = useState(false);
  function VarifyFbPath() {
    var arr = FacebookAccPath.split(".", 2);
    if (arr[0] === "https://www" && arr[1] === "facebook") {
      var id = FacebookAccPath.split("id=");
      if (id) {
        var name = FacebookAccPath.split(".com/")[1];
        if (name) return true;
        else return false;
      }
    } else return false;
  }
  // try {
  // await Facebook.initializeAsync("1043603759421756");
  // const {
  //   type,
  //   token,
  //   expirationDate,
  //   permissions,
  //   declinedPermissions,
  // } = await Facebook.logInWithReadPermissionsAsync({
  //   permissions: ["public_profile"],
  // });
  // AccessToken.getCurrentAccessToken().then((data) => {
  //   console.log(data.accessToken.toString());
  // });
  //   if (type === "success") {
  //     // Get the user's name using Facebook's Graph API
  //     // const auth = await Facebook.getAuthenticationCredentialAsync();
  //     // if (!auth) {
  //     //   throw new Error(
  //     //     "User is not authenticated. Ensure `logInWithReadPermissionsAsync` has successfully resolved before attempting to use the FBSDK Graph API."
  //     //   );
  //     // }

  //     // console.log("toke", auth);

  //     const response = await fetch(
  //       `https://graph.facebook.com/me?fields=id&access_token=${token}`
  //     );
  //     console.log(await response.json());
  //   } else {
  //     // type === 'cancel'
  //   }
  //   // } catch ({ message }) {
  //   //   alert(`Facebook Login Error: ${message}`);
  //   // }
  //   // "1043603759421756",
  //   // {
  //   //   permissions: ["public_profile"],
  //   // }
  // if (type == "success") {
  //   const credential = firebase.auth.FacebookAuthProvider.credential(token);
  //   firebase
  //     .auth()
  //     .signInWithCredential(credential)
  //     .catch((error) => console.log(error));

  //   console.log(credential);
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

  return (
    <View style={styles.container}>
      <Header navigation={navigation} text="Criação" />
      <ScrollView>
        <View style={styles.formStlying}>
          <Text style={styles.subHeading}>Facebook Account</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInputComponent
              placeholder="Account/Page Path"
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
          <GradiantButton
            title="FaceBook"
            onPress={handlePress}
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
