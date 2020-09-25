import React, { useState } from "react";
import {
  Image,
  Text,
  ScrollView,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AppButton from "./AppButton";
import ImageComponent from "./ImageComponent";
import ImageList from "./ImageList";

function MovieModal({ movieTitles }) {
  const [imageUri, setImageUri] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState();
  const [nbr, setNbr] = useState(0);
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
    if (imageUri && title) {
      setMovieList([...movieList, { imageUri, title }]);
      setModalVisible(false);
      setImageUri();
      setTitle();
      setNbr(1);
      movieTitles.push(title);
    }
  };
  const onChangeImage = (uri) => {
    setImageUri(uri);
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={openModal}>
        <MaterialIcons
          name="add"
          size={30}
          color="purple"
          style={styles.touch}
        />
      </TouchableWithoutFeedback>
      {nbr === 1 && (
        <ImageList movieList={movieList} style={styles.container} />
      )}
      <Modal isVisible={isModalVisible} backdropColor="black">
        <View style={(styles.modal, [{ flex: 1 }])}>
          <ImageComponent imageUri={imageUri} onChangeImage={onChangeImage} />
          <TextInput
            style={styles.text}
            placeholder="Enter Title"
            onChangeText={(val) => setTitle(val)}
          />
          <AppButton
            marginTop={50}
            title="Add Movie"
            styleButton={{
              width: "100%",
              backgroundColor: "#a37eba",
              marginTop: 50,
            }}
            onPress={closeModal}
          />
        </View>
      </Modal>
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
  touch: {
    paddingTop: 5,
    paddingLeft: 10,
  },
});

export default MovieModal;
