import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import AppText from "../components/AppText";
import colors from "../config/colors";

const Heading = ({
  backgroundColor = "#fc5c65",
  textColor = "#0c0c0c",
  title,
  onPress,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <AppText style={[styles.heading, { color: textColor }]}>{title}</AppText>
      <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcons name="plus" size={35} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.primary,
  },
  icon: {
    marginRight: 15,
  },
  heading: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 5,
  },
});

export default Heading;
