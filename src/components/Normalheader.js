import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import TextSize from "../constants/TextSize";

export default function Normalheader({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: StatusBar.currentHeight + 20,
    marginBottom: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  heading: {
    color: "white",
    fontSize: TextSize.Heading,
    fontWeight: "bold",
    marginRight: 10,
  },
});
