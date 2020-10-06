import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";

const AchievementCard = ({ title, onPress }) => {
  return (
    <View style={styles.conatainer}>
      <AppText style={styles.title}>{title}</AppText>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="trash-can-outline"
          size={25}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  conatainer: {
    backgroundColor: Theme.secondary,
    flexDirection: "row",
    padding: 20,
  },
  icon: {
    marginRight: 10,
    color: Theme.lightColor,
  },
  title: {
    flex: 1,
    fontSize: TextSize.NormalText,
    fontFamily: "notoserif",
  },
});

export default AchievementCard;
