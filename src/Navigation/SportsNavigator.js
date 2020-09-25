import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SportsInfoScreen from "../screens/SportsScreen/SportsInfoScreen";
import SportsAchievementsScreen from "../screens/SportsScreen/SportsAchievementsScreen";
import StatisticsScreen from "../screens/SportsScreen/cricket/StatisticsScreen";

const Stack = createStackNavigator();

const SportsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Sport Info" component={SportsInfoScreen} />
      <Stack.Screen name="Achievements" component={SportsAchievementsScreen} />
      <Stack.Screen name="Add Statistics" component={StatisticsScreen} />
    </Stack.Navigator>
  );
};

export default SportsNavigator;
