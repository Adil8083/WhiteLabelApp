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
        placeholderTextColor="#D3D3D3"
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
    fontSize: TextSize.NormalText,
  },
});

export default TextInputComponent;
