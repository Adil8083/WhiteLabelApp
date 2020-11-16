import React from "react";
import LottieView from "lottie-react-native";

const ActivityIndicator = ({ vsisible = false }) => {
  if (!vsisible) return null;
  return (
    <LottieView
      style={{ width: 400, height: 400, flex: 1 }}
      source={require("../../assets/animations/loader.json")}
      speed={1}
      loop
      autoPlay
    />
  );
};

export default ActivityIndicator;
