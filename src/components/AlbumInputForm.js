import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

import { CheckBox } from "react-native-elements";
import TextInputComponent from "./TextInputComponent";
import ButtonComponent from "./ButtonComponent";
import { SCREENS } from "../constants/Screens";

export default class AlbumInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SongsList: [],
      Album: [],
      AlbumName: null,
    };
  }

  value = [];
  componentDidMount() {
    setTimeout(() => {
      this.props.route.params.SongName.length > 0 &&
        this.props.route.params.SongName.map((uri) =>
          this.value.push({
            songUri: uri,
            checked: false,
          })
        );
      this.setState({ SongsList: this.value });
    }, 10);
  }
  componentDidUpdate(prevState, prevProps) {
    if (
      this.state.SongsList !== prevProps.SongsList &&
      this.state.SongsList.length > 0
    ) {
      this.value = [];
      this.state.SongsList.map(
        (obj) => obj.checked && this.value.push(obj.songUri)
      );
      this.value.length > 0 && this.setState({ Album: this.value });
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.HeadingStyle}>Album</Text>
        <TextInputComponent
          getValue={(text) => this.setState({ AlbumName: text })}
          placeholder="Album name"
          width="220"
        />
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
          {this.state.SongsList.length > 0 &&
            this.state.SongsList.map((list) => (
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
                  this.setState((prevState) => ({
                    SongsList: prevState.SongsList.map((obj) =>
                      obj.songUri === list.songUri
                        ? Object.assign(obj, { checked: !list.checked })
                        : obj
                    ),
                  }));
                }}
                onIconPress={() => {
                  this.setState((prevState) => ({
                    SongsList: prevState.SongsList.map((obj) =>
                      obj.songUri === list.songUri
                        ? Object.assign(obj, { checked: !list.checked })
                        : obj
                    ),
                  }));
                }}
              />
            ))}
        </View>
        <ButtonComponent
          title="Next"
          onPressEvent={() => {
            this.props.route.params.AlbumList.filter((val) => {
              return val.name === this.state.AlbumName;
            }).length > 0
              ? alert("This Album name is already added")
              : navigation.navigate(SCREENS.SingerWE, {
                  Album: this.state.Album,
                  AlbumName: this.state.AlbumName,
                });
          }}
          marginTop={85}
        />
      </View>
    );
  }
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
