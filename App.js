import React from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ActorWEScreen from "./src/screens/ActorWEScreen";
import Splash from "./src/screens/Splash";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ActorScreen">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="ActorScreen" component={ActorWEScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
