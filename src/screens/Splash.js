import React, { Component } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SCREENS } from "../constants/Screens";

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate(SCREENS.NamingApp);
    }, 2000);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
}
