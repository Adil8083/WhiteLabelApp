import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SocialComponents({ title, colors }) {
  return (
    <TouchableOpacity>
      <View style={styles.button}>
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
    color: "lightblue",
    backgroundColor: "lightblue",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
