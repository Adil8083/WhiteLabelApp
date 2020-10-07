import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import VideoPicker from "../components/VideoPickerList";
import { SCREENS } from "../constants/Screens";
import GradiantButton from "../components/GradiantButton";
import { Theme } from "../constants/Theme";
import ErrorMessgae from "../components/forms/ErrorMessgae";

export default function SingerWorkExperiance({ navigation }) {
  const [ImagesUri, setImagesUri] = useState([]);
  const [ShowError, setShowError] = useState(false);
  return (
    <View style={styles.container}>
      <VideoPicker getImagesUri={(uris) => setImagesUri(uris)} />
      {ShowError && !(ImagesUri.length > 0) && (
        <ErrorMessgae
          error="Add atleast one Song"
          errorStyle={{ marginLeft: 25 }}
          visible={true}
        />
      )}
      <GradiantButton
        title="Next"
        onPress={() => {
          ImagesUri.length > 0
            ? navigation.navigate(SCREENS.SingerCD)
            : setShowError(true);
        }}
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
