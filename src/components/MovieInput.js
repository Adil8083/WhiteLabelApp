import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";

import DropDownPicker from "react-native-dropdown-picker";
import Modal from "react-native-modal";
import AppButton from "./AppButton";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";

export default function MovieInput({ titles }) {
  var selectedMovies = [];
  const scrollView = useRef();
  const [category, setCategory] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCatModal, setIsCatModal] = useState(false);

  const [comedy, setComedy] = useState([]);
  const [action, setAction] = useState([]);
  const [drama, setDrama] = useState([]);
  const [fantasy, setFantasy] = useState([]);
  const [horor, setHoror] = useState([]);

  const openModal = () => {
    if (titles === []) {
      alert("Please Add Movies First");
    } else {
      setModalVisible(true);
    }
  };
  const catModal = () => {
    if (!comedy) {
      alert("add movies in category");
    } else {
      setIsCatModal(true);
    }
  };
  const closeCat = () => {
    setIsCatModal(false);
  };
  const addMovies = (item) => {
    selectedMovies.push(item);
  };

  const closeModal1 = () => {
    if (category === "default") {
    } else if (category === "Comedy" && selectedMovies != []) {
      setComedy([...comedy, selectedMovies]);
    } else if (category === "Action") {
      setAction([...action, selectedMovies]);
    } else if (category === "Drama") {
      setDrama([...drama, selectedMovies]);
    } else if (category === "Fantasy") {
      setFantasy([...fantasy, selectedMovies]);
    } else if (category === "Horor") {
      setHoror([...horor, selectedMovies]);
    }
    setCategory("defualt");
    setModalVisible(false);
  };

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        style={{ backgroundColor: "#89beb3", borderRadius: 20, margin: 10 }}
      >
        <AppText styleText={{ marginBottom: 40, justifyContent: "flex-start" }}>
          Select Category
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
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => setCategory(item.value)}
        />
        <AppText styleText={{ marginVertical: 20 }}>Select Movies</AppText>
        {titles.map((item) => (
          <View key={item}>
            <AppButton
              title={item}
              onPress={() => {
                addMovies(item);
                alert("movie added");
              }}
              styleButton={{
                backgroundColor: "black",
                height: 15,
                width: "70%",
                borderRadius: 9,
                alignSelf: "center",
                marginVertical: 4,
              }}
            />
          </View>
        ))}
        <AppButton
          title="close Modal"
          onPress={closeModal1}
          styleButton={{
            backgroundColor: "black",
            width: "50%",
            alignSelf: "center",
            marginTop: 70,
          }}
        />
      </Modal>

      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.innerContainer} onPress={catModal}>
            <Fontisto name="laughing" size={50} color="black" />
            <AppText>comedy</AppText>
          </TouchableOpacity>
          <Modal
            isVisible={isCatModal}
            style={{ backgroundColor: "#a6a6a4", borderRadius: 20, margin: 10 }}
          >
            <AppText>Comedy Movies:-</AppText>
            {comedy.map((item) => (
              <View
                key={item}
                style={{
                  height: 50,
                  justifyContent: "flex-start",

                  alignItems: "center",

                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 100, margin: 0, paddingBottom: 60 }}>
                  .
                </Text>
                <AppText styleText={{ color: "black" }}>{item}</AppText>
              </View>
            ))}
            <AppButton
              title="close"
              onPress={closeCat}
              styleButton={{
                backgroundColor: "black",
                width: "50%",
                alignSelf: "center",
              }}
            />
          </Modal>
          <TouchableOpacity style={styles.innerContainer}>
            <FontAwesome5 name="hand-rock" size={50} color="black" />
            <AppText>action</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.innerContainer}>
            <Fontisto name="persons" size={50} color="black" />
            <AppText>drama</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.innerContainer}>
            <FontAwesome5 name="fantasy-flight-games" size={50} color="black" />
            <AppText>fantasy</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.innerContainer}>
            <MaterialCommunityIcons
              name="emoticon-devil-outline"
              size={50}
              color="black"
            />
            <AppText>horor</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <AppButton
        title="Add Category"
        onPress={openModal}
        styleButton={{
          backgroundColor: "blue",
          width: "50%",
          marginTop: 50,
          borderRadius: 10,
          alignSelf: "center",
        }}
      />
    </View>
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
  checkbox: {
    alignSelf: "center",
  },
  checkboxConatiner: {
    flexDirection: "row",
    marginBottom: 20,
  },
  innerContainer1: {
    height: 200,
    marginTop: 30,
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
