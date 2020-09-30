import React from "react";
import { TouchableOpacity, Text, View, StatusBar } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Theme } from "../constants/Theme";

export default function Header(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: StatusBar.currentHeight + 30,
        marginBottom: 30,
        alignItems: "center",
      }}
    >
      <TouchableOpacity>
        <FontAwesome5
          name="arrow-left"
          style={{
            fontSize: 18,
            color: Theme.lightColor,
            fontWeight: "bold",
            marginRight: 20,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 21,
          color: Theme.lightColor,
          fontWeight: "bold",
          fontFamily: "Jost-Regular",
        }}
      >
        {props.text}
      </Text>
    </View>
  );
}
