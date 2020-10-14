import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
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
