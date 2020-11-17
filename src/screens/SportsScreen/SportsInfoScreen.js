import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
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

const validationSchema = Yup.object().shape({
  sport: Yup.string().required().label("Sport"),
  teamName: Yup.string().required().label("Team Name"),
  position: Yup.string().required().label("Postion"),
});

const SportsInfoScreen = ({ navigation }) => {
  return (
    <Screen>
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
            initialValues={{ sport: "", teamName: "", position: "" }}
            onSubmit={(values) => {
              navigation.navigate(SCREENS.SportsAchievements, {
                sport: values.sport,
              });
            }}
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
              name="position"
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
