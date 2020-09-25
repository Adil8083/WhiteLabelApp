import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

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
    backgroundColor: colors.light,
    flexDirection: "row",
    padding: 20,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontFamily: "notoserif",
  },
});

export default AchievementCard;
