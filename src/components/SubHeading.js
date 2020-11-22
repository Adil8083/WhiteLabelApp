import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Theme } from "../constants/Theme";
import { MaterialIcons } from "@expo/vector-icons";

import AppText from "./AppText";

const SubHeading = ({ title, onPress, style }) => {
  return (
    <View
      style={[
        styles.container,
        style,
        { justifyContent: onPress ? "space-between" : "center" },
      ]}
    >
      <AppText styleText={styles.text}>{title}</AppText>
      {onPress ? (
        <TouchableWithoutFeedback onPress={onPress}>
          <MaterialIcons
            name="add"
            size={30}
            color={Theme.iconColor}
            style={styles.touch}
          />
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.secondary,
    borderRadius: 10,
    shadowColor: Theme.lightColor,
    padding: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: TextSize.SubHeading,
    fontWeight: "bold",
    color: Theme.textColor,
  },
  touch: {
    paddingTop: 5,
    paddingLeft: 10,
  },
});

export default SubHeading;
