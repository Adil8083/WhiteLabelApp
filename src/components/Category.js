import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "../constants/Theme";

const Category = ({ name, text, color = "rgb(255, 98, 67)", onPress }) => {
  return (
    <TouchableOpacity on onPress={onPress}>
      <View style={[styles.icon, { backgroundColor: color }]}>
        <MaterialCommunityIcons name={name} size={50} color={Theme.iconColor} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    borderRadius: 20,
    height: 150,
    justifyContent: "center",
    margin: 10,
    width: 130,
  },
  text: {
    color: Theme.iconColor,
  },
});

export default Category;
