import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";
function pickerItems({ items, onPressEvent }) {
  return (
    <TouchableOpacity underlayColor="#F0F0F0" onPress={onPressEvent}>
      <Text style={styles.text}>{items.name}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: TextSize.NormalText,
    paddingLeft: 45,
    padding: 15,
    color: Theme.DarkGrey,
  },
});

export default pickerItems;
