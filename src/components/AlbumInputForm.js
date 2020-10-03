import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

import { CheckBox } from "react-native-elements";
import TextInputComponent from "./TextInputComponent";
import { SCREENS } from "../constants/Screens";
import Header from "./Header";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";
import GradiantButton from "./GradiantButton";
import ErrorMessgae from "./forms/ErrorMessgae";

export default class AlbumInputForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SongsList: [],
      Album: [],
      AlbumName: null,
      ShowError: false,
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
        <Header isBack navigation={navigation} text="Criação" />
        <View style={styles.miniContainer}>
          <TextInputComponent
            onChangeText={(text) => this.setState({ AlbumName: text })}
            placeholder="Album name"
            containerStyle={{ width: 220, marginLeft: 20 }}
          />
          {this.state.ShowError && !this.state.AlbumName && (
            <ErrorMessgae error="*Required" visible={true} />
          )}
          <View style={styles.checkBoxStyle}>
            <Text
              style={{
                color: Theme.textColor,
                fontWeight: "bold",
                fontSize: TextSize.SubHeading,
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
                  checkedColor={Theme.textColor}
                  containerStyle={{
                    backgroundColor: Theme.secondary,
                    marginTop: 15,
                    marginRight: 30,
                    borderColor: Theme.darkColor,
                    borderRadius: 15,
                    borderWidth: 1,
                  }}
                  textStyle={{ color: Theme.textColor }}
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
          <GradiantButton
            title="Next"
            onPress={() => {
              this.state.AlbumName
                ? this.props.route.params.AlbumList.filter((val) => {
                    return val.name === this.state.AlbumName;
                  }).length > 0
                  ? alert("This Album name is already added")
                  : navigation.navigate(SCREENS.SingerWE, {
                      Album: this.state.Album,
                      AlbumName: this.state.AlbumName,
                    })
                : this.setState({ ShowError: true });
            }}
            styleButton={{ marginTop: 20, marginBottom: 10 }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: Theme.primary,
  },

  miniContainer: {
    marginLeft: 20,
    marginTop: 50,
  },
  checkBoxStyle: {
    marginTop: 50,
    marginLeft: 20,
  },
});
