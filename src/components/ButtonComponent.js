import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

function ButtonComponent({ title, onPressEvent, marginTop }) {
  return (
    <TouchableOpacity>
      <View
        style={[
          styles.container,
          {
            marginTop,
          },
        ]}
      >
        <TouchableOpacity onPress={onPressEvent}>
          <Text style={styles.textStyle}>{title}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "#696969",
    borderRadius: 10,
    width: 100,
    height: 45,
  },
  textStyle: {
    alignSelf: "center",
    marginTop: 7,
    fontSize: 20,
    color: "white",
  },
});

export default ButtonComponent;
