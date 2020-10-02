import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

import ImagePickerComponent from "./ImagePickerComponent";
import TextInputComponent from "./TextInputComponent";
import GradiantButton from "./GradiantButton";
import { Theme } from "../constants/Theme";

function CardModal({ getObject, getTitle, toggle, SongsObj }) {
  const [ImageUri, setImageUri] = useState("");
  const [title, setTitle] = useState("");
  const closeModal = () => {
    if (title !== "" && ImageUri !== "" && ImageUri !== null) {
      if (SongsObj.includes({ uri: ImageUri, title }))
        alert("You already have added this Song name and poster");
      else if (
        SongsObj.filter((val) => {
          return val.title === title;
        }).length > 0
      )
        alert("This song name is already added");
      else {
        getObject({ uri: ImageUri, title });
        getTitle(title);
        toggle(false);
      }
    } else {
      alert("Please make sure that both fields are filled ");
    }
  };
  return (
    <Modal
      isVisible
      coverScreen={true}
      onBackButtonPress={() => toggle(false)}
      onBackdropPress={() => toggle(false)}
    >
      <View style={styles.card}>
        <View style={{ paddingTop: 40, paddingLeft: 40 }}>
          <ImagePickerComponent
            getImageUri={(uri) => setImageUri(uri)}
            BottomHeading="Song Poster"
          />
          <TextInputComponent
            containerStyle={{ width: 260 }}
            placeholder="Song Name"
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <GradiantButton
          title="Add"
          onPress={() => closeModal()}
          styleButton={{ margin: 20 }}
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.lightColor,
    borderRadius: 10,
    shadowColor: Theme.darkColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
  },
});
export default CardModal;
