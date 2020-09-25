import React from "react";
import { StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import Screen from "../../components/Screen";
import SubmitButton from "../../components/forms/SubmitButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});
const SearchAccountScreen = () => {
  return (
    <Screen>
      <Text style={styles.heading}>
        Enter the email associated with your account to reset password.
      </Text>
      <AppForm
        initialValues={{ email: "" }}
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
        <SubmitButton title="Search" />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  heading: {
    alignItems: "center",
    fontSize: 25,
    margin: 20,
    fontWeight: "bold",
  },
});

export default SearchAccountScreen;
