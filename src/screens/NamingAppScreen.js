import React from "react";
import { View } from "react-native";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
import SubmitButton from "../components/forms/SubmitButton";
import { SCREENS } from "../constants/Screens";
import Title from "../components/Title";

const validationSchema = Yup.object().shape({
  appname: Yup.string().required().label("App Name"),
  icon: Yup.array().min(1, "Please select an image"),
});
const NamingAppScreen = ({ navigation }) => {
  return (
    <Screen>
      <View style={{ padding: 10 }}>
        <AppForm
          initialValues={{ appname: "", icon: [] }}
          onSubmit={() => navigation.navigate(SCREENS.CelebBio)}
          validationSchema={validationSchema}
        >
          <Title name="App Name" />
          <AppFormField
            autoCorrect={false}
            name="appname"
            placeholder="Your app name"
          />
          <Title name="Select Icon" />
          <FormImagePicker name="icon" />
          <SubmitButton title="Next" />
        </AppForm>
      </View>
    </Screen>
  );
};

export default NamingAppScreen;
