import React from "react";
import { StyleSheet, Text } from "react-native";

const Title = ({ name, style }) => {
  return <Text style={[styles.title, style]}>{name}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    padding: 10,
  },
});

export default Title;
