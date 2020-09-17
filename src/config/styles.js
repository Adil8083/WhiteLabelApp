import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  container: {
    padding: 10,
  },
  text: {
    color: colors.dark,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  title: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    width: 150,
    height: 150,
    marginTop: 50,
    marginBottom: 20,
    flexDirection: "row",
  },
};
