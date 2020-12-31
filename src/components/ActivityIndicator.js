import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/animations/loader.json")}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    zIndex: 1,
    opacity: 0.8,
  },
});

export default ActivityIndicator;
