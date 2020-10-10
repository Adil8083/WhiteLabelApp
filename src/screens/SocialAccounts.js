import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
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
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header navigation={navigation} text="Criação" />
        <View style={styles.formStlying}>
          <Text style={styles.subHeading}>Facebook Account</Text>
          <TextInputComponent
            placeholder="Page Path"
            onChange={(val) => setFacebookAccPath(val)}
            containerStyle={{ width: 220 }}
          />
          <Text style={styles.subHeading}>Instagram Account</Text>
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
          />
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
  },
  subHeading: {
    color: Theme.textColor,
    fontSize: TextSize.SubHeading,
    marginTop: 20,
  },
});
