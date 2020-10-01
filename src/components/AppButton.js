import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import { Theme } from "../constants/Theme";

function AppButton({ title, onPress, styleButton }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.button, { ...styleButton }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: Theme.textColor,
    fontSize: 18,
    textTransform: "uppercase",
  },
});

export default AppButton;
