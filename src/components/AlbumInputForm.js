import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

import { CheckBox } from "react-native-elements";
import TextInputComponent from "./TextInputComponent";
import ButtonComponent from "./ButtonComponent";
import { SCREENS } from "../constants/Screens";

export default function AlbumInputForm({ navigation, route }) {
  const [SongsList, setSongsList] = useState([]);
  const [album, setAlbum] = useState([]);

  const SetList = () => {
    for (let i = 0; i < route.params.SongsUriList; i++) {
      SongsList[i] = {
        songUri: route.params.SongsUriList[i],
        checked: false,
      };
    }
  };
  const setAlbumList = () =>
    SongsList.map((obj) => {
      if (obj.checked === true) {
        setAlbum(obj.songUri);
        console.log(album);
      }
    });

  useEffect(SetList, [])
  return (
    <View>
      <Text style={styles.HeadingStyle}>Album</Text>
      <TextInputComponent placeholder="Album name" width="220" />
      <View style={styles.checkBoxStyle}>
        <Text
          style={{
            color: "#696969",
            fontWeight: "bold",
            fontSize: 18.5,
          }}
        >
          Select album songs
        </Text>
        {SongsList.length > 0 &&
          SongsList.map((list) => (
            <CheckBox
              key={list.songUri}
              title={list.songUri}
              checked={list.checked}
              checkedColor="#C8C8C8"
              containerStyle={{
                backgroundColor: "#E8E8E8",
                marginTop: 15,
                marginRight: 20,
              }}
              textStyle={{ color: "#696969" }}
              onPress={() => {
                setSongsList(
                  [...SongsList].map((obj) => {
                    if (obj.songUri === list.songUri) {
                      return { ...obj, checked: !list.checked };
                    } else return obj;
                  })
                );
                setAlbumList();
              }}
              onIconPress={() => {
                setSongsList(
                  [...SongsList].map((obj) => {
                    if (obj.songUri === list.songUri) {
                      return { ...obj, checked: !list.checked };
                    } else return obj;
                  })
                );
                console.log(SongsList);
                setAlbumList();
              }}
            />
          ))}
      </View>
      <ButtonComponent
        title="Next"
        onPressEvent={() => {
          navigation.navigate(SCREENS.SingerWE, { album });
        }}
        marginTop={85}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginLeft: 15,
  },
  HeadingStyle: {
    fontSize: 30,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    color: "#696969",
    paddingTop: 50,
    paddingBottom: 10,
  },
  checkBoxStyle: {
    marginTop: 20,
    marginLeft: 35,
  },
});
