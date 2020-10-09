import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";

import { SCREENS } from "../constants/Screens";

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
<<<<<<< HEAD
      this.props.navigation.navigate(SCREENS.ActorEdu);
=======
      this.props.navigation.navigate(SCREENS.NamingApp);
>>>>>>> 1ec4256036f9b0499575dc025d46e5f16e62721f
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
