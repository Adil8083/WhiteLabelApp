import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CardModal from "./CardModal";
import AlbumModal from "./AlbumModal";
import { SCREENS } from "../constants/Screens";

export default function VideoPickerList() {
  const navigation = useNavigation();
  const route = useRoute();
  const [AlbumList, setAlbumList] = useState([]);
  const [SongObject, setSongObject] = useState([]);
  const [SongName, setSongsName] = useState([]);
  const [isCardModalVisible, setCardModalVisible] = useState(false);
  const [isAlbumModal, setAlbumModal] = useState({ modal: false, album: "" });
  const onRemoval = (obj) => {
    Alert.alert("Delete", "Do you want to delete this Song?", [
      {
        text: "Yes",
        onPress: () => {
          setSongObject(
            SongObject.filter(
              (sngObj) => sngObj.uri !== obj.uri && sngObj.title !== obj.title
            )
          );
          setSongsName(SongName.filter((name) => name !== obj.title));
          route.params &&
            setAlbumList(
              AlbumList.map((list) => ({
                Songslist: list.Songslist.filter((x) => x !== obj.title),
                name: list.name,
              }))
            );
        },
      },
      { text: "No" },
    ]);
  };
  const onRemovalAlbum = (d) => {
    Alert.alert("Delete", "Do you want to delete this Album?", [
      {
        text: "Yes",
        onPress: () =>
          setAlbumList(
            AlbumList.filter(
              (obj) => obj.name !== d.name && obj.Songslist !== d.Songslist
            )
          ),
      },
      { text: "No" },
    ]);
  };
  useEffect(() => {
    if (route.params?.AlbumName) {
      setAlbumList([
        ...AlbumList,
        { name: route.params.AlbumName, Songslist: route.params.Album },
      ]);
      navigation.setParams({ Album: null, AlbumName: null });
    }
  }, [route.params?.AlbumName]);
  const scrollView = useRef();
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Criação</Text>
      <View>
        <Text
          style={{
            color: "#696969",
            fontWeight: "bold",
            fontSize: 18.5,
            marginLeft: 10,
            marginTop: 30,
          }}
        >
          Add your Songs
        </Text>
      </View>
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        {SongObject.length > 0 &&
          SongObject.map((obj) => (
            <View key={obj.uri} style={styles.SongCardStyle}>
              <TouchableWithoutFeedback onPress={() => onRemoval(obj)}>
                <MaterialCommunityIcons
                  style={{ marginLeft: 10 }}
                  name="delete"
                  size={21.5}
                  color="#696969"
                />
              </TouchableWithoutFeedback>
              <Image
                key={obj.uri}
                source={{ uri: obj.uri }}
                style={styles.imageStyles}
              />
              <Text style={styles.SongNameStyle}>{obj.title}</Text>
            </View>
          ))}
        <TouchableOpacity
          style={[styles.Selector, { marginLeft: 10 }]}
          onPress={() => setCardModalVisible(!isCardModalVisible)}
        >
          {isCardModalVisible && (
            <CardModal
              getObject={(obj) =>
                setSongObject([
                  ...SongObject,
                  { uri: obj.uri, title: obj.title },
                ])
              }
              getTitle={(title) => setSongsName([...SongName, title])}
              toggle={(value) => setCardModalVisible(value)}
              SongsObj={SongObject}
            />
          )}
          <MaterialCommunityIcons
            name="music-note-plus"
            size={40}
            color="#696969"
          />
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.albumContainer}>
        <Text
          style={{
            color: "#696969",
            fontWeight: "bold",
            fontSize: 18.5,
          }}
        >
          Create Album
        </Text>
        <ScrollView
          ref={scrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={() => scrollView.current.scrollToEnd()}
        >
          {route.params &&
            AlbumList.map((album) => (
              <View key={album.name} style={{ marginTop: 16.5 }}>
                <TouchableWithoutFeedback onPress={() => onRemovalAlbum(album)}>
                  <MaterialCommunityIcons
                    style={{ marginLeft: 10 }}
                    name="delete"
                    size={21.5}
                    color="#696969"
                  />
                </TouchableWithoutFeedback>
                <View
                  style={[styles.Selector, { marginRight: 10, marginTop: 3 }]}
                >
                  <TouchableWithoutFeedback
                    onPress={() =>
                      setAlbumModal({
                        modal: !isAlbumModal.modal,
                        album: album,
                      })
                    }
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        paddingHorizontal: 12,
                        textDecorationLine: "underline",
                      }}
                    >
                      {album.name}
                    </Text>
                  </TouchableWithoutFeedback>
                  {isAlbumModal.modal && (
                    <AlbumModal
                      album={isAlbumModal.album}
                      toggle={(value) =>
                        setAlbumModal({ modal: value, album: "" })
                      }
                    />
                  )}
                </View>
              </View>
            ))}
          <TouchableOpacity
            style={styles.Selector}
            onPress={() =>
              SongObject.length > 0
                ? navigation.navigate(SCREENS.AlbumInput, {
                    SongName,
                    AlbumList,
                  })
                : alert("Add your Songs first")
            }
          >
            <AntDesign name="pluscircleo" size={40} color="#696969" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    marginLeft: 15,
  },
  miniContainer: {
    marginTop: 20,
  },
  textStyle: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#696969",
    paddingTop: 30,
    paddingBottom: 10,
  },
  Selector: {
    alignItems: "center",
    backgroundColor: "#E8E8E8",
    width: 100,
    height: 100,
    borderRadius: 20,
    marginTop: 40,
    justifyContent: "center",
  },
  SongCardStyle: {
    marginTop: 20,
    width: 120,
    borderRadius: 20,
  },
  imageStyles: {
    width: 100,
    height: 93.5,
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 3,
  },
  SongNameStyle: {
    color: "#383838",
    fontSize: 16.5,
    marginTop: 3,
    marginLeft: 12,
    alignSelf: "center",
    width: 90,
  },
  albumContainer: {
    marginTop: 50,
    marginLeft: 10,
    flexDirection: "column",
  },
  listText: {
    flexDirection: "row",
    paddingLeft: 45,
    padding: 15,
  },
});
