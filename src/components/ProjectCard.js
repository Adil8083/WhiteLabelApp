import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";

const ProjectCard = ({ title, description, onPress }) => {
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
      <Text style={styles.description}>{description}</Text>
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
    justifyContent: "space-evenly",
    marginBottom: 5,
  },
  title: {
    color: Theme.textColor,
    flex: 0.5,
    fontSize: TextSize.SubHeading,
    fontFamily: "notoserif",
  },
  description: {
    color: Theme.textColor,
    fontSize: TextSize.NormalText,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
    color: Theme.spareColor,
  },
});

export default ProjectCard;
