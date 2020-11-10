import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import Screen from "../../components/Screen";
import SubmitButton from "../../components/forms/SubmitButton";
import TextSize from "../../constants/TextSize";
import { Theme } from "../../constants/Theme";
import Header from "../../components/Header";
import SubHeading from "../../components/SubHeading";
import { SCREENS } from "../../constants/Screens";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});
const SearchAccountScreen = ({ navigation }) => {
  return (
    <Screen>
      <Header isBack={true} navigation={navigation} text="Criação" />
      <SubHeading title="Forgot Password" />
      <View style={styles.container}>
        <Text style={styles.heading}>
          Enter the email associated with your account to reset password.
        </Text>
        <AppForm
          initialValues={{ email: "" }}
          onSubmit={(values) => navigation.navigate(SCREENS.CreatePassword)}
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

export default SearchAccountScreen;
