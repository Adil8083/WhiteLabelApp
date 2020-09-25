import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ActorWEScreen from "./src/screens/ActorWEScreen";
import Splash from "./src/screens/Splash";
import { SCREENS } from "./src/constants/Screens";
import CelebBio from "./src/screens/CelebBio";
import SingerWorkExperiance from "./src/screens/SingerWorkExperiance";
import SingerConcertDetails from "./src/screens/SingerConcertDetails";
import AlbumInputForm from "./src/components/AlbumInputForm";
import NamingAppScreen from "./src/screens/NamingAppScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import SportsInfoScreen from "./src/screens/SportsScreen/SportsInfoScreen";
import SportsAchievementsScreen from "./src/screens/SportsScreen/SportsAchievementsScreen";
import StatisticsScreen from "./src/screens/SportsScreen/cricket/StatisticsScreen";
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
        <Stack.Screen
          name={SCREENS.SingerWE}
          component={SingerWorkExperiance}
        />
        <Stack.Screen name={SCREENS.AlbumInput} component={AlbumInputForm} />
        <Stack.Screen
          name={SCREENS.SingerCD}
          component={SingerConcertDetails}
        />
        <Stack.Screen name={SCREENS.NamingApp} component={NamingAppScreen} />
        <Stack.Screen name={SCREENS.Category} component={CategoryScreen} />
        <Stack.Screen name={SCREENS.SportsInfo} component={SportsInfoScreen} />
        <Stack.Screen
          name={SCREENS.SportsAchievements}
          component={SportsAchievementsScreen}
        />
        <Stack.Screen name={SCREENS.Statistics} component={StatisticsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
