import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AlbumInputForm from "../components/AlbumInputForm";
import ActorWEScreen from "../screens/ActorWEScreen";
import ActorEducation from "../screens/ActorEducation";
import CategoryScreen from "../screens/CategoryScreen";
import CricketStatisticsScreen from "../screens/SportsScreen/CricketStatisticsScreen";
import CelebBio from "../screens/CelebBio";
import FootballStatisticsScreen from "../screens/SportsScreen/FootballStatisticsScreen";
import Gallery from "../screens/Gallery";
import NamingAppScreen from "../screens/NamingAppScreen";
import PoliticianEducationScreen from "../screens/Politician/PoliticianEducationScreen";
import PoliticianInfoScreen from "../screens/Politician/PoliticianInfoScreen";
import PoliticianAchievementScreen from "../screens/Politician/PoliticianAchievementScreen";
import PoliticianProjectScreen from "../screens/Politician/PoliticianProjectScreen";
import SportsInfoScreen from "../screens/SportsScreen/SportsInfoScreen";
import SportsAchievementsScreen from "../screens/SportsScreen/SportsAchievementsScreen";
import SingerWorkExperiance from "../screens/SingerWorkExperiance";
import SingerConcertDeatils from "../screens/SingerConcertDetails";
import SocialAccounts from "../screens/SocialAccounts";
import GenerateApk from "../screens/GenerateApk";
import ActorHobbies from "../screens/ActorHobbies";
import EditScreen from "../screens/EditScreen";
import ActorAchievement from "../screens/ActorAchievement";
import { SCREENS } from "../constants/Screens";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.NamingApp}
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
      <Stack.Screen name={SCREENS.SocialAccounts} component={SocialAccounts} />
      <Stack.Screen name={SCREENS.Category} component={CategoryScreen} />
      <Stack.Screen name={SCREENS.SportsInfo} component={SportsInfoScreen} />
      <Stack.Screen
        name={SCREENS.SportsAchievements}
        component={SportsAchievementsScreen}
      />
      <Stack.Screen name={SCREENS.ActorEdu} component={ActorEducation} />
      <Stack.Screen name={SCREENS.ActorHobbies} component={ActorHobbies} />
      <Stack.Screen
        name={SCREENS.FootBallStatistics}
        component={FootballStatisticsScreen}
      />
      <Stack.Screen
        name={SCREENS.CricketStatistics}
        component={CricketStatisticsScreen}
      />
      <Stack.Screen
        name={SCREENS.PoliticianInfo}
        component={PoliticianInfoScreen}
      />
      <Stack.Screen
        name={SCREENS.PoliticianAchievement}
        component={PoliticianAchievementScreen}
      />
      <Stack.Screen
        name={SCREENS.PoliticianEducation}
        component={PoliticianEducationScreen}
      />
      <Stack.Screen
        name={SCREENS.PoliticianProjects}
        component={PoliticianProjectScreen}
      />
      <Stack.Screen name={SCREENS.GenerateApk} component={GenerateApk} />
      <Stack.Screen name={SCREENS.EditScreen} component={EditScreen} />
      <Stack.Screen
        name={SCREENS.ActorAchievement}
        component={ActorAchievement}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
