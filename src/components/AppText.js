import React from "react";
import { Text, StyleSheet } from "react-native";

import colors from "../config/colors";

function AppText({ children, styleText }) {
  return <Text style={[styles.text, { ...styleText }]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: colors.dark,
    fontSize: 15,
  },
});

export default AppText;
