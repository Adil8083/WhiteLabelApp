import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { startClock } from "react-native-reanimated";
import { SCREENS } from "../constants/Screens";
import AccountScreen from "../screens/AccountScreen";
import ChangePasswordScreen from "../screens/ForgotPasword/ChangePasswordScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.AccountScreen} component={AccountScreen} />
      <Stack.Screen name={SCREENS.Settings} component={SettingsScreen} />
      <Stack.Screen
        name={SCREENS.ChangePasswordScreen}
        component={ChangePasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
