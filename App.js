import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/Navigation/AppNavigator";
import AuthNavigator from "./src/Navigation/AuthNavigator";

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
      {/* <AuthNavigator /> */}
    </NavigationContainer>
  );
};

export default App;
