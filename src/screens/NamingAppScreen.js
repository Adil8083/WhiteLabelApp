import React, { useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import Header from "../components/Header";
import FormSingleImagePicker from "../components/forms/FormSingleImagePicker";
import Screen from "../components/Screen";
import SubHeading from "../components/SubHeading";
import SubmitButton from "../components/forms/SubmitButton";
import { SCREENS } from "../constants/Screens";
import Title from "../components/Title";
import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";
import useAuth from "../auth/useAuth";
import * as NamingApi from "../api/NamingAppApi";

const validationSchema = Yup.object().shape({
  appname: Yup.string().required().label("App Name"),
  icon: Yup.array().min(1, "Please add an icon"),
});
const NamingAppScreen = ({ navigation }) => {
  const [attempFailed, setAttemptFailed] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (NamingObject) => {
    setAttemptFailed(true);
    const response = await NamingApi.add(NamingObject, user);
    if (!response.ok) {
      Alert.alert("Attention", "An unexpected error occured.", [
        { text: "OK" },
      ]);
      setAttemptFailed(false);
      return;
    }
    setAttemptFailed(false);
    navigation.navigate(SCREENS.CelebBio);
  };

  return (
    <Screen>
      <ActivityIndicator animating={attempFailed} color={Theme.spareColor} />
      <Header isBack={false} navigation={navigation} text="Criação" />
      <SubHeading title="Naming App" />
      <View style={styles.container}>
        <AppForm
          initialValues={{ appname: "", icon: [] }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Title name="App Name" />
          <AppFormField
            autoCorrect={false}
            name="appname"
            placeholder="Your app name"
          />
          <Title name="Icon" />
          <FormSingleImagePicker name="icon" />
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
    padding: 10,
  },
  error: {
    color: "red",
    fontSize: TextSize.NormalText,
    fontStyle: "italic",
  },
});

export default NamingAppScreen;
