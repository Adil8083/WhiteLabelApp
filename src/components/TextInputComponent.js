import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";

function TextInputComponent({
  placeholder,
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
        placeholderTextColor="#B8B8B8"
        {...otherAttributes}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.lightColor,
    height: 35,
    borderRadius: 5,
    borderColor: Theme.textColor,
    borderWidth: 1,
  },
  input: {
    paddingTop: 3,
    paddingLeft: 20,
    fontSize: TextSize.NormalText,
  },
});

export default TextInputComponent;
