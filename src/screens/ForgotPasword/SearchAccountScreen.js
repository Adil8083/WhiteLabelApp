import React from "react";
import { StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import Screen from "../../components/Screen";
import SubmitButton from "../../components/forms/SubmitButton";
import TextSize from "../../constants/TextSize";
import { Theme } from "../../constants/Theme";

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
          placeholder="Your registered email"
        />
        <SubmitButton title="Search" />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  heading: {
    alignItems: "center",
    color: Theme.lightColor,
    fontSize: TextSize.SubHeading,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default SearchAccountScreen;
