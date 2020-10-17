import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { Theme } from "../constants/Theme";
import GradiantButton from "./GradiantButton";
import Modal from "react-native-modal";
import AppText from "./AppText";
import { AntDesign } from "@expo/vector-icons";
import TextSize from "../constants/TextSize";

class AlbumEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SongsList: [],
    };
  }
  value = [];
  componentDidMount() {
    setTimeout(() => {
      this.props.Songs.length > 0 &&
        this.props.Songs.map((obj) =>
          this.value.push({
            songUri: obj.title,
            checked: false,
          })
        );
      this.setState({ SongsList: this.value });
    }, 10);
  }
  render() {
    return (
      <Modal
        isVisible
        coverScreen={true}
        onBackButtonPress={() => this.props.toggle(false)}
        onBackdropPress={() => this.props.toggle(false)}
      >
        <View style={styles.Container}>
          {this.state.SongsList.length > 0 ? (
            this.state.SongsList.map((obj) => (
              <View
                key={obj.songUri}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <AppText
                  children={obj.songUri}
                  styleText={{ color: Theme.lightGrey }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setState((prevState) => ({
                      SongsList: prevState.SongsList.map((list) =>
                        obj.songUri === list.songUri
                          ? Object.assign(list, { checked: !obj.checked })
                          : list
                      ),
                    }));
                  }}
                >
                  {!obj.checked && (
                    <AntDesign
                      name="pluscircleo"
                      size={23}
                      color={Theme.lightGrey}
                    />
                  )}
                  {obj.checked && (
                    <AntDesign name="pluscircle" size={23} color="#696969" />
                  )}
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <AppText
              children="Nothing to Add"
              styleText={{
                color: Theme.lightGrey,
                alignSelf: "center",
                fontSize: TextSize.SubHeading,
              }}
            />
          )}
          <GradiantButton
            title="Add"
            onPress={() => {
              this.state.SongsList.length > 0 &&
                this.props.getSongsList(this.state.SongsList);
              this.props.toggle(false);
            }}
            styleButton={{ margin: 10 }}
          />
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    backgroundColor: Theme.secondary,
    borderRadius: 10,
    shadowColor: Theme.lightColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
    padding: 15,
  },
});
export default AlbumEditModal;
