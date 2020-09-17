import React from "react";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import Screen from "../components/Screen";
import styles from "../config/styles";
import SubmitButton from "../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

const LoginScreen = () => {
  return (
    <Screen style={styles.conntainer}>
      <AppText style={styles.title}>Craciao</AppText>

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          name="email"
          keyboardType="email-address"
          placeholder="Email"
        />
        <AppFormField
          autoCorrect={false}
          autoCapitalize="none"
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
        />
        <SubmitButton title="Login" />
      </AppForm>
      <AppButton title="SignUp" onPress={() => console.log("SignUP")} />
    </Screen>
  );
};

export default LoginScreen;
