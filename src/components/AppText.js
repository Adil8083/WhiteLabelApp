import React from "react";
import { Text } from "react-native";

import defaultStyles from "../config/styles";

function AppText({ children, styleText }) {
  return <Text style={[defaultStyles.text, { ...styleText }]}>{children}</Text>;
}

export default AppText;
