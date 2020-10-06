import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import TextSize from "../../constants/TextSize";
import { Theme } from "../../constants/Theme";

const PickerItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{item.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 10,
    fontSize: TextSize.NormalText,
    color: Theme.textColor,
  },
});

export default PickerItem;
