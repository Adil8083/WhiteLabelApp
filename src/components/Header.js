import React from "react";
import { TouchableOpacity, Text, View, StatusBar } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Theme } from "../constants/Theme";

export default function Header({ text, navigation: { goBack } }) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: StatusBar.currentHeight + 30,
        marginBottom: 30,
        width: "60%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => goBack()}>
        <FontAwesome5
          name="arrow-left"
          style={{
            fontSize: 18,
            color: Theme.iconColor,
            fontWeight: "bold",
            marginRight: 20,
          }}
        />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 24,
          color: "white",
          fontWeight: "bold",
        }}
      >
        {text}
      </Text>
    </View>
  );
}
