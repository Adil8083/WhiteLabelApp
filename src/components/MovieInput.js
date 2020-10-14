import React, { useRef, useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";

import CategoryModal from "./CategoryModal";
import { Theme } from "../constants/Theme";

export default function MovieInput({ titles }) {
  let i = 0;
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
              titles.map((item) => {
                if (item.category === "Comedy") {
                  i = 1;
                }
              });
              if (i === 0) {
                alert("please add movie in comedy first");
              } else {
                setVisible(true);
                setCategory("Comedy");
              }
            }}
          >
            <Fontisto name="laughing" size={50} color={Theme.iconColor} />
            <AppText styleText={styles.TextColor}>comedy</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              titles.map((item) => {
                if (item.category === "Action") {
                  i = 1;
                }
              });
              if (i === 0) {
                alert("please add movie in action first");
              } else {
                setVisible(true);
                setCategory("Action");
              }
            }}
          >
            <FontAwesome5 name="hand-rock" size={50} color={Theme.iconColor} />
            <AppText styleText={styles.TextColor}>action</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              titles.map((item) => {
                if (item.category === "Drama") {
                  i = 1;
                }
              });
              if (i === 0) {
                alert("please add movie in drama first");
              } else {
                setVisible(true);
                setCategory("Drama");
              }
            }}
          >
            <Fontisto name="persons" size={50} color={Theme.iconColor} />
            <AppText styleText={styles.TextColor}>drama</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.innerContainer}
            onPress={() => {
              titles.map((item) => {
                if (item.category === "Fantasy") {
                  i = 1;
                }
              });
              if (i === 0) {
                alert("please add movie in fantasy first");
              } else {
                setVisible(true);
                setCategory("Fantasy");
              }
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
              titles.map((item) => {
                if (item.category === "Horo") {
                  i = 1;
                }
              });
              if (i === 0) {
                alert("please add movie in horor first");
              } else {
                setVisible(true);
                setCategory("Horor");
              }
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
  TextColor: {
    color: Theme.textColor,
  },
});
