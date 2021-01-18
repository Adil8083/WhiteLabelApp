import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as Yup from "yup";

import AppDropDownPicker from "../../components/forms/AppDropDownPicker";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import SubmitButton from "../../components/forms/SubmitButton";
import Header from "../../components/Header";
import Screen from "../../components/Screen";
import SubHeading from "../../components/SubHeading";
import Title from "../../components/Title";
import { SCREENS } from "../../constants/Screens";
import { Theme } from "../../constants/Theme";
import * as EducationApi from "../../api/NamingAppApi";
import useAuth from "../../auth/useAuth";
import client from "../../api/client";
import ActivityIndicator from "../../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  institute: Yup.string().min(5).required().label("Institute"),
  degree: Yup.string().min(5).required().label(),
  year: Yup.string().required().label("Year"),
});

const PoliticianEducationScreen = ({ navigation }) => {
  const [attemptFailed, setAttemptFailed] = useState(false);
  const { user } = useAuth();
  const [years_list, setYearsList] = useState([]);

  const handleSubmit = async ({ institute, degree, year }) => {
    setAttemptFailed(true);
    const response = await EducationApi.add(
      {
        PoliticianEducation: [
          { institute: institute, degree: degree, year: year },
        ],
      },
      user
    );
    if (!response.ok) {
      Alert.alert("Error", "An unexpected error occured.", [
        {
          text: "Retry",
          onPress: () => handleSubmit({ institute, degree, year }),
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
    navigation.navigate(SCREENS.PoliticianProjects);
  };
  const getYears = async () => {
    let Response = await client.get("/year/get");
    if (!Response.ok) {
      Alert.alert("Attention", "Unable to Load Years Data", [
        {
          text: "Retry",
          onPress: () => AsynFunc(),
        },
        { text: "Cancel" },
      ]);
      return;
    }
    setYearsList(Response.data);
  };
  useEffect(() => {
    getYears();
  }, []);
  return (
    <>
      <ActivityIndicator visible={attemptFailed} />
      <Screen>
        <Header isBack text="Criação" navigation={navigation} />
        <SubHeading title="Education" />
        <View style={styles.container}>
          <AppForm
            initialValues={{ institute: "", degree: "", year: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Title name="Year" />
            <AppDropDownPicker
              items={years_list}
              name="year"
              placeholder="Select year"
            />
            <Title name="Institute" />
            <AppFormField
              autoCaplitalize="words"
              autoCorrect={false}
              name="institute"
              placeholder="Your last attended institute."
            />
            <Title name="Degree" />
            <AppFormField
              autoCaplitalize="words"
              autoCorrect={false}
              name="degree"
              placeholder="Your last degree."
            />

            <SubmitButton title="Next" />
          </AppForm>
        </View>
      </Screen>
    </>
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

export default PoliticianEducationScreen;
