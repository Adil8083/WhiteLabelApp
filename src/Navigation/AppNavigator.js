import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NamingAppScreen from "../screens/NamingAppScreen";
import CategoryScreen from "../screens/CategoryScreen";
import SportsNavigator from "./SportsNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="App information" component={NamingAppScreen} />
      <Stack.Screen name="Select Category" component={CategoryScreen} />
      <Stack.Screen name="Sports" component={SportsNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
