import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
<<<<<<< HEAD

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
import AuthNavigator from "./src/Navigation/AuthNavigator";
import Gallery from "./src/screens/Gallery";
// import { useFonts, Jost } from "@expo-google-fonts/inter";
import { AppLoading } from "expo";
import * as Font from "expo-font";
=======
import AppNavigator from "./src/Navigation/AppNavigator";
>>>>>>> 0535d92689e69fd0a40ebd830d1248fd0da8eba9

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

<<<<<<< HEAD
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
    };
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
  render() {
    if (this.state.fontsLoaded) {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={SCREENS.SPLASH}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name={SCREENS.AuthNav} component={AuthNavigator} />
            <Stack.Screen name={SCREENS.SPLASH} component={Splash} />
            <Stack.Screen name={SCREENS.Category} component={CategoryScreen} />
            <Stack.Screen name={SCREENS.ActorWE} component={ActorWEScreen} />
            <Stack.Screen name={SCREENS.CelebBio} component={CelebBio} />
            <Stack.Screen
              name={SCREENS.SingerWE}
              component={SingerWorkExperiance}
            />
            <Stack.Screen
              name={SCREENS.AlbumInput}
              component={AlbumInputForm}
            />
            <Stack.Screen
              name={SCREENS.SingerCD}
              component={SingerConcertDetails}
            />
            <Stack.Screen
              name={SCREENS.NamingApp}
              component={NamingAppScreen}
            />
            <Stack.Screen
              name={SCREENS.SportsInfo}
              component={SportsInfoScreen}
            />
            <Stack.Screen
              name={SCREENS.SportsAchievements}
              component={SportsAchievementsScreen}
            />
            <Stack.Screen
              name={SCREENS.Statistics}
              component={StatisticsScreen}
            />
            <Stack.Screen name={SCREENS.Gallery} component={Gallery} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return <AppLoading />;
    }
  }
}

=======
>>>>>>> 0535d92689e69fd0a40ebd830d1248fd0da8eba9
export default App;
