import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";

import AppDropDownPicker from "../../components/forms/AppDropDownPicker";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import Header from "../../components/Header";
import Screen from "../../components/Screen";
import SubHeading from "../../components/SubHeading";
import SubmitButton from "../../components/forms/SubmitButton";
import Title from "../../components/Title";
import { Theme } from "../../constants/Theme";
import { SCREENS } from "../../constants/Screens";

const validationSchema = Yup.object().shape({
  country: Yup.string().required().label("Country"),
  district: Yup.string().min(2).required().label("District"),
  area: Yup.string().min(3).required().label("Area"),
  party: Yup.string().min(5).required().label("Party"),
  position: Yup.string().min(3).required().label("Position"),
});

const PoliticianInfoScreen = ({ navigation }) => {
  const handleSubmit = (Info) => {
    console.log(Info);
    navigation.navigate(SCREENS.PoliticianAchievement);
  };
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header isBack navigation={navigation} text="Criação" />
        <SubHeading title="General information " />
        <View style={styles.container}>
          <AppForm
            initialValues={{
              country: "",
              district: "",
              area: "",
              party: "",
              position: "",
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Title name="Country" />
            {/* <AppDropDownPicker name="Country" placeholder="Select Country" /> */}
            <AppFormField
              name="country"
              placeholder="Your country"
              autoCapitalize="words"
              autoCorrect
            />
            <Title name="District" />
            <AppFormField
              autoCapitalize="words"
              autoCorrect={false}
              name="district"
              placeholder="Your district"
            />
            <Title name="Area" />
            <AppFormField
              autoCapitalize="words"
              autoCorrect={false}
              name="area"
              placeholder="Your area"
            />
            <Title name="Party" />
            <AppFormField
              autoCapitalize="words"
              autoCorrect={false}
              name="party"
              placeholder="Your affiliated party"
            />
            <Title name="Position" />
            <AppFormField
              autoCapitalize="words"
              autoCorrect={false}
              name="position"
              placeholder="Your position"
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
    padding: 10,
  },
});

export default PoliticianInfoScreen;
