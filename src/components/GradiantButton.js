import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function GradiantButton({
  styleButton,
  onPress,
  title,
  colorArr = ["rgb(255, 115, 80)", "rgb(255, 80, 70)", "rgb(255, 78, 70)"],
}) {
  return (
    <TouchableOpacity
      style={[
        { width: 200, alignSelf: "center", paddingTop: 20 },
        { ...styleButton },
      ]}
      onPress={onPress}
    >
      <LinearGradient
        colors={colorArr}
        style={{ padding: 15, borderRadius: 50 }}
        end={{ x: 1, y: 0.5 }}
        start={{ x: 0, y: 0.5 }}
        locations={[0.3, 0.8, 0.7]}
      >
        <Text
          style={{
            backgroundColor: "transparent",
            fontSize: 15,
            color: "#fff",
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default GradiantButton;
