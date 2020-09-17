import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import TextInputComponent from "../components/TextInputComponent";
import PickerComponent from "../components/pickerComponent";
import ImagePickerComponent from "../components/ImagePickerComponent";
import DatePicker from "../components/DatePicker";
import ButtonComponent from "../components/ButtonComponent";
import { SCREENS } from "../constants/Screens";

const country_name = [
  {
    id: 1,
    name: "Pakistan",
  },
  {
    id: 2,
    name: "Albania",
  },
  {
    id: 3,
    name: "Algeria",
  },
];
export default function CelebBio({ navigation }) {
  const [countryName, setcountryName] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Criação</Text>
      <View style={styles.imgCont}>
        <View style={styles.textInput}>
          <TextInputComponent
            placeholder="App name"
            width="220"
            autoFocus={true}
          />
          <TextInputComponent
            placeholder="Organizational email"
            width="220"
            keybordType="email-address"
          />
        </View>
        <View style={styles.imgStyle}>
          <ImagePickerComponent />
        </View>
      </View>
      <PickerComponent
        pickedOption={countryName}
        onPickOption={(option) => setcountryName(option)}
        countryName={country_name}
        icon="list"
        placeholder="Country name"
      />
      <DatePicker placeholder="Date" width="220" mode="date" />
      <TextInputComponent
        placeholder="Contact number"
        keybordType="number-pad"
        width="220"
      />
      <ButtonComponent
        title="Next"
        onPressEvent={() => navigation.navigate(SCREENS.SingerWE)}
        marginTop={85}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  textStyle: {
    fontSize: 30,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    color: "#696969",
    paddingTop: 30,
    paddingBottom: 10,
  },
  imgStyle: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingTop: 45,
  },
  imgCont: {
    flexDirection: "row",
  },
});
