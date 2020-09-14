import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../constants/Theme";

export default Button = ({ title, width }) => {
  return (
    <TouchableOpacity style={[styles.button, { width }]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    margin: 5,
    paddingVertical: 14,
    backgroundColor: Theme.primary,
  },
  buttonText: {
    color: Theme.textColor,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
