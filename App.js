import React from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ActorWEScreen from "./src/screens/ActorWEScreen";
import Splash from "./src/screens/Splash";
import { SCREENS } from "./src/constants/Screens";
import CelebBio from './src/screens/CelebBio';
import SingerWorkExperiance from './src/screens/SingerWorkExperiance';
import SingerConcertDetails from './src/screens/SingerConcertDetails';
import AlbumInputForm from './src/components/AlbumInputForm';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREENS.SPLASH}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={SCREENS.SPLASH} component={Splash} />
        <Stack.Screen name={SCREENS.ActorWE} component={ActorWEScreen} />
        <Stack.Screen name={SCREENS.CelebBio} component={CelebBio} />
        <Stack.Screen name={SCREENS.SingerWE} component={SingerWorkExperiance} />
        <Stack.Screen name={SCREENS.AlbumInput} component={AlbumInputForm} />
        <Stack.Screen name={SCREENS.SingerCD} component={SingerConcertDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
