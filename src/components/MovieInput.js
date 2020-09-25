import React, { useRef, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import Modal from "react-native-modal";
import AppButton from "./AppButton";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";

import CategoryModal from "./CategoryModal";

export default function MovieInput({ titles }) {
  const scrollView = useRef();
  const [category, setCategory] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              setVisible(true);
              setCategory("Comedy");
            }}
          >
            <Fontisto name="laughing" size={50} color="black" />
            <AppText>comedy</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              setVisible(true);
              setCategory("Action");
            }}
          >
            <FontAwesome5 name="hand-rock" size={50} color="black" />
            <AppText>action</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              setVisible(true);
              setCategory("Drama");
            }}
          >
            <Fontisto name="persons" size={50} color="black" />
            <AppText>drama</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              setVisible(true);
              setCategory("Fantasy");
            }}
          >
            <FontAwesome5 name="fantasy-flight-games" size={50} color="black" />
            <AppText>fantasy</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              setVisible(true);
              setCategory("Horor");
            }}
          >
            <MaterialCommunityIcons
              name="emoticon-devil-outline"
              size={50}
              color="black"
            />
            <AppText>horor</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CategoryModal
        MovieCategory={titles}
        visible={visible}
        visibleFunction={setVisible}
        category={category}
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
