import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AppButton from "./AppButton";
import ImageComponent from "./ImageComponent";
import DropDownPicker from "react-native-dropdown-picker";
import ImageList from "./ImageList";
import AppText from "./AppText";
import MovieInput from "./MovieInput";

function MovieModal() {
  const [imageUri, setImageUri] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [nbr, setNbr] = useState(0);
  const [movieList, setMovieList] = useState([
    {
      title: "",
      imageUri: "",
      category: "",
    },
  ]);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    if (!imageUri) alert("please add movie");
    if (!title) alert("please add movie title");
    if (!category) alert("please select category");
    if (imageUri && title && category) {
      setMovieList([...movieList, { imageUri, title, category }]);
      setModalVisible(false);
      setImageUri();
      setCategory();
      setTitle();
      setNbr(1);
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
      <Modal
        isVisible={isModalVisible}
        backgroundColor="#89beb3"
        style={{
          justifyContent: "flex-start",
          borderRadius: 10,
          margin: 10,
          padding: 10,
        }}
      >
        <ImageComponent imageUri={imageUri} onChangeImage={onChangeImage} />
        <AppText styleText={{ color: "#931a25", paddingBottom: 10 }}>
          Select Category:-
        </AppText>
        <DropDownPicker
          items={[
            { label: "Action", value: "Action" },
            { label: "Comedy", value: "Comedy" },
            { label: "Drama", value: "Drama" },
            { label: "Fantasy", value: "Fantasy" },
            { label: "Horor", value: "Horor" },
          ]}
          defaultValue={""}
          containerStyle={{ height: 40 }}
          style={{
            backgroundColor: "#d9adad",
            width: "80%",
          }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{
            backgroundColor: "white",
            paddingVertical: 10,
            width: "80%",
          }}
          onChangeItem={(item) => setCategory(item.value)}
        />
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
            backgroundColor: "#7d0633",
            marginTop: 50,
          }}
          onPress={closeModal}
        />
      </Modal>
      <AppText styleText={{ paddingTop: 20 }}>Movies In Category</AppText>
      <MovieInput titles={movieList} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 30,
    borderBottomWidth: 2,
    borderColor: "grey",
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
