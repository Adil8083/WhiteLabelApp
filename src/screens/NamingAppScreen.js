import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
import SubmitButton from "../components/forms/SubmitButton";
import { SCREENS } from "../constants/Screens";
import Title from "../components/Title";
import { Theme } from "../constants/Theme";
import Header from "../components/Header";
import Normalheader from "../components/Normalheader";
import ImagePickerComponent from "../components/ImagePickerComponent";

const validationSchema = Yup.object().shape({
  appname: Yup.string().required().label("App Name"),
  icon: Yup.array().min(1, "Please select an image"),
});
const NamingAppScreen = ({ navigation }) => {
  return (
    <Screen>
      <Normalheader text="Criação" />
      <View style={styles.container}>
        <AppForm
          initialValues={{ appname: "", icon: "" }}
          onSubmit={() => navigation.navigate(SCREENS.CelebBio)}
          validationSchema={validationSchema}
        >
          <Title name="App Name" />
          <AppFormField
            autoCorrect={false}
            name="appname"
            placeholder="Your app name"
          />
          <View style={{ marginTop: 20 }}>
            <ImagePickerComponent
              BottomHeading="App icon"
              BottomTextColor={Theme.lightColor}
            />
          </View>
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
    width: "90%",
  },
});

export default NamingAppScreen;
