import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";

const AchievementCard = ({ title, year, onPress }) => {
  return (
    <View style={styles.conatainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.year}>{"(" + year + ")"}</Text>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons
          name="delete-outline"
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
    borderRadius: 15,
    flexDirection: "row",
    margin: 10,
    padding: 20,
  },
  icon: {
    marginRight: 10,
    color: Theme.spareColor,
  },
  title: {
    color: Theme.textColor,
    flex: 0.5,
    fontSize: TextSize.SubHeading,
    fontFamily: "notoserif",
  },
  year: {
    color: Theme.textColor,
    fontSize: TextSize.SubHeading,
    flex: 0.5,
    marginLeft: 10,
  },
});

export default AchievementCard;
