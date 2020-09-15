import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../constants/Theme";

export default AppButton = ({ title, width, backgroundColor, pressed }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width }, { backgroundColor }]}
      onPress={pressed}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    margin: 5,
    paddingVertical: 14,
    backgroundColor: "black",
  },
  buttonText: {
    color: Theme.textColor,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
