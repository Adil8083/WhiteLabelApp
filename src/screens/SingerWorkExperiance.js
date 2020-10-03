import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import VideoPicker from "../components/VideoPickerList";
import { SCREENS } from "../constants/Screens";
import GradiantButton from "../components/GradiantButton";
import { Theme } from "../constants/Theme";

export default function SingerWorkExperiance({ navigation }) {
  return (
    <View style={styles.container}>
      <VideoPicker />
      <GradiantButton
        title="Next"
        onPress={() => navigation.navigate(SCREENS.SingerCD)}
        styleButton={{ marginTop: 10 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: Theme.primary,
  },
});
