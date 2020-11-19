import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";

import Category from "../components/Category";
import Header from "../components/Header";
import Screen from "../components/Screen";
import { SCREENS } from "../constants/Screens";
import SubHeading from "../components/SubHeading";
import { Theme } from "../constants/Theme";
import useAuth from "../auth/useAuth";
import * as NamingApi from "../api/NamingAppApi";

const CategoryScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [attempFailed, setAttemptFailed] = useState(false);

  const handleSubmit = async (name, Screen) => {
    setAttemptFailed(true);
    const response = await NamingApi.add({ Category: name }, user);
    if (!response.ok) {
      Alert.alert("Error", "An unexpected error has occured.", [
        {
          text: "Retry",
          onPress: () => handleSubmit(name, Screen),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      setAttemptFailed(false);
      return;
    }
    setAttemptFailed(false);
    navigation.navigate(Screen);
  };

  return (
    <Screen>
      <Header isBack navigation={navigation} text="Criação" />
      <SubHeading title="Select your category" />
      <ActivityIndicator animating={attempFailed} color={Theme.spareColor} />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handleSubmit("Actor", SCREENS.ActorWE)}
        >
          <Category name="movie" text="Actor" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSubmit("Singer", SCREENS.SingerWE)}
        >
          <Category name="music" text="Singer" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSubmit("SportsPerson", SCREENS.SportsInfo)}
        >
          <Category name="cricket" text="SportsPerson" />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Theme.secondary,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    padding: 10,
  },
  mainContainter: {
    flex: 1,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Theme.primary,
  },
});

export default CategoryScreen;
