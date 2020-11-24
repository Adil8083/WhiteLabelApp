import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";

const ProjectCard = ({ title, detail, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={25}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container3}>
        <Text style={styles.detail}>{detail}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.secondary,
    borderRadius: 15,
    margin: 10,
    padding: 20,
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  title: {
    color: Theme.textColor,
    flex: 0.5,
    fontSize: TextSize.SubHeading,
    fontFamily: "notoserif",
  },
  detail: {
    color: Theme.textColor,
    fontSize: TextSize.NormalText,
    marginLeft: 29,
    textAlign: "justify",
  },
  icon: {
    marginRight: 10,
    color: Theme.spareColor,
  },
});

export default ProjectCard;
