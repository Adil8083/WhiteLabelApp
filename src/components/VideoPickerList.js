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

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CardModal from "./CardModal";
import AlbumModal from "./AlbumModal";
import { SCREENS } from "../constants/Screens";
import Header from "./Header";
import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";

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
    <View>
      <Header isBack navigation={navigation} text="Criação" />
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Theme.textColor,
              fontWeight: "bold",
              fontSize: TextSize.SubHeading,
              marginLeft: 10,
            }}
          >
            Add your Songs
          </Text>
          <TouchableOpacity
            onPress={() => setCardModalVisible(!isCardModalVisible)}
          >
            <MaterialIcons
              name="add"
              size={30}
              color={Theme.iconColor}
              style={styles.touch}
            />
          </TouchableOpacity>
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
                    color={Theme.textColor}
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
        </ScrollView>
      </View>
      <View style={styles.albumContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Theme.textColor,
              fontWeight: "bold",
              fontSize: TextSize.SubHeading,
              marginLeft: 10,
            }}
          >
            Create Album
          </Text>
          <TouchableOpacity
            onPress={() =>
              SongObject.length > 0
                ? navigation.navigate(SCREENS.AlbumInput, {
                    SongName,
                    AlbumList,
                  })
                : alert("Add your Songs first")
            }
          >
            <MaterialIcons
              name="add"
              size={30}
              color={Theme.iconColor}
              style={styles.touch}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={() => scrollView.current.scrollToEnd()}
        >
          {route.params &&
            AlbumList.map((album) => (
              <View
                key={album.name}
                style={{ marginTop: 16.5, marginLeft: 10 }}
              >
                <TouchableWithoutFeedback onPress={() => onRemovalAlbum(album)}>
                  <MaterialCommunityIcons
                    style={{ marginLeft: 10 }}
                    name="delete"
                    size={21.5}
                    color={Theme.textColor}
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
                        fontSize: TextSize.NormalText,
                        color: Theme.textColor,
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
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  miniContainer: {
    marginTop: 20,
  },
  Selector: {
    alignItems: "center",
    backgroundColor: Theme.DarkGrey,
    width: 100,
    height: 90,
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
    height: 93,
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 3,
  },
  SongNameStyle: {
    color: Theme.textColor,
    fontSize: TextSize.NormalText,
    marginTop: 3,
    marginLeft: 40,
    width: 90,
  },
  albumContainer: {
    backgroundColor: Theme.secondary,
    borderRadius: 10,
    shadowColor: Theme.lightColor,
    padding: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
    marginTop: 30,
  },
  listText: {
    flexDirection: "row",
    paddingLeft: 45,
    padding: 15,
  },
});
