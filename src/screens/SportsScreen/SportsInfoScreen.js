import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import * as Yup from "yup";

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AppFormPicker from "../../components/forms/AppFormPicker";
import SubmitButton from "../../components/forms/SubmitButton";
import Header from "../../components/Header";
import Screen from "../../components/Screen";
import Title from "../../components/Title";
import { SCREENS } from "../../constants/Screens";
import { Theme } from "../../constants/Theme";

const validationSchema = Yup.object().shape({
  category: Yup.object().required().nullable().label("Category"),
  teamName: Yup.string().required().label("Team Name"),
  position: Yup.string().required().label("Postion"),
});

const sportsCategories = [
  {
    id: 1,
    label: "Cricket",
  },
  {
    id: 2,
    label: "Football",
  },
];

const SportsInfoScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: Theme.primary,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View style={{ width: "90%" }}>
        <Header isback navigation={navigation} text="Sports info" />
        <View
          style={{
            backgroundColor: Theme.secondary,
            borderRadius: 15,
            padding: 10,
          }}
        >
          <AppForm
            initialValues={{ category: null, teamName: "", position: "" }}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate(SCREENS.SportsAchievements);
            }}
            validationSchema={validationSchema}
          >
            <Title name="Select sport" />
            <AppFormPicker
              icon="apps"
              items={sportsCategories}
              name="category"
              placeholder="Sport"
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
      </View>
    </View>
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
