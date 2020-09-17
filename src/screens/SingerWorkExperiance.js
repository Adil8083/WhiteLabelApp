import React from "react";
import { View } from "react-native";

import VideoPicker from "../components/VideoPickerList";
import ButtonComponent from "../components/ButtonComponent";
import { SCREENS } from "../constants/Screens";

export default function SingerWorkExperiance({ navigation }) {
  return (
    <View>
      <VideoPicker />
      <ButtonComponent
        title="Next"
        onPressEvent={() => navigation.navigate(SCREENS.SingerCD)}
        marginTop={85}
      />
    </View>
  );
}
