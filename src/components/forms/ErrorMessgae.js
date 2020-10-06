import React from "react";
import { StyleSheet, Text } from "react-native";

import AppText from "../AppText";
const ErrorMessgae = ({ error, visible }) => {
  if (!visible || !error) return null;
  return <Text style={styles.error}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontStyle: "italic",
  },
});

export default ErrorMessgae;
