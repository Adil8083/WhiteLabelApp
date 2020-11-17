import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import Header from "../../components/Header";
import SubmitButton from "../../components/forms/SubmitButton";
import SubHeading from "../../components/SubHeading";
import Screen from "../../components/Screen";
import { SCREENS } from "../../constants/Screens";
import { Theme } from "../../constants/Theme";
import TextSize from "../../constants/TextSize";
import Title from "../../components/Title";
import ErrorMessgae from "../../components/forms/ErrorMessgae";

const validationSchema = Yup.object().shape({
  new_Password: Yup.string().required().label("New password"),
  confirm_Password: Yup.string().required().label("Confirm password"),
});

const CreateNewPasswordScreen = ({ navigation }) => {
  const [visible, setVisible] = useState();

  return (
    <Screen>
      <Header isBack={true} navigation={navigation} text="Criação" />
      <SubHeading title="Create Password" />
      <View style={styles.container}>
        <AppForm
          initialValues={{ new_Password: "", confirm_Password: "" }}
          onSubmit={({ new_Password, confirm_Password }) => {
            new_Password === confirm_Password
              ? navigation.navigate(SCREENS.LogIn)
              : setVisible(true);
          }}
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
