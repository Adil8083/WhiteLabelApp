import React from "react";
import { View, TouchableOpacity } from "react-native";

import Category from "../components/Category";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { SCREENS } from "../constants/Screens";

const CategoryScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.ActorWE)}>
          <Category name="movie" text="Actor" color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.SingerWE)}>
          <Category name="music" text="Singer" color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.SportsInfo)}
        >
          <Category name="cricket" text="SportsPerson" color={colors.ternary} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default CategoryScreen;
