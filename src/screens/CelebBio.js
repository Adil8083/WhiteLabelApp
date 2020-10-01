import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import TextInputComponent from "../components/TextInputComponent";
import PickerComponent from "../components/pickerComponent";
import ImagePickerComponent from "../components/ImagePickerComponent";
import DatePicker from "../components/DatePicker";
import ButtonComponent from "../components/ButtonComponent";
import { SCREENS } from "../constants/Screens";
import * as yup from "yup";
import country_name from "../constants/CountriesNames.js";

let schema = yup.object().shape({
  AppName: yup.string().required().label("AppName"),
  OrgnanizationalEmail: yup
    .string()
    .required()
    .email()
    .label("Organization Email"),
});
export default function CelebBio({ navigation }) {
  const [countryName, setcountryName] = useState();
  const [AppName, setAppName] = useState();
  const [Number, setNumber] = useState();
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
      <Text style={styles.textStyle}>Criação</Text>
      <View style={styles.imgCont}>
        <View style={styles.textInput}>
          <TextInputComponent
            placeholder="App name"
            width="220"
            getValue={(text) => setAppName(text)}
            autoFocus={true}
          />
          <TextInputComponent
            placeholder="Organizational email"
            getValue={(text) => setOrgnanizationalEmail(text)}
            width="220"
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
      />
      <DatePicker placeholder="Date" width="220" mode="date" />
      <TextInputComponent
        placeholder="Contact number"
        keybordType="number-pad"
        getValue={(text) => setNumber(text)}
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
