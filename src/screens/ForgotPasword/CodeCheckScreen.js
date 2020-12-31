import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AuthApi from "../../api/auth";
import ErrorMessgae from "../../components/forms/ErrorMessgae";
import SubmitButton from "../../components/forms/SubmitButton";
import Header from "../../components/Header";
import Screen from "../../components/Screen";
import SubHeading from "../../components/SubHeading";
import { SCREENS } from "../../constants/Screens";
import TextSize from "../../constants/TextSize";
import { Theme } from "../../constants/Theme";
import ActivityIndicator from "../../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  code: Yup.string().required().label("Code"),
});

const CodeCheckScreen = ({ navigation, route }) => {
  const [emailedCode, setEmailedCode] = useState(route.params.CODE);
  const [email, setEmail] = useState(route.params.EMAIL);
  const [attemptFailed, setAttemptFailed] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = ({ code }) => {
    setAttemptFailed(true);
    if (emailedCode === code) {
      setAttemptFailed(false);
      setSearchFailed(false);
      navigation.navigate(SCREENS.CreatePassword, {
        EMAIL: email,
      });
      return;
    }
    setAttemptFailed(false);
    setAttemptFailed(true);
    setError("Code does not match.");
  };

  const handleResend = async () => {
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
    let reset = response.data;
    reset = reset.toString();
    setEmailedCode(reset);
  };
  return (
    <>
      <ActivityIndicator visible={attemptFailed} />
      <Screen>
        <Header isBack={true} navigation={navigation} text="Criação" />
        <SubHeading title="Enter code" />
        <ErrorMessgae error={error} visible={searchFailed} />
        <AppForm
          initialValues={{ code: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={styles.container}>
            <AppText styleText={styles.text}>
              Your password reset code has been sent to your email.
            </AppText>
            <AppFormField
              name="code"
              placeholder="Enter reset code"
              keyboardType="number-pad"
            />
            <SubmitButton title="Change Password" />
          </View>
          <View style={{ flexDirection: "row" }}>
            <AppText styleText={styles.again}>
              If you didn't receive the code.
            </AppText>
            <TouchableOpacity onPress={handleResend}>
              <AppText styleText={styles.resend}>Resend code?</AppText>
            </TouchableOpacity>
          </View>
        </AppForm>
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
  text: {
    alignItems: "center",
    color: Theme.lightColor,
    fontSize: TextSize.SubHeading,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 5,
    fontWeight: "bold",
  },
  again: {
    color: Theme.textColor,
    marginLeft: 20,
    marginTop: 20,
  },
  resend: {
    color: "royalblue",
    marginLeft: 10,
    marginTop: 20,
  },
});

export default CodeCheckScreen;
