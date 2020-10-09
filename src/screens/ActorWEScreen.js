import React from "react";
import { View, StyleSheet, Platform, Text, StatusBar } from "react-native";
import AppText from "../components/AppText";
import Header from "../components/Header";

import MovieModal from "../components/MovieModal";
import { Theme } from "../constants/Theme";
import GradiantButton from "../components/GradiantButton";
import { SCREENS } from "../constants/Screens";

function ActorWEScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: StatusBar.currentHeight,
          backgroundColor: "#abc2e8",
          width: "100%",
        }}
      ></View>
      <View style={{ width: "90%" }}>
        <Header isBack navigation={navigation} text="Criação" />
        <View>
          <MovieModal />
        </View>
        <View style={{ marginTop: 20 }}>
          <GradiantButton
            title="Next"
            onPress={() =>
              navigation.navigate(SCREENS.Gallery, { Gallery: "Actor" })
            }
            styleButton={{ width: "50%" }}
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
});

export default ActorWEScreen;
