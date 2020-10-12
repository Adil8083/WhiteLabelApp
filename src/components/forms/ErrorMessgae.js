import React from "react";
import { StyleSheet, Text } from "react-native";

const ErrorMessgae = ({ error, visible, errorStyle }) => {
  if (!visible || !error) return null;
  return <Text style={[styles.error, errorStyle && errorStyle]}>{error}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: "red",
    fontStyle: "italic",
  },
});

export default ErrorMessgae;
