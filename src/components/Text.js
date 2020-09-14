import React from "react";
import { Text } from "react-native";

export default function Text(props) {
  return <Text style={props.style}>{props.children}</Text>;
}
