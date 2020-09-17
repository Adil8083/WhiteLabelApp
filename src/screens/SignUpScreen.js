import React from "react";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppText from "../components/AppText";
import AppFormField from "../components/forms/AppFormField";
import Screen from "../components/Screen";
import styles from "../config/styles";
import SubmitButton from "../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

const SignUpScreen = () => {
  return (
    <Screen>
      <AppText style={styles.title}>Craciao</AppText>
      <AppForm
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCorrect={false}
          placeholder="Your Name"
          name="name"
          icon="keyboard"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          name="email"
          keyboardType="email-address"
          placeholder="Email"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntery
        />
        <SubmitButton title="Create Account" />
      </AppForm>
    </Screen>
  );
};

export default SignUpScreen;
