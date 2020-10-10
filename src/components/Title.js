import React from "react";
import { StyleSheet, Text } from "react-native";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";

const Title = ({ name, style }) => {
  return <Text style={[styles.title, style]}>{name}</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: Theme.lightColor,
    fontWeight: "bold",
    fontSize: TextSize.SubHeading,
    marginLeft: 5,
  },
});

export default Title;
