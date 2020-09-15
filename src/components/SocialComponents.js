import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../constants/Theme";
import AppButton from "./AppButton";

export default function SocialComponents({ title, width, backgroundColor }) {
  return (
    <AppButton title={title} width={width} backgroundColor={backgroundColor} />
  );
}
