import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
  ScrollView,
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
      <ActivityIndicator
        animating={attempFailed}
        color={Theme.spareColor}
        size={20}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ backgroundColor: Theme.secondary, borderRadius: 20 }}>
          <View style={styles.container}>
            <Category
              name="movie"
              text="Actor"
              onPress={() => handleSubmit("Actor", SCREENS.ActorWE)}
            />

            <Category
              name="music"
              text="Singer"
              onPress={() => handleSubmit("Singer", SCREENS.SingerWE)}
            />
          </View>
          <View style={styles.container}>
            <Category
              name="cricket"
              text="SportsPerson"
              onPress={() => handleSubmit("SportsPerson", SCREENS.SportsInfo)}
            />
            <Category
              name="briefcase"
              text="Politician"
              onPress={() => handleSubmit("Politician", SCREENS.PoliticianInfo)}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Theme.secondary,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 10,
    padding: 10,
    marginBottom: 5,
  },
  mainContainter: {
    flex: 1,
    alignItems: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Theme.primary,
  },
});

export default CategoryScreen;
