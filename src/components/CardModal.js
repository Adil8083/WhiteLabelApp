import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from "react-native";

import ImagePickerComponent from "./ImagePickerComponent";
import TextInputComponent from "./TextInputComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ButtonComponent from "./ButtonComponent";

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
    <Modal isVisible animationType="slide">
      <TouchableWithoutFeedback
        onPress={() => {
          toggle(false);
        }}
      >
        <MaterialCommunityIcons
          style={{ alignSelf: "center" }}
          name="close"
          size={30}
          color="#696969"
        />
      </TouchableWithoutFeedback>
      <View style={styles.card}>
        <ImagePickerComponent
          getImageUri={(uri) => setImageUri(uri)}
          BottomHeading="Song Poster"
        />
        <TextInputComponent
          width="260"
          placeholder="Song Name"
          getValue={(text) => setTitle(text)}
        />
      </View>
      <ButtonComponent
        title="Add"
        onPressEvent={() => closeModal()}
        marginTop={40}
      />
    </Modal>
  );
}
const styles = StyleSheet.create({
  card: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CardModal;
