import React from "react";
import { TouchableOpacity, Text, View, StatusBar } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";

export default function Header({
  text,
  navigation: { goBack },
  isBack = true,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: isBack ? "space-between" : "center",
        marginTop: StatusBar.currentHeight + 20,
        marginBottom: 30,
        width: isBack ? "60%" : "100%",
        marginLeft: isBack ? 12 : 0,
      }}
    >
      {isBack && (
        <TouchableOpacity onPress={() => goBack()}>
          <FontAwesome5
            name="arrow-left"
            style={{
              fontSize: TextSize.NormalText,
              color: Theme.iconColor,
              fontWeight: "bold",
              marginRight: 20,
            }}
          />
        </TouchableOpacity>
      )}

      <Text
        style={{
          fontSize: TextSize.Heading,
          color: "white",
          fontWeight: "bold",
        }}
      >
        {text}
      </Text>
    </View>
  );
}
