import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";

const AccountItems = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    height: 40,
    width: "100%",
    flexDirection: "row",
  },
  title: {
    fontSize: TextSize.SubHeading,
    color: Theme.textColor,
    marginLeft: 10,
    marginTop: 5,
  },
});

export default AccountItems;
