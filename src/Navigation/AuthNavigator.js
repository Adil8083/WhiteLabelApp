import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SearchAccountScreen from "../screens/ForgotPasword/SearchAccountScreen";
import { SCREENS } from "../constants/Screens";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.LogIn} component={LoginScreen} />
      <Stack.Screen name={SCREENS.SignUp} component={SignUpScreen} />
      <Stack.Screen
        name={SCREENS.SearchAccount}
        component={SearchAccountScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
