import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../constants/Theme";
import AppButton from "./ButtonComponent";

export default function SocialComponents({ title, width, marginTop, onPressEvent }) {
  return (
    <AppButton title={title} marginTop={marginTop} width={width} onPressEvent={onPressEvent} />
  );
}

