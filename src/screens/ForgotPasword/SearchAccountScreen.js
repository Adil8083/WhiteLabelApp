import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AuthApi from "../../api/auth";
import ErrorMessgae from "../../components/forms/ErrorMessgae";
import Header from "../../components/Header";
import Screen from "../../components/Screen";
import SubmitButton from "../../components/forms/SubmitButton";
import SubHeading from "../../components/SubHeading";
import { SCREENS } from "../../constants/Screens";
import TextSize from "../../constants/TextSize";
import { Theme } from "../../constants/Theme";
import ActivityIndicator from "../../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const SearchAccountScreen = ({ navigation }) => {
  const [attemptFailed, setAttemptFailed] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async ({ email }) => {
    setAttemptFailed(true);
    const response = await AuthApi.forgotPassword(email);

    if (!response.ok) {
      setAttemptFailed(false);
      setSearchFailed(true);
      if (response.data) {
        setError(response.data);
        return;
      }
      setError("An unexpected error occured");
      return;
    }

    setAttemptFailed(false);
    setSearchFailed(false);
    let code = response.data;
    code = code.toString();
    navigation.navigate(SCREENS.CheckPassword, {
      CODE: code,
      EMAIL: email,
    });
  };

  return (
    <>
      <ActivityIndicator visible={attemptFailed} />
      <Screen>
        <Header isBack={true} navigation={navigation} text="Criação" />
        <SubHeading title="Forgot Password" />
        <ErrorMessgae error={error} visible={searchFailed} />
        <View style={styles.container}>
          <Text style={styles.heading}>
            Enter the email associated with your account to reset password.
          </Text>
          <AppForm
            initialValues={{ email: "" }}
            onSubmit={handleSubmit}
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
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.secondary,
    borderRadius: 15,
    margin: 10,
    padding: 10,
  },
  heading: {
    alignItems: "center",
    color: Theme.lightColor,
    fontSize: TextSize.SubHeading,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5,
    fontWeight: "bold",
  },
});

export default SearchAccountScreen;
