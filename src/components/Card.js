import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";

const Card = ({ title, onPress }) => {
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
    flexDirection: "row",
    backgroundColor: colors.light,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 20,
  },
});

export default Card;
