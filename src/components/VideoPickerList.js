import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  Image,
} from "react-native";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import CardModal from "./CardModal";
import AlbumModal from "./AlbumModal";
import { SCREENS } from "../constants/Screens";
import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";
import AlbumEditModal from "./AlbumEditModal";
import * as Api from "../api/PosterApi";
import useAuth from "../auth/useAuth";
export default function VideoPickerList({ getImagesUri }) {
  const navigation = useNavigation();
  const route = useRoute();
  const [AlbumList, setAlbumList] = useState([]);
  const [SongObject, setSongObject] = useState([]);
  const [SongName, setSongsName] = useState([]);
  const [isCardModalVisible, setCardModalVisible] = useState(false);
  const [ShowEditAlbumModal, setShowEditAlbumModal] = useState(false);
  const [isAlbumModal, setAlbumModal] = useState({ modal: false, album: "" });
  const [SongsToEdit, setSongsToEdit] = useState([]);
  const [nameOfAlbum, setNameOfAlbum] = useState();
  let temp_1 = [];
  let temp_2 = [];
  let temp_3 = [];
  let temp_4 = [];
  const { user } = useAuth();
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
          setSongsName(SongName.filter((name) => name.title !== obj.title));
          route.params &&
            setAlbumList(
              AlbumList.map((list) => ({
                Songslist: list.Songslist.filter((x) => x !== obj.title),
                name: list.name,
              }))
            );
          Api.del(obj.title, user);
        },
      },
      { text: "No" },
    ]);
  };
  const onRemovalAlbum = (d) => {
    Alert.alert("Delete", "Do you want to delete this Album?", [
      {
        text: "Yes",
        onPress: () => {
          setAlbumList(
            AlbumList.filter(
              (obj) => obj.name !== d.name && obj.Songslist !== d.Songslist
            )
          );
          var a = SongName;

          d.Songslist.map((title) => {
            Api.updateAlbum(title, " ", user);
            a = a.map((element) => {
              if (element.title === title) {
                return { title: element.title, InAlbum: false };
              } else return element;
            });
          });
          setSongsName(a);
        },
      },
      { text: "No" },
    ]);
  };
  const onEditAlbum = (album) => {
    setSongsToEdit(SongName.filter((obj) => !obj.InAlbum));
    setNameOfAlbum(album.name);
    setShowEditAlbumModal(!ShowEditAlbumModal);
  };
  const UpdateAlbumList = (obj) => {
    setAlbumList(
      AlbumList.map((val) =>
        val.name === nameOfAlbum
          ? {
              name: val.name,
              Songslist: val.Songslist.concat(
                obj
                  .map((val) => {
                    if (val.checked) {
                      Api.updateAlbum(val.songUri, nameOfAlbum, user);
                      return val.songUri;
                    }
                  })
                  .filter((element) => element !== undefined)
              ),
            }
          : val
      )
    );
    var a = SongName;

    obj.map((element) => {
      a = a.map((song) => {
        if (song.title === element.songUri) {
          if (element.checked)
            return { title: song.title, InAlbum: !song.InAlbum };
          else return song;
        } else return song;
      });
    });
    setSongsName(a);
  };
  useEffect(() => {
    if (route.params?.AlbumName) {
      setAlbumList([
        ...AlbumList,
        { name: route.params.AlbumName, Songslist: route.params.Album },
      ]);
      route.params.Album.map((val) =>
        Api.updateAlbum(val, route.params.AlbumName, user)
      );
      setSongsName(
        route.params.SongsList.map((element) => {
          if (element.checked) {
            return { title: element.songUri, InAlbum: !element.InAlbum };
          } else return { title: element.songUri, InAlbum: element.InAlbum };
        })
      );
      navigation.setParams({ Album: null, AlbumName: null });
    }
  }, [route.params?.AlbumName]);
  useEffect(() => getImagesUri(SongObject), [SongObject?.length]);
  useEffect(() => {
    let a = Api.Read(user);
    a.then((obj) => {
      obj.map((data) => {
        temp_1.push({
          title: data.name,
          uri: data.poster,
        });
        if (data.album.length > 1) {
          temp_2.push({ title: data.name, InAlbum: true });
          temp_4 = temp_3.filter((obj) => obj.name === data.album);
          temp_4.length > 0
            ? (temp_3 = temp_3.map((val) =>
                val.name === data.album
                  ? { name: val.name, Songslist: [...val.Songslist, data.name] }
                  : val
              ))
            : temp_3.push({ name: data.album, Songslist: [data.name] });
        } else temp_2.push({ title: data.name, InAlbum: false });
      });
      setSongObject(temp_1);
      setSongsName(temp_2);
      setAlbumList(temp_3);
    });
  }, []);
  const scrollView = useRef();
  const scrollView2 = useRef();
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
          marginTop: 25,
          marginHorizontal: 15,
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
            <MaterialIcons name="add" size={30} color={Theme.iconColor} />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollView2}
          horizontal
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={() => scrollView2.current.scrollToEnd()}
        >
          {SongObject.length > 0 &&
            SongObject.map((obj) => (
              <View key={obj.uri} style={styles.SongCardStyle}>
                <TouchableOpacity onPress={() => onRemoval(obj)}>
                  <Image
                    key={obj.uri}
                    source={{ uri: obj.uri }}
                    style={styles.imageStyles}
                  />
                </TouchableOpacity>
                <Text style={styles.SongNameStyle}>{obj.title}</Text>
              </View>
            ))}
          {isCardModalVisible && (
            <CardModal
              getObject={(obj) => {
                setSongObject([
                  ...SongObject,
                  { uri: obj.uri, title: obj.title },
                ]);
                Api.add(
                  {
                    name: obj.title,
                    poster: obj.uri,
                    album: " ",
                  },
                  user
                );
              }}
              getTitle={(title) =>
                setSongsName([...SongName, { title, InAlbum: false }])
              }
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
            <MaterialIcons name="add" size={30} color={Theme.iconColor} />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={() => scrollView.current.scrollToEnd()}
        >
          {AlbumList.length > 0 &&
            AlbumList.map(
              (album) =>
                album.Songslist.length > 0 && (
                  <View
                    key={album.name}
                    style={{ marginTop: 16.5, marginLeft: 10 }}
                  >
                    <View
                      style={[
                        styles.Selector,
                        { marginRight: 10, marginTop: 3 },
                      ]}
                    >
                      <View
                        style={{
                          flex: 0.2,
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 5,
                        }}
                      >
                        <TouchableWithoutFeedback
                          onPress={() => onRemovalAlbum(album)}
                        >
                          <MaterialCommunityIcons
                            style={{ marginLeft: 8 }}
                            name="delete"
                            size={20}
                            color={Theme.spareColor}
                          />
                        </TouchableWithoutFeedback>
                        <TouchableOpacity onPress={() => onEditAlbum(album)}>
                          <MaterialIcons
                            style={{ marginRight: 8 }}
                            name="add"
                            size={21}
                            color={Theme.spareColor}
                          />
                        </TouchableOpacity>
                        {ShowEditAlbumModal && (
                          <AlbumEditModal
                            Songs={SongsToEdit}
                            toggle={(val) => setShowEditAlbumModal(val)}
                            getSongsList={(obj) =>
                              obj.length > 0 && UpdateAlbumList(obj)
                            }
                          />
                        )}
                      </View>
                      <View
                        style={{
                          flex: 0.65,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
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
                              marginHorizontal: 8,
                              textDecorationLine: "underline",
                            }}
                          >
                            {album.name}
                          </Text>
                        </TouchableWithoutFeedback>
                      </View>
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
                )
            )}
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
    backgroundColor: Theme.DarkGrey,
    width: 100,
    height: 100,
    borderRadius: 20,
    marginTop: 40,
  },
  SongCardStyle: {
    marginTop: 20,
    width: 120,
    borderRadius: 20,
  },
  imageStyles: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 3,
  },
  SongNameStyle: {
    color: Theme.textColor,
    fontSize: TextSize.NormalText,
    marginTop: 7,
    marginLeft: 22,
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
    marginHorizontal: 15,
  },
  listText: {
    flexDirection: "row",
    paddingLeft: 45,
    padding: 15,
  },
});
