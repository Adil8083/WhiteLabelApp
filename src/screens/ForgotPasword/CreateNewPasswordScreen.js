import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import ActivityIndicator from "../../components/ActivityIndicator";
import ErrorMessgae from "../../components/forms/ErrorMessgae";
import Header from "../../components/Header";
import SubmitButton from "../../components/forms/SubmitButton";
import SubHeading from "../../components/SubHeading";
import Screen from "../../components/Screen";
import { SCREENS } from "../../constants/Screens";
import { Theme } from "../../constants/Theme";
import TextSize from "../../constants/TextSize";
import Title from "../../components/Title";
import UserApi from "../../api/users";

const validationSchema = Yup.object().shape({
  new_Password: Yup.string().required().label("New password"),
  confirm_Password: Yup.string().required().label("Confirm password"),
});

const CreateNewPasswordScreen = ({ navigation, route }) => {
  const [visible, setVisible] = useState();
  const [email, setEmail] = useState(routes.params.EMAIL);
  const [attemptFailed, setAttemptFailed] = useState(false);
  const [updateFailed, setUpdateFailed] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async ({ new_Password, confirm_Password }) => {
    setAttemptFailed(true);
    if (new_Password !== confirm_Password) {
      setAttemptFailed(false);
      setVisible(true);
      setError("Password does not match");
      return;
    }

    setVisible(false);
    const response = await UserApi.updatePassword(new_Password, email);

    if (!response.ok) {
      setAttemptFailed(false);
      setUpdateFailed(true);
      setError(response.data);
      return;
    }

    setAttemptFailed(false);
    setUpdateFailed(false);
    navigation.navigate(SCREENS.LogIn);
  };

  return (
    <>
      <ActivityIndicator visible={attemptFailed} />
      <Screen>
        <Header isBack={true} navigation={navigation} text="Criação" />
        <SubHeading title="Create Password" />
        <ErrorMessgae error={error} visible={updateFailed} />
        <View style={styles.container}>
          <AppForm
            initialValues={{ new_Password: "", confirm_Password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Title name="New Password" />
            <AppFormField
              autoCorrect={false}
              autoCapitalize="none"
              name="new_Password"
              placeholder="Your new password"
              secureTextEntry
            />
            <Title name="Confirm Password" />
            <AppFormField
              autoCorrect={false}
              autoCapitalize="none"
              name="confirm_Password"
              placeholder="Confirm password"
              secureTextEntry
            />
            <ErrorMessgae
              visible={visible}
              error="Confirm Password shoukd be same as new password"
            />
            <SubmitButton title="Update" />
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
    fontWeight: "bold",
  },
});

export default CreateNewPasswordScreen;
