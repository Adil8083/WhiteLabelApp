import React from "react";
import * as Yup from "yup";

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AppFormPicker from "../../components/forms/AppFormPicker";
import SubmitButton from "../../components/forms/SubmitButton";
import Screen from "../../components/Screen";

const validationSchema = Yup.object().shape({
  category: Yup.object().required().nullable().label("Category"),
  teamName: Yup.string().required().label("Team Name"),
  position: Yup.string().required().label("Postion"),
});

const Categories = [
  {
    label: "Cricket",
    value: 1,
    backgroundColor: "red",
    icon: "cricket",
    color: "white",
  },
  {
    label: "Football",
    value: 2,
    backgroundColor: "blue",
    icon: "soccer",
    color: "white",
  },
];

const SportsInfoScreen = ({ navigation }) => {
  return (
    <Screen>
      <AppForm
        initialValues={{ category: null, teamName: "", position: "" }}
        onSubmit={() => {
          navigation.navigate("Achievements");
        }}
        validationSchema={validationSchema}
      >
        <AppFormPicker
          icon="apps"
          items={Categories}
          name="category"
          placeholder="Sport"
        />
        <AppFormField
          autoCorrect={false}
          autoCorrect
          icon="keyboard"
          name="teamName"
          placeholder="Team Name"
        />
        <AppFormField
          autoCorrect={false}
          autoCorrect
          icon="keyboard"
          name="position"
          placeholder="Position in team"
        />
        <SubmitButton title="Next" />
      </AppForm>
    </Screen>
  );
};

export default SportsInfoScreen;