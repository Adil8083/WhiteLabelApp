import React from "react";
import { Text, StyleSheet } from "react-native";

import colors from "../config/colors";

function AppText({ children, styleText }) {
  return <Text style={[styles.text, { ...styleText }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: colors.dark,
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppText;
