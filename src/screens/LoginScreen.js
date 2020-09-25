import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Yup from "yup";

import AppButton from "../components/AppButton";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import Screen from "../components/Screen";
import SubmitButton from "../components/forms/SubmitButton";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

const LoginScreen = ({ navigation }) => {
  return (
    <Screen style={{ padding: 10 }}>
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
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
      <TouchableOpacity onPress={() => navigation.navigate("Forgot Password")}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
      <Text style={styles.or}>-------- OR --------</Text>
      <AppButton
        title="SignUp"
        onPress={() => navigation.navigate("Register")}
        color="secondary"
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
