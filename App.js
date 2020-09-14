import React from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ActorWEScreen from "./src/screens/ActorWEScreen";
import Splash from "./src/screens/Splash";
import { SCREENS } from "./src/constants/Screens";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={SCREENS.SPLASH} component={Splash} />
        <Stack.Screen name={SCREENS.ACTOR} component={ActorWEScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
