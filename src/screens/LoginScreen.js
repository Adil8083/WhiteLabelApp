import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import colors from "../config/colors";
import GradiantButton from "../components/GradiantButton";
import Screen from "../components/Screen";
import SubmitButton from "../components/forms/SubmitButton";
import { SCREENS } from "../constants/Screens";
import Title from "../components/Title";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

const LoginScreen = ({ navigation }) => {
  return (
    <Screen>
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={validationSchema}
      >
        <Title name="Email" />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          name="email"
          keyboardType="email-address"
          placeholder="Enter your email"
        />
        <Title name="Password" />
        <AppFormField
          autoCorrect={false}
          autoCapitalize="none"
          icon="lock"
          name="password"
          placeholder="Enter your password"
          secureTextEntry
        />
        <SubmitButton title="Login" />
      </AppForm>
      <TouchableOpacity
        onPress={() => navigation.navigate(SCREENS.SearchAccount)}
      >
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      <Text style={styles.or}>-------- OR --------</Text>
      <GradiantButton
        title="SignUp"
        onPress={() => navigation.navigate(SCREENS.SignUp)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 100,
    marginTop: 20,
  },
  forgotPassword: {
    color: "dodgerblue",
    fontSize: 15,
    margin: 10,
    alignSelf: "center",
  },
  or: {
    color: colors.medium,
    alignSelf: "center",
  },
});

export default LoginScreen;
