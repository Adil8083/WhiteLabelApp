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
  ActivityIndicator,
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
  const [showIndicator, setShowIndicator] = useState(false);
  let temp_1 = [];
  let temp_2 = [];
  let temp_3 = [];
  let temp_4 = [];
  const { user } = useAuth();
  const onRemoval = (obj) => {
    Alert.alert("Delete", "Do you want to delete this Song?", [
      {
        text: "Yes",
        onPress: async () => {
          setShowIndicator(true);
          const response = await Api.del(obj.title, user);
          if (!response.ok) {
            Alert.alert("Attention", "Unable to Delete this Song", [
              {
                text: "OK",
              },
            ]);
            setShowIndicator(false);
            return;
          }
          setShowIndicator(false);
          setSongObject(
            SongObject.filter(
              (sngObj) => sngObj.uri !== obj.uri && sngObj.title !== obj.title
            )
          );
          setSongsName(SongName.filter((name) => name.title !== obj.title));
          AlbumList.length > 0 &&
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
  const removeAlbumInDb = (songs) => {
    songs.map(async (title) => {
      const response = await Api.updateAlbum(title, " ", user);
      if (!response.ok) {
        Alert.alert(
          "Attention",
          `${title} is not deleted from album at backend beacuse of some problem`,
          [
            {
              text: "OK",
            },
          ]
        );
        setShowIndicator(false);
      }
    });
  };
  const onRemovalAlbum = (d) => {
    Alert.alert("Delete", "Do you want to delete this Album?", [
      {
        text: "Yes",
        onPress: () => {
          setShowIndicator(true);
          removeAlbumInDb(d.Songslist);
          setShowIndicator(false);
          setAlbumList(
            AlbumList.filter(
              (obj) => obj.name !== d.name && obj.Songslist !== d.Songslist
            )
          );
          var a = SongName;

          d.Songslist.map(async (title) => {
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
    obj.map(async (obj) => {
      setShowIndicator(true);
      const response = await Api.updateAlbum(obj.songUri, nameOfAlbum, user);
      if (!response.ok) {
        Alert.alert(
          "Attention",
          `${obj.songUri} is not added in album at backend beacuse of some problem`,
          [
            {
              text: "OK",
            },
          ]
        );
        setShowIndicator(false);
      }
    });
    setShowIndicator(false);
    setAlbumList(
      AlbumList.map((val) =>
        val.name === nameOfAlbum
          ? {
              name: val.name,
              Songslist: val.Songslist.concat(
                obj
                  .map((val) => {
                    if (val.checked) {
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
      setShowIndicator(true);
      route.params.Album.map(async (val) => {
        const response = await Api.updateAlbum(
          val,
          route.params.AlbumName,
          user
        );
        if (!response.ok) {
          Alert.alert(
            "Attention",
            `${val} is not added in album at backend beacuse of some problem`,
            [
              {
                text: "OK",
              },
            ]
          );
          setShowIndicator(false);
        }
      });
      setShowIndicator(false);
      setAlbumList([
        ...AlbumList,
        { name: route.params.AlbumName, Songslist: route.params.Album },
      ]);
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
  const scrollView = useRef();
  const scrollView2 = useRef();
  const AsynFunc = async () => {
    setShowIndicator(true);
    const Response = await Api.Read(user);
    if (!Response.ok) {
      setShowIndicator(false);
      return Alert.alert("Sorry", "Unable to Load Data", [
        {
          text: "Retry",
          onPress: () => AsynFunc(),
        },
        { text: "Cancel" },
      ]);
    }
    Response.data.map((data) => {
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
    setShowIndicator(false);
  };
  useEffect(() => {
    AsynFunc();
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
              getObject={async (obj) => {
                setShowIndicator(true);
                const response = await Api.add(
                  {
                    name: obj.title,
                    poster: obj.uri,
                    album: " ",
                  },
                  user
                );
                if (!response.ok) {
                  Alert.alert("Attention", "Unable to add this Song Info", [
                    {
                      text: "OK",
                    },
                  ]);
                  setShowIndicator(false);
                  return;
                }
                setShowIndicator(false);
                setSongObject([
                  ...SongObject,
                  { uri: obj.uri, title: obj.title },
                ]);
                setSongsName([
                  ...SongName,
                  { title: obj.title, InAlbum: false },
                ]);
              }}
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
