import React from "react";
import { View, StyleSheet, Platform, Text, StatusBar } from "react-native";
import AppText from "../components/AppText";
import Header from "../components/Header";

import MovieModal from "../components/MovieModal";
import { Theme } from "../constants/Theme";
import GradiantButton from "../components/GradiantButton";
import { SCREENS } from "../constants/Screens";
import Gallery from "./Gallery";

function ActorWEScreen({ navigation }) {
  const Gallery = "Actor";
  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Header isBack navigation={navigation} text="Criação" />
        <View>
          <MovieModal />
        </View>
        <View style={styles.social}>
          <AppText
            styleText={{ fontSize: 18, fontWeight: "bold", color: "#D8D8D8" }}
          >
            Add Your Account
          </AppText>
          <GradiantButton
            title="facebook"
            onPress={() => console.log("facebook pressed")}
            styleButton={{ width: "70%" }}
            colorArr={["#0278ae", "#51adcf", "#51adcf"]}
          />
          <GradiantButton
            title="instagram"
            onPress={() => console.log("instagram pressed")}
            styleButton={{ width: "70%" }}
            colorArr={["#ff414d", "#f56a79", "#f56a79"]}
          />
          <GradiantButton
            title="Next"
            onPress={() =>
              navigation.navigate(SCREENS.Gallery, { Gallery: "Actor" })
            }
            styleButton={{ width: "30%" }}
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
    backgroundColor: Theme.primary,
    // marginTop: StatusBar.currentHeight,
  },
  textStyle: {
    fontSize: 30,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    color: "grey",
    paddingTop: 40,
    paddingBottom: 10,
  },
  social: {
    marginTop: 20,
  },
});

export default ActorWEScreen;
