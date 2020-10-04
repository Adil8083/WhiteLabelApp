import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import TextSize from "../constants/TextSize";

function DescriptionComponent({
  placeholder,
  containerStyle,
  ...otherAttributes
}) {
  const [text, setText] = useState();
  return (
    <View style={[styles.container, containerStyle && containerStyle]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={(text) => getValue(text)}
        placeholderTextColor="#B8B8B8"
        onChangeText={(text) => setText(text)}
        {...otherAttributes}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#dfdfdf",
    borderWidth: 1,
    marginTop: 20,
    justifyContent: "flex-start",
  },
  input: {
    paddingLeft: 20,
    fontSize: TextSize.Normal,
  },
});

export default DescriptionComponent;
