import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";
function pickerItems({ items, onPressEvent }) {
  return (
    <TouchableHighlight underlayColor="#F0F0F0" onPress={onPressEvent}>
      <Text style={styles.text}>{items.name}</Text>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    paddingLeft: 45,
    padding: 15,
  },
});

export default pickerItems;
