import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import TextInputComponent from "../components/TextInputComponent";
import PickerComponent from "../components/pickerComponent";
import ImagePickerComponent from "../components/ImagePickerComponent";
import DatePicker from "../components/DatePicker";
import { SCREENS } from "../constants/Screens";
import * as yup from "yup";
import country_name from "../constants/CountriesNames.js";
import { Theme } from "../constants/Theme";
import Header from "../components/Header";
import GradiantButton from "../components/GradiantButton";

let schema = yup.object().shape({
  AppName: yup.string().required().label("AppName"),
  OrgnanizationalEmail: yup.string().email().label("Organization Email"),
});
export default function CelebBio({ navigation }) {
  const [countryName, setcountryName] = useState();
  const [AppName, setAppName] = useState();
  const [OrgnanizationalEmail, setOrgnanizationalEmail] = useState();
  const [touched, setTouched] = useState(false);
  const [Error, setError] = useState();
  //schema.cast({ AppName: AppName });
  // schema
  //   .isValid({ AppName, OrgnanizationalEmail })
  //   .then((valid) => console.log(valid));
  // try {
  //   schema.validateSync({ OrgnanizationalEmail });
  // } catch (error) {
  //   //console.log(error.message);
  // }
  return (
    <View style={styles.container}>
      <Header isBack navigation={navigation} text="Criação" />
      <View style={styles.imgCont}>
        <View style={styles.textInput}>
          <TextInputComponent
            placeholder="Your name"
            containerStyle={{ width: 220, marginLeft: 30, marginTop: 50 }}
            onChangeText={(text) => setAppName(text)}
            autoFocus={true}
          />
          <TextInputComponent
            placeholder="Work email"
            onChangeText={(text) => setOrgnanizationalEmail(text)}
            containerStyle={{ width: 220, marginLeft: 30, marginTop: 30 }}
            onBlur={() => setTouched(true)}
            keybordType="email-address"
          />
          {/* <ErrorMessgae error={Error} visible={touched} /> */}
          <Text>{Error}</Text>
        </View>
        <View style={styles.imgStyle}>
          <ImagePickerComponent BottomHeading="Profile Picture" />
        </View>
      </View>
      <PickerComponent
        pickedOption={countryName}
        onPickOption={(option) => setcountryName(option)}
        countryName={country_name}
        icon="list"
        placeholder="Country name"
        containerStyle={{ width: 220, marginLeft: 30, marginTop: 10 }}
      />
      <DatePicker
        placeholder="Date of Birth"
        containerStyle={{ width: 220, marginLeft: 30, marginTop: 30 }}
        mode="date"
      />
      <GradiantButton
        title="Next"
        onPress={() => navigation.navigate(SCREENS.Category)}
        styleButton={{ marginTop: 20 }}
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
