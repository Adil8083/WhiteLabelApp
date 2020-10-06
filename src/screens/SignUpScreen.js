import React from "react";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import Screen from "../components/Screen";
import SubmitButton from "../components/forms/SubmitButton";
import Title from "../components/Title";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

const SignUpScreen = () => {
  return (
    <Screen>
      <AppForm
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <Title name="Your Name" />
        <AppFormField
          autoCorrect={false}
          icon="keyboard"
          name="name"
          placeholder="Enter full name"
        />
        <Title name="Email" />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          name="email"
          keyboardType="email-address"
          placeholder="Enter email"
        />
        <Title name="Password" />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Enter password"
          secureTextEntery
        />
        <SubmitButton title="Create Account" />
      </AppForm>
    </Screen>
  );
};

export default SignUpScreen;
