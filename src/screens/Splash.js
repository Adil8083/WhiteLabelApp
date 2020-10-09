import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";

import { SCREENS } from "../constants/Screens";

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate(SCREENS.ActorWE);
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
