import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../constants/Theme";
import AppButton from "./AppButton";

export default function SocialComponents({ title, width, color, onPress }) {
  return (
    <AppButton
      title={title}
      styleButton={{ backgroundColor: color, width: width }}
      onPress={onPress}
    />
  );
}
