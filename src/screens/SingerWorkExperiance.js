import React, { useEffect, useState } from "react";
import { View, StyleSheet, StatusBar, ScrollView } from "react-native";

import VideoPicker from "../components/VideoPickerList";
import { SCREENS } from "../constants/Screens";
import GradiantButton from "../components/GradiantButton";
import { Theme } from "../constants/Theme";
import ErrorMessgae from "../components/forms/ErrorMessgae";
import Header from "../components/Header";

export default function SingerWorkExperiance({ navigation }) {
  const [ImagesUri, setImagesUri] = useState([]);
  const [ShowError, setShowError] = useState(false);
  return (
    <View style={styles.container}>
      <Header isBack navigation={navigation} text="Criação" />
      <ScrollView>
        <View style={{ marginBottom: 30 }}>
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
                ? navigation.navigate(SCREENS.Gallery, { Gallery: "Singer" })
                : setShowError(true);
            }}
            styleButton={{ marginTop: 10 }}
          />
        </View>
      </ScrollView>
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
