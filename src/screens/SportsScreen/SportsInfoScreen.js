import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import * as Yup from "yup";

import AppDropDownPicker from "../../components/forms/AppDropDownPicker";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import Header from "../../components/Header";
import SubHeading from "../../components/SubHeading";
import Screen from "../../components/Screen";
import SubmitButton from "../../components/forms/SubmitButton";
import { SCREENS } from "../../constants/Screens";
import sportsCategories from "../../constants/SportsCategories";
import Title from "../../components/Title";
import { Theme } from "../../constants/Theme";
import { ScrollView } from "react-native";
import useAuth from "../../auth/useAuth";
import * as SportInfoApi from "../../api/SportsInfoApi";

const validationSchema = Yup.object().shape({
  sport: Yup.string().required().label("Sport"),
  teamName: Yup.string().required().label("Team Name"),
  position_in_team: Yup.string().required().label("Postion"),
});

const SportsInfoScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [attemptFailed, setAttempFailed] = useState(false);
  const [sport, setSport] = useState("");
  const [teamName, setTeamName] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    setAttempFailed(true);
    const response = await SportInfoApi.read(user);
    if (!response.ok) {
      Alert.alert("Error", "Could not load information", [
        {
          text: "Retry",
          onPress: () => getInfo(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      setAttempFailed(false);
      return;
    }
    const array = response.data;
    if (array.length <= 0) {
      return;
    } else {
      setSport(array[0].sport);
      setTeamName(array[0].teamName);
      setPosition(array[0].position_in_team);
    }
    setAttempFailed(false);
  };

  const handleSubmit = async (SportInfo) => {
    setAttempFailed(true);
    const response = await SportInfoApi.add(SportInfo, user);
    if (!response.ok) {
      Alert.alert("Error", "An unexpected error has occured", [
        {
          text: "OK",
        },
      ]);
      setAttempFailed(false);
      return;
    }
    setAttempFailed(false);
    navigation.navigate(SCREENS.SportsAchievements, {
      sport: SportInfo.sport,
    });
  };
  return (
    <Screen>
      <ActivityIndicator animating={attemptFailed} color={Theme.spareColor} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header isBack navigation={navigation} text="Criação" />
        <SubHeading title="Sport information" />
        <View
          style={{
            backgroundColor: Theme.secondary,
            borderRadius: 15,
            padding: 10,
          }}
        >
          <AppForm
            initialValues={{
              sport: sport,
              teamName: teamName,
              position_in_team: position,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Title name="Select sport" />
            <AppDropDownPicker
              items={sportsCategories}
              placeholder="Select Sport"
              name="sport"
            />
            <Title name="Team name" />
            <AppFormField
              autoCorrect={false}
              name="teamName"
              placeholder="Your team"
            />
            <Title name="Position in team" />
            <AppFormField
              autoCorrect={false}
              name="position_in_team"
              placeholder="Your position in team"
            />
            <SubmitButton title="Next" />
          </AppForm>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.secondary,
    borderRadius: 15,
    margin: 10,
    padding: 10,
  },
});

export default SportsInfoScreen;
