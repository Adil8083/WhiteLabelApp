import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Theme } from "../constants/Theme";

function TextInputComponent({
  placeholder,
  width,
  getValue,
  containerStyle,
  ...otherAttributes
}) {
  return (
    <View
      style={[
        styles.container,
        { justifyContent: "center", paddingLeft: 10, marginTop: 15 },
        containerStyle && containerStyle,
      ]}
    >
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
    backgroundColor: Theme.lightColor,
    borderRadius: 5,
    height: 35,
    borderColor: Theme.spareColor,
    borderWidth: 1,
  },
  input: {
    paddingTop: 3,
    paddingLeft: 20,
    fontSize: 17,
  },
});

export default TextInputComponent;
