import React, { useRef, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";

import CategoryModal from "./CategoryModal";
import { Theme } from "../constants/Theme";

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
            style={[styles.innerContainer, { marginLeft: 0 }]}
            onPress={() => {
              setVisible(true);
              setCategory("Comedy");
            }}
          >
            <Fontisto name="laughing" size={50} color={Theme.iconColor} />
            <AppText styleText={styles.TextColor}>comedy</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              setVisible(true);
              setCategory("Action");
            }}
          >
            <FontAwesome5 name="hand-rock" size={50} color={Theme.iconColor} />
            <AppText styleText={styles.TextColor}>action</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              setVisible(true);
              setCategory("Drama");
            }}
          >
            <Fontisto name="persons" size={50} color={Theme.iconColor} />
            <AppText styleText={styles.TextColor}>drama</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              setVisible(true);
              setCategory("Fantasy");
            }}
          >
            <FontAwesome5
              name="fantasy-flight-games"
              size={50}
              color={Theme.iconColor}
            />
            <AppText styleText={styles.TextColor}>fantasy</AppText>
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
              color={Theme.iconColor}
            />
            <AppText styleText={styles.TextColor}>horor</AppText>
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
    flexDirection: "row",
    marginTop: 15,
  },
  innerContainer: {
    backgroundColor: Theme.spareColor,
    alignItems: "center",
    borderRadius: 15,
    justifyContent: "center",
    overflow: "hidden",
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  modalConrtainer: {
    backgroundColor: "white",
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
  TextColor: {
    color: Theme.textColor,
  },
});
