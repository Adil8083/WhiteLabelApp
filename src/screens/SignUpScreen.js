import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppDropDownPicker from "../components/forms/AppDropDownPicker";
import authApi from "../api/auth";
import ErrorMessgae from "../components/forms/ErrorMessgae";
import gender from "../constants/Gender";
import Header from "../components/Header";
import Screen from "../components/Screen";
import SubmitButton from "../components/forms/SubmitButton";
import Title from "../components/Title";
import { Theme } from "../constants/Theme";
import userApi from "../api/users";
import useAuth from "../auth/useAuth";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(5).max(50).label("Name"),
  email: Yup.string().required().email().min(5).max(255).label("Email"),
  gender: Yup.string().required().label("Gender"),
  password: Yup.string().required().min(5).max(1024).label("Password"),
});

const SignUpScreen = ({ navigation }) => {
  const auth = useAuth();
  const [error, setError] = useState();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [attemptFailed, setAttemptFailed] = useState(false);

  const handleSubmit = async (userInfo) => {
    setAttemptFailed(true);
    const response = await userApi.register(userInfo);
    if (!response.ok) {
      if (response.data) {
        setRegistrationFailed(true);
        setAttemptFailed(false);
        setError(response.data);
      } else {
        setRegistrationFailed(true);
        setAttemptFailed(false);
        setError("An unexpected error occured");
        console.log(response);
      }
      setAttemptFailed(false);
      return;
    }

    setRegistrationFailed(false);
    const { data: authToken } = await authApi.login(
      userInfo.email,
      userInfo.password
    );
    auth.logIn(authToken);
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header isBack navigation={navigation} text="Sign Up" />
        <View style={styles.container}>
          <AppForm
            initialValues={{ name: "", email: "", password: "", gender: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessgae error={error} visible={registrationFailed} />
            <Title name="Your Name" />
            <AppFormField
              autoCapitalize="words"
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
            <ActivityIndicator
              animating={attemptFailed}
              color={Theme.spareColor}
            />
            <Title name="Gender" />
            <AppDropDownPicker
              items={gender}
              placeholder="Select gender"
              name="gender"
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
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.secondary,
    borderRadius: 15,
    margin: 10,
    padding: 10,
  },
});

export default SignUpScreen;
