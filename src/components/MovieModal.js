import React, { useState } from "react";
import { Image, Text, Button, TextInput, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AppButton from "./AppButton";
import ImageComponent from "./ImageComponent";
import ImageList from "./ImageList";

function MovieModal() {
  const [imageUri, setImageUri] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState();
  const [movieList, setMovieList] = useState([
    {
      title: "",
      imageUri: "",
    },
  ]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    if (!imageUri) alert("please add movie");
    if (!title) alert("please add movie title");
    setMovieList([...movieList, { imageUri, title }]);
    setModalVisible(false);
    setImageUri();
    setTitle();
  };
  const onChangeImage = (uri) => {
    setImageUri(uri);
  };
  return (
    <View>
      <TouchableWithoutFeedback onPress={openModal} style={styles.container}>
        <MaterialIcons name="add" size={70} />
      </TouchableWithoutFeedback>
      <Modal isVisible={isModalVisible} backdropColor="black">
        <View style={(styles.modal, [{ flex: 1 }])}>
          <ImageComponent imageUri={imageUri} onChangeImage={onChangeImage} />
          <TextInput
            style={styles.text}
            placeholder="Enter Title"
            onChangeText={(val) => setTitle(val)}
          />
          <AppButton
            title="Add Movie"
            width="50%"
            backgroundColor="black"
            pressed={closeModal}
          />
        </View>
      </Modal>
      <ImageList movieList={movieList} />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: 50,
    width: 50,
  },
  text: {
    margin: 10,
    borderBottomWidth: 2,
    borderColor: "grey",
    paddingTop: 10,
    width: "80%",
    height: 30,
    color: "white",
  },
  container: {
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    overflow: "hidden",
    width: 100,
  },
});

export default MovieModal;
