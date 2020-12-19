import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
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
import * as Api from "../api/PosterApi";
import useAuth from "../auth/useAuth";
import clientApi from "../api/client";

function MovieModal() {
  var flag = false;
  const [imageUri, setImageUri] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [nbr, setNbr] = useState(0);
  const [update, setUpdate] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);
  const [items, setItems] = useState([]);
  let temp_1 = [];
  const { user } = useAuth();

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

  const closeModal = async () => {
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
        setModalVisible(false);
        setShowIndicator(true);
        var url =
          "https://storage.googleapis.com/moviesposter/" +
          user.email +
          "-poster-" +
          title +
          ".png";
        const form = new FormData();
        form.append("name", title);
        form.append("poster", url);
        form.append("category", category);
        form.append("Image", {
          uri: imageUri,
          type: "image/png",
          name: "test.png",
        });
        const response = await Api.add(user, form);

        if (!response.ok) {
          Alert.alert("Attention", "Unable to add Movie Info", [
            {
              text: "OK",
            },
          ]);
          setShowIndicator(false);
          return;
        }
        setShowIndicator(false);
        setMovieList([...movieList, { imageUri, title, category }]);
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

  const onDelete = async (t) => {
    setShowIndicator(true);
    const response = await Api.del(t.title, user);
    if (!response.ok) {
      Alert.alert("Attention", "Unable to delete Movie", [
        {
          text: "OK",
        },
      ]);
      setShowIndicator(false);
      return;
    }
    setShowIndicator(false);
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
  const AsynFunc = async () => {
    setShowIndicator(true);
    const Response = await Api.Read(user);
    if (!Response.ok) {
      Alert.alert("Attention", "Unable to Load Data", [
        {
          text: "Retry",
          onPress: () => AsynFunc(),
        },
        { text: "Cancel" },
      ]);
      setShowIndicator(false);
      return;
    }
    Response.data.map((data) =>
      temp_1.push({
        imageUri: data.poster,
        title: data.name,
        category: data.category,
      })
    );
    setMovieList(temp_1);
    setNbr(1);
    setShowIndicator(false);
  };
  useEffect(() => {
    AsynFunc();
  }, []);
  const getMovieCategories = async () => {
    let Response = await clientApi.get("/category/get");
    if (!Response.ok) {
      Alert.alert("Attention", "Unable to Load Categories Data", [
        {
          text: "Retry",
          onPress: () => AsynFunc(),
        },
        { text: "Cancel" },
      ]);
      return;
    }
    setItems(Response.data);
  };
  useEffect(() => {
    getMovieCategories();
  }, []);

  return (
    <View>
      <ActivityIndicator animating={showIndicator} color={Theme.spareColor} />
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
              items={items}
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
