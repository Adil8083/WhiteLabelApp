import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";
function pickerItems({ items, onPressEvent }) {
  return (
    <TouchableHighlight underlayColor="#F0F0F0" onPress={onPressEvent}>
      <Text style={styles.text}>{items.name}</Text>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: TextSize.NormalText,
    paddingLeft: 45,
    padding: 15,
    color: Theme.textColor,
  },
});

export default pickerItems;
