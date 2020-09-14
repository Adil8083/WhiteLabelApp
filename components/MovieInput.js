import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

export default function MovieInput({ onChange, addMovie }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text}
        placeholder="Enter Movie"
        onChangeText={(val) => onChange(val)}
      />
      <TouchableOpacity onPress={addMovie}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add Movie</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  text: {
    margin: 10,
    borderBottomWidth: 2,
    borderColor: "grey",
    paddingTop: 10,
    width: "80%",
    height: 30,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    color: "black",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});
