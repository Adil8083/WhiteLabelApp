import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Theme } from "../constants/Theme";

const TextInputComponent = ({
  placeholder,
  width,
  containerStyle,
  ...otherAttributes
}) => {
  return (
    <View
      style={[
        styles.container,
        { width: width },
        containerStyle && containerStyle,
      ]}
    >
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#808080"
        {...otherAttributes}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.primary,
    borderColor: "#dfdfdf",
    borderRadius: 10,
    borderWidth: 1,
    height: 35,
    marginBottom: 15,
    justifyContent: "center",
    paddingLeft: 10,
    marginTop: 15,
  },
  input: {
    fontSize: 17,
    paddingTop: 3,
    paddingLeft: 20,
    marginBottom: 5,
    color: Theme.textColor,
  },
});

export default TextInputComponent;
