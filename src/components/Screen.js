import React from "react";
import Constants from "expo-constants";
import { StyleSheet, View, StatusBar } from "react-native";
import { Theme } from "../constants/Theme";

function Screen({ children, style }) {
  return (
    <View style={[styles.view, style]}>
      <View style={{ width: "90%" }}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Theme.primary,
  },
});

export default Screen;
