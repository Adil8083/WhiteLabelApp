import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

import Modal from "react-native-modal";
import AppButton from "./AppButton";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import { ScrollView } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";
import MovieModal from "./MovieModal";

export default function MovieInput({ titles }) {
  useEffect(() => {}, []);
  const scrollView = useRef();
  const [isModalVisible, setModalVisible] = useState(false);
  const [comedyClick, setComedyClick] = useState(false);
  const [actionClick, setActionClick] = useState(false);
  const [dramaClick, setDramaClick] = useState(false);
  const [fantasyClick, setFantasyClick] = useState(false);
  const [hororClick, setHororClick] = useState(false);
  // const [movieCat, setMovieCat] = useState([
  //   {
  //     comedy: "",
  //   },
  //   {
  //     horor: "",
  //   },
  // ]);

  var comedyList = [];
  let actionList = [];
  let dramaList = [];
  let fantasyList = [];
  let hororList = [];
  const closeModal = () => {
    setComedyClick(false);
    setActionClick(false);
    setDramaClick(false);
    setFantasyClick(false);
    setHororClick(false);
    setModalVisible(false);
    console.log("comdey", comedyList);
    console.log("darama", dramaList);
    console.log("action", actionList);
    console.log("fantasy", fantasyList);
    console.log("horor", hororList);
  };

  const comedy = () => {
    setComedyClick(true);
    setModalVisible(true);
  };

  const action = () => {
    setActionClick(true);
    setModalVisible(true);
  };
  const drama = () => {
    setDramaClick(true);
    setModalVisible(true);
  };
  const fantasy = () => {
    setFantasyClick(true);
    setModalVisible(true);
  };
  const horor = () => {
    setHororClick(true);
    setModalVisible(true);
  };

  return (
    <ScrollView
      ref={scrollView}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.innerContainer} onPress={comedy}>
          <Fontisto name="laughing" size={50} color="black" />
          <AppText>comedy</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerContainer} onPress={action}>
          <FontAwesome5 name="hand-rock" size={50} color="black" />
          <AppText>action</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerContainer} onPress={drama}>
          <Fontisto name="persons" size={50} color="black" />
          <AppText>drama</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerContainer} onPress={fantasy}>
          <FontAwesome5 name="fantasy-flight-games" size={50} color="black" />
          <AppText>fantasy</AppText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.innerContainer} onPress={horor}>
          <MaterialCommunityIcons
            name="emoticon-devil-outline"
            size={50}
            color="black"
          />
          <AppText>horor</AppText>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          {titles.map((item) => (
            <View key={item} style={styles.modalConrtainer}>
              <Text style={styles.text}>{item}</Text>
              <TouchableOpacity
                onPress={() => {
                  if (comedyClick) {
                    comedyList.push(item);
                    alert("movie added in Comdedy");
                  } else if (actionClick) {
                    actionList.push(item);
                    alert("movie added in action");
                  } else if (dramaClick) {
                    dramaList.push(item);
                    alert("movie added in drama");
                  } else if (fantasyClick) {
                    fantasyList.push(item);
                    alert("movie added in fantasy");
                  } else if (hororClick) {
                    hororList.push(item);
                    alert("movie added in horor");
                  }
                }}
              >
                <MaterialIcons name="add" size={30} color="white" />
              </TouchableOpacity>
            </View>
          ))}
          <AppButton
            title="done"
            onPress={closeModal}
            styleButton={{
              width: "80%",
              backgroundColor: "cyan",
              marginTop: 50,
              alignSelf: "center",
            }}
          />
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10,
    borderRadius: 15,
    flexDirection: "row",
  },
  innerContainer: {
    backgroundColor: "orange",
    alignItems: "center",
    borderRadius: 15,
    marginLeft: 10,
    justifyContent: "center",
    overflow: "hidden",
    width: 100,
    height: 100,
  },
  text: {
    color: "orange",
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 10,
    paddingLeft: 10,
    paddingRight: "50%",
  },
  modalConrtainer: {
    backgroundColor: "black",
    marginVertical: 2,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
