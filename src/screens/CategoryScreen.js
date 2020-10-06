import React from "react";
import { StyleSheet } from "react-native";
import { View, TouchableOpacity } from "react-native";

import Category from "../components/Category";
import Screen from "../components/Screen";
import { SCREENS } from "../constants/Screens";
import Header from "../components/Header";
import { Theme } from "../constants/Theme";

const CategoryScreen = ({ navigation }) => {
  return (
    <Screen>
      <Header isback navigation={navigation} text="Select Category" />
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
  },
});

export default CategoryScreen;
