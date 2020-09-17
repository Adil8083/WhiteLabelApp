import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  achievement: Yup.string().required().label("Achievement"),
});

const AchievementEditingScreen = ({ onSubmit }) => {
  return (
    <Screen style={styles.container}>
      <Text style={styles.note}>Note : If no achievements yet, add N/A</Text>
      <AppForm
        initialValues={{ achievement: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="words"
          autoCorrect={false}
          icon="keyboard"
          name="achievement"
          placeholder="Achievement"
        />
        <SubmitButton title="Add" />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  note: {
    marginLeft: 5,
    fontStyle: "italic",
  },
});

export default AchievementEditingScreen;
