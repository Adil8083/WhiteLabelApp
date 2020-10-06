import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./src/Navigation/AppNavigator";
import AuthNavigator from "./src/Navigation/AuthNavigator";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
      {/* <AuthNavigator /> */}
    </NavigationContainer>
  );
};

export default App;
