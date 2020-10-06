import React from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import Screen from "../components/Screen";
import SubmitButton from "../components/forms/SubmitButton";
import Title from "../components/Title";
import { Theme } from "../constants/Theme";
import Header from "../components/Header";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(5).label("Password"),
});

const SignUpScreen = ({ navigation }) => {
  return (
    <Screen>
      <Header isback navigation={navigation} text="Sign Up" />
      <View style={styles.container}>
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
      </View>
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
