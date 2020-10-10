import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppNavigator from "./AppNavigator";
import AccountScreen from "../screens/AccountScreen";
import { Theme } from "../constants/Theme";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: Theme.secondary,
        activeTintColor: Theme.spareColor,
        inactiveBackgroundColor: Theme.primary,
        inactiveTintColor: Theme.textColor,
      }}
    >
      <Tab.Screen
        name="Home"
        component={AppNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountScreen}
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
