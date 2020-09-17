import React from "react";
import { View, TouchableOpacity } from "react-native";

import AppText from "../components/AppText";
import Category from "../components/Category";
import colors from "../config/colors";
import Screen from "../components/Screen";
import styles from "../config/styles";

const CategoryScreen = () => {
  return (
    <Screen>
      <AppText style={styles.logo}>Category</AppText>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => console.log("Cinema")}>
          <Category name="movie" text="Cinema" color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Music")}>
          <Category name="music" text="Music" color={colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Sports")}>
          <Category name="cricket" text="Sports" color={colors.ternary} />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default CategoryScreen;
