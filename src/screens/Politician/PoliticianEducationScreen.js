import React, { useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
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
import years_list from "../../constants/YearsList";
import * as EducationApi from "../../api/NamingAppApi";
import useAuth from "../../auth/useAuth";

const validationSchema = Yup.object().shape({
  institute: Yup.string().min(5).required().label("Institute"),
  degree: Yup.string().min(5).required().label(),
  year: Yup.string().required().label("Year"),
});

const PoliticianEducationScreen = ({ navigation }) => {
  const [attemptFailed, setAttemptFailed] = useState(false);
  const { user } = useAuth();

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
  return (
    <Screen>
      <Header isBack text="Criação" navigation={navigation} />
      <SubHeading title="Education" />
      <ActivityIndicator animating={attemptFailed} color={Theme.spareColor} />
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
