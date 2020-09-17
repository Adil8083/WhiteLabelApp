import React from "react";
import { View } from "react-native";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppText from "../components/AppText";
import FormImagePicker from "../components/forms/FormImagePicker";
import Screen from "../components/Screen";
import styles from "../config/styles";
import SubmitButton from "../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  appname: Yup.string().required().label("App Name"),
  icon: Yup.object().nullable().required().label("Icon"),
});
const NamingAppScreen = () => {
  return (
    <Screen>
      <AppText style={styles.title}>AppInfo</AppText>
      <View style={styles.container}>
        <AppForm
          initialValues={{ appname: "", icon: null }}
          onSubmit={(values) => console.log(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCorrect={false}
            icon="keyboard"
            name="appname"
            placeholder="Your app name"
          />
          <FormImagePicker name="icon" />
          <SubmitButton title="Next" />
        </AppForm>
      </View>
    </Screen>
  );
};

export default NamingAppScreen;
