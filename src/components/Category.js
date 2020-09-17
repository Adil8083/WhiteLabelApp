import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

const Category = ({ name, text, color = "#fc5c65" }) => {
  return (
    <View style={[styles.icon, { backgroundColor: color }]}>
      <MaterialCommunityIcons name={name} size={50} />
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    margin: 10,
    width: 100,
  },
});

export default Category;
