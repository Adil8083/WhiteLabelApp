import React from "react";
import { View, StyleSheet, Platform, Text, StatusBar } from "react-native";
import AppText from "../components/AppText";
import Header from "../components/Header";

import MovieModal from "../components/MovieModal";
import SocialComponents from "../components/SocialComponents";

function ActorWEScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Header isBack navigation={navigation} text="Movie Actor" />
        <View>
          <MovieModal />
        </View>
        <View style={styles.social}>
          <AppText
            styleText={{ fontSize: 18, fontWeight: "bold", color: "white" }}
          >
            Add Your Account
          </AppText>
          <SocialComponents
            title="Facebook"
            width="100%"
            color="#4e89ae"
            onPress={() => console.log("Facebook  button is pressed")}
          />
          <SocialComponents
            title="Instagram"
            width="100%"
            color="#ff8e6e"
            onPress={() => console.log("Instagram  button is pressed")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgb(30, 36, 48)",
  },
  textStyle: {
    fontSize: 30,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    paddingTop: 40,
    paddingBottom: 10,
  },
  social: {
    marginTop: 20,
  },
});

export default ActorWEScreen;
