import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppNavigator from "./AppNavigator";
import { Theme } from "../constants/Theme";
import { SCREENS } from "../constants/Screens";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: Theme.secondary,
        activeTintColor: Theme.spareColor,
        inactiveBackgroundColor: Theme.primary,
        inactiveTintColor: Theme.textColor,
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name={SCREENS.Home}
        component={AppNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
