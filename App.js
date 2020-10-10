import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/Navigation/AppNavigator";
import AuthNavigator from "./src/Navigation/AuthNavigator";
import TabNavigation from "./src/Navigation/TabNavigation";

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
      {/* <AuthNavigator /> */}
    </NavigationContainer>
  );
};

export default App;
