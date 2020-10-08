import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import * as yup from "yup";

import GradiantButton from "../components/GradiantButton";
import { Theme } from "../constants/Theme";
import ErrorMessgae from "../components/forms/ErrorMessgae";
import TextInputComponent from "../components/TextInputComponent";
import DescriptionComponent from "../components/DescriptionComponent";

let schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});
const SingerAchivementsModal = ({ toggle, getAhcivementDetail }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [ValidEntries, setValidEntries] = useState(false);
  const [ShowError, setShowError] = useState(false);
  schema
    .isValid({ title, description })
    .then((valid) => setValidEntries(valid));
  return (
    <Modal
      isVisible
      coverScreen={true}
      onBackButtonPress={() => toggle(false)}
      onBackdropPress={() => toggle(false)}
    >
      <View style={styles.card}>
        <Text
          style={{
            fontSize: TextSize.SubHeading,
            color: Theme.DarkGrey,
            fontWeight: "bold",
          }}
        >
          Achivement Details
        </Text>
        <TextInputComponent
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          containerStyle={{ width: "90%" }}
        />
        {ShowError && !title && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
        <DescriptionComponent
          placeholder="Description"
          containerStyle={{ width: "90%" }}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={4}
        />
        {ShowError && !description && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
        <GradiantButton
          title="Add"
          onPress={() => {
            if (ValidEntries) {
              getAhcivementDetail({ title, description });
              toggle(false);
            } else setShowError(true);
          }}
          styleButton={{ marginTop: 10 }}
        />
      </View>
    </Modal>
  );
};

export default SingerAchivementsModal;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: Theme.lightColor,
    borderRadius: 10,
    shadowColor: Theme.darkColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    paddingVertical: 20,
    elevation: 10,
  },
});
