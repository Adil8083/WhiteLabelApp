import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AlbumInputForm from "../components/AlbumInputForm";
import ActorWEScreen from "../screens/ActorWEScreen";
import CategoryScreen from "../screens/CategoryScreen";
import CelebBio from "../screens/CelebBio";
import NamingAppScreen from "../screens/NamingAppScreen";
import SportsInfoScreen from "../screens/SportsScreen/SportsInfoScreen";
import SportsAchievementsScreen from "../screens/SportsScreen/SportsAchievementsScreen";
import StatisticsScreen from "../screens/SportsScreen/cricket/StatisticsScreen";
import SingerWorkExperiance from "../screens/SingerWorkExperiance";
import SingerConcertDeatils from "../screens/SingerConcertDetails";
import Gallery from "../screens/Gallery";
import { SCREENS } from "../constants/Screens";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.SPLASH}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={SCREENS.NamingApp} component={NamingAppScreen} />
      <Stack.Screen name={SCREENS.ActorWE} component={ActorWEScreen} />
      <Stack.Screen name={SCREENS.Gallery} component={Gallery} />
      <Stack.Screen name={SCREENS.CelebBio} component={CelebBio} />
      <Stack.Screen name={SCREENS.SingerWE} component={SingerWorkExperiance} />
      <Stack.Screen name={SCREENS.AlbumInput} component={AlbumInputForm} />
      <Stack.Screen name={SCREENS.SingerCD} component={SingerConcertDeatils} />
      <Stack.Screen name={SCREENS.Category} component={CategoryScreen} />
      <Stack.Screen name={SCREENS.SportsInfo} component={SportsInfoScreen} />
      <Stack.Screen
        name={SCREENS.SportsAchievements}
        component={SportsAchievementsScreen}
      />
      <Stack.Screen name={SCREENS.Statistics} component={StatisticsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
