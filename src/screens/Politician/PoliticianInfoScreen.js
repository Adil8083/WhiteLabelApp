import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import * as Yup from "yup";

import AppDropDownPicker from "../../components/forms/AppDropDownPicker";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import Header from "../../components/Header";
import * as PoliticianInfoApi from "../../api/politicianInfoApi";
import Screen from "../../components/Screen";
import SubHeading from "../../components/SubHeading";
import SubmitButton from "../../components/forms/SubmitButton";
import Title from "../../components/Title";
import { Theme } from "../../constants/Theme";
import { SCREENS } from "../../constants/Screens";
import useAuth from "../../auth/useAuth";
import { ActivityIndicator } from "react-native";

const validationSchema = Yup.object().shape({
  country: Yup.string().required().label("Country"),
  district: Yup.string().min(2).required().label("District"),
  area: Yup.string().min(3).required().label("Area"),
  party: Yup.string().min(5).required().label("Party"),
  position: Yup.string().min(3).required().label("Position"),
});

const PoliticianInfoScreen = ({ navigation }) => {
  const [attemptFailed, setAttemptFailed] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (Info) => {
    setAttemptFailed(true);
    const response = await PoliticianInfoApi.add(Info, user);
    if (!response.ok) {
      Alert.alert("Error", "An unexpected error occured.", [
        {
          text: "Retry",
          onPress: () => handleSubmit(Info),
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
    navigation.navigate(SCREENS.PoliticianAchievement);
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header isBack navigation={navigation} text="Criação" />
        <SubHeading title="General information " />
        <ActivityIndicator animating={attemptFailed} color={Theme.spareColor} />
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
