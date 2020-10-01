import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

function DescriptionComponent({ placeholder, width, ...otherAttributes }) {
  const [text, setText] = useState();
  return (
    <View style={[styles.container, { width: parseInt(width) }]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={(text) => getValue(text)}
        placeholderTextColor="#D8D8D8"
        onChangeText={(text) => setText(text)}
        {...otherAttributes}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    marginTop: 25,
    marginLeft: 20,
    justifyContent: "flex-start",
  },
  input: {
    paddingLeft: 20,
    fontSize: 17,
  },
});

export default DescriptionComponent;
