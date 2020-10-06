import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "../constants/Theme";

const Category = ({ name, text, color = "rgb(255, 98, 67)" }) => {
  return (
    <View style={[styles.icon, { backgroundColor: color }]}>
      <MaterialCommunityIcons name={name} size={50} color={Theme.iconColor} />
      <Text style={styles.text}>{text}</Text>
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
  text: {
    color: Theme.iconColor,
  },
});

export default Category;
