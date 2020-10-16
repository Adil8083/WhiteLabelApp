import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ImageComponent from "./ImageComponent";
import DropDownPicker from "react-native-dropdown-picker";
import ImageList from "./ImageList";
import AppText from "./AppText";
import MovieInput from "./MovieInput";
import { Theme } from "../constants/Theme";
import TextInputComponent from "./TextInputComponent";
import TextSize from "../constants/TextSize";
import GradiantButton from "./GradiantButton";

function MovieModal() {
  var flag = false;
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
    if (!imageUri && !title && !category) {
      Alert.alert("Image", "please select Image");
    } else if (!title && !category) {
      Alert.alert("Title", "please add movie title");
    } else if (!category) {
      Alert.alert("Category", "please select category");
    } else if (!title) {
      Alert.alert("Title", "please add movie title");
    } else if (!imageUri) {
      Alert.alert("Image", "please select Image");
    }
    if (imageUri && title && category) {
      movieList.map((t) => {
        if (t.title === title) {
          alert("This Movie Is Already Exist");
          flag = true;
        }
      });
      if (!flag) {
        setMovieList([...movieList, { imageUri, title, category }]);
        setModalVisible(false);
        setImageUri();
        setCategory();
        setTitle();
        setNbr(1);
      }
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
          backgroundColor: Theme.secondary,
          borderRadius: 10,
          shadowColor: Theme.lightColor,
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
              fontSize: TextSize.SubHeading,
              fontWeight: "bold",
              color: Theme.textColor,
            }}
          >
            Add Your Movies/Series
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
          backgroundColor: Theme.secondary,
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
            fontSize: TextSize.SubHeading,
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
            backgroundColor: Theme.secondary,
            borderRadius: 10,
            shadowColor: Theme.darkColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            elevation: 10,
          }}
        >
          <View style={{ padding: 20 }}>
            <ImageComponent imageUri={imageUri} onChangeImage={onChangeImage} />
            <DropDownPicker
              items={[
                { label: "Action", value: "Action" },
                { label: "Comedy", value: "Comedy" },
                { label: "Drama", value: "Drama" },
                { label: "Fantasy", value: "Fantasy" },
                { label: "Horor", value: "Horor" },
              ]}
              activeLabelStyle={{
                backgroundColor: Theme.lightGrey,
                flex: 1,
                borderRadius: 10,
              }}
              labelStyle={{
                padding: 5,
                fontWeight: "bold",
                color: Theme.darkColor,
              }}
              placeholder="Select Category"
              defaultValue={""}
              containerStyle={{
                height: 40,
                marginTop: 10,
              }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              style={{ backgroundColor: Theme.lightColor }}
              dropDownStyle={{
                paddingVertical: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
              }}
              onChangeItem={(item) => setCategory(item.value)}
            />
            <TextInputComponent
              style={styles.text}
              placeholder="Enter Title"
              onChangeText={(val) => setTitle(val)}
            />
            <GradiantButton
              title="Add Movie"
              styleButton={{
                width: "80%",
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
