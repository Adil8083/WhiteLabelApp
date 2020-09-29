import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

function TextInputComponent({ placeholder, width, getValue, ...otherAttributes }) {
  return (
    <View style={[styles.container, { width: parseInt(width) }]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#D8D8D8"
        onChangeText={(text) => getValue(text)}

        {...otherAttributes}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    marginLeft: 20,
    height: 35,
    marginTop: 25,
  },
  input: {
    paddingTop: 3,
    paddingLeft: 20,
    fontSize: 17,
    fontFamily: "Roboto",
  },
});

export default TextInputComponent;
