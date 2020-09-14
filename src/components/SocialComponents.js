import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../constants/Theme";

export default function SocialComponents({ title, width }) {
  return (
    <TouchableOpacity>
      <View style={[styles.button, { width }]}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    margin: 5,
    paddingVertical: 14,
    backgroundColor: Theme.primary,
  },
  buttonText: {
    color: Theme.lightColor,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
