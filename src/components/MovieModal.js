import React, { useState } from "react";
import { TextInput, View, StyleSheet, Alert } from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AppButton from "./AppButton";
import ImageComponent from "./ImageComponent";
import DropDownPicker from "react-native-dropdown-picker";
import ImageList from "./ImageList";
import AppText from "./AppText";
import MovieInput from "./MovieInput";
import { Theme } from "../constants/Theme";
import TextInputComponent from "./TextInputComponent";

function MovieModal() {
  const [imageUri, setImageUri] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [nbr, setNbr] = useState(0);
  const [update, setUpdate] = useState(false);
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
    if (!imageUri) Alert.alert("Image", "please select Image");
    if (!title) Alert.alert("Title", "please add movie title");
    if (!category) Alert.alert("Category", "please select category");
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

  const onDelete = (t) => {
    for (var i = 0; i < movieList.length; i++) {
      if (movieList[i] === t) {
        movieList.splice(i, 1);
        if (update) {
          setUpdate(false);
        } else {
          setUpdate(true);
        }
      }
    }
  };

  return (
    <View>
      <View
        style={{
          backgroundColor: "rgb(35, 42, 52)",
          borderRadius: 10,
          shadowColor: "#fff",
          padding: 12,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          elevation: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AppText
            styleText={{
              fontSize: 18,
              fontWeight: "bold",
              color: Theme.textColor,
            }}
          >
            Add Your Movies
          </AppText>
          <TouchableWithoutFeedback onPress={openModal}>
            <MaterialIcons
              name="add"
              size={30}
              color={Theme.iconColor}
              style={styles.touch}
            />
          </TouchableWithoutFeedback>
        </View>

        {nbr === 1 && (
          <ImageList
            movieList={movieList}
            onDelImage={onDelete}
            style={styles.container}
          />
        )}
      </View>
      <View
        style={{
          backgroundColor: "rgb(35, 42, 52)",
          borderRadius: 10,
          shadowColor: Theme.lightColor,
          padding: 12,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          elevation: 10,
          marginTop: 25,
        }}
      >
        <AppText
          styleText={{
            fontSize: 18,
            fontWeight: "bold",
            color: Theme.textColor,
          }}
        >
          Movies In Category
        </AppText>
        <MovieInput titles={movieList} />
      </View>
      <Modal
        coverScreen={true}
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: Theme.lightColor,
            borderRadius: 10,
            shadowColor: Theme.darkColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            elevation: 10,
          }}
        >
          <View style={{ padding: 20 }}>
            <ImageComponent imageUri={imageUri} onChangeImage={onChangeImage} />
            <AppText styleText={{ color: "#931a25", paddingVertical: 15 }}>
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
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{
                backgroundColor: "white",
                paddingVertical: 10,
              }}
              onChangeItem={(item) => setCategory(item.value)}
            />
            <TextInputComponent
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
              }}
              onPress={closeModal}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    // marginTop: 10,
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
