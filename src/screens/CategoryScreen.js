import React from "react";
import { View, TouchableOpacity } from "react-native";

import Category from "../components/Category";
import colors from "../config/colors";
import Screen from "../components/Screen";

const CategoryScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => console.log("Cinema")}>
          <Category name="movie" text="Cinema" color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Music")}>
          <Category name="music" text="Music" color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Sports")}>
          <Category name="cricket" text="Sports" color={colors.ternary} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default CategoryScreen;
