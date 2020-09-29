import React, { useState } from "react";
import { View, StyleSheet, Platform, Text, StatusBar } from "react-native";
import AppText from "../components/AppText";

import MovieModal from "../components/MovieModal";
import SocialComponents from "../components/SocialComponents";
import { SCREENS } from "../constants/Screens";

function ActorWEScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Criação</Text>
      <View>
        <View>
          <MovieModal />
        </View>
      </View>
      <View style={styles.social}>
        <AppText>Add Your Account</AppText>
        <SocialComponents
          title="Facebook"
          width="90%"
          color="#4e89ae"
          onPress={() => console.log("Facebook  button is pressed")}
        />
        <SocialComponents
          title="Instagram"
          width="90%"
          color="#ff8e6e"
          onPress={() => console.log("Instagram  button is pressed")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#faf3dd",
  },
  textStyle: {
    fontSize: 30,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    color: "#696969",
    paddingTop: 30,
    paddingBottom: 10,
  },
  social: {
    paddingTop: 50,
  },
});

export default ActorWEScreen;
