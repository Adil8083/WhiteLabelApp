import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import NamingAppScreen from "../screens/NamingAppScreen";
import CategoryScreen from "../screens/CategoryScreen";
import SportsInfoScreen from "../screens/SportsScreen/SportsInfoScreen";
import SportsAchievementsScreen from "../screens/SportsScreen/SportsAchievementsScreen";
import StatisticsScreen from "../screens/SportsScreen/cricket/StatisticsScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="App information" component={NamingAppScreen} />
      <Stack.Screen name="Select Category" component={CategoryScreen} />
      <Stack.Screen name="Sport Info" component={SportsInfoScreen} />
      <Stack.Screen name="Achievements" component={SportsAchievementsScreen} />
      <Stack.Screen name="Add Statistics" component={StatisticsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
