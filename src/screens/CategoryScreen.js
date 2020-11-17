import React from "react";
import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";

import Category from "../components/Category";
import Header from "../components/Header";
import Screen from "../components/Screen";
import { SCREENS } from "../constants/Screens";
import SubHeading from "../components/SubHeading";
import { Theme } from "../constants/Theme";

const CategoryScreen = ({ navigation }) => {
  return (
    <Screen>
      <Header isBack navigation={navigation} text="Criação" />
      <SubHeading title="Select your category" />

      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.ActorWE)}>
          <Category name="movie" text="Actor" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.SingerWE)}>
          <Category name="music" text="Singer" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.SportsInfo)}
        >
          <Category name="cricket" text="SportsPerson" />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Theme.secondary,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    padding: 10,
  },
  mainContainter: {
    flex: 1,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Theme.primary,
  },
});

export default CategoryScreen;
