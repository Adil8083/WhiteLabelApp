import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import FormSingleImagePicker from "../components/forms/FormSingleImagePicker";
import Header from "../components/Header";
import ImagePickerComponent from "../components/ImagePickerComponent";
import Screen from "../components/Screen";
import SubHeading from "../components/SubHeading";
import SubmitButton from "../components/forms/SubmitButton";
import { SCREENS } from "../constants/Screens";
import Title from "../components/Title";
import { Theme } from "../constants/Theme";

const validationSchema = Yup.object().shape({
  appname: Yup.string().required().label("App Name"),
  icon: Yup.string().min(1, "Please select an image"),
});
const NamingAppScreen = ({ navigation }) => {
  return (
    <Screen>
      <Header isBack={false} navigation={navigation} text="Criação" />
      <SubHeading title="Naming App" />
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
          {/* <View style={{ marginTop: 20 }}>
            <ImagePickerComponent
              BottomHeading="App icon"
              BottomTextColor={Theme.lightColor}
            />
          </View> */}
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
});

export default NamingAppScreen;
