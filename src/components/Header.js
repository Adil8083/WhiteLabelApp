import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";

function Header({ text, navigation: { goBack }, isBack }) {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: isBack ? "space-between" : "center",
          width: isBack ? "60%" : "100%",
          marginLeft: isBack ? 12 : 0,
        },
      ]}
    >
      {isBack && (
        <TouchableOpacity onPress={() => goBack()}>
          <FontAwesome5 name="arrow-left" style={styles.icon} />
        </TouchableOpacity>
      )}

      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: StatusBar.currentHeight + 20,
    marginBottom: 30,
  },
  icon: {
    fontSize: TextSize.SubHeading,
    color: Theme.iconColor,
    fontWeight: "bold",
    marginRight: 20,
  },
  text: {
    fontSize: TextSize.Heading,
    color: "white",
    fontWeight: "bold",
  },
});
export default Header;
