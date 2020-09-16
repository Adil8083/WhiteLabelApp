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

function MovieModal() {
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

  // const test = [
  //   {
  //     image: undefined,
  //   },
  //   {
  //     image: "jhsbdjdb",
  //   },
  // ];

  // let a = test.filter((x) => {
  //   if (x.image != undefined) {
  //     return x;
  //   }
  // });

  const closeModal = () => {
    if (!imageUri) alert("please add movie");
    if (!title) alert("please add movie title");
    if (imageUri && title) {
      setMovieList([...movieList, { imageUri, title }]);
    }
    setModalVisible(false);
    setImageUri();
    setTitle();
    setNbr(1);
  };
  const onChangeImage = (uri) => {
    setImageUri(uri);
  };
  const delImage = () => {};
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
      <TouchableWithoutFeedback onPress={delImage}>
        {nbr === 1 && (
          <ImageList movieList={movieList} style={styles.container} />
        )}
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
    paddingTop: 28,
    paddingLeft: 10,
  },
});

export default MovieModal;
