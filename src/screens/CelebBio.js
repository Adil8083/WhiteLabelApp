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
import ErrorMessgae from "../components/forms/ErrorMessgae";

let schema = yup.object().shape({
  Name: yup.string().required().label("Name"),
  WorkEmail: yup.string().email().label("Work Email"),
  countryName: yup.string().required().label("Country Name"),
  ImageUri: yup.string().required().label("Image"),
  Date: yup.string().required().label("Date"),
});
export default function CelebBio({ navigation }) {
  const [countryName, setcountryName] = useState(null);
  const [Name, setName] = useState();
  const [WorkEmail, setWorkEmail] = useState();
  const [ImageUri, setImageUri] = useState();
  const [Date, setDate] = useState();
  const [Error, setError] = useState();
  const [ValidEntries, setValidEntries] = useState(false);
  const [ShowError, setShowError] = useState(false);
  schema
    .isValid({ Name, WorkEmail, countryName, ImageUri, Date })
    .then((valid) => setValidEntries(valid));

  const validate = (email) => {
    const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return expression.test(String(email).toLowerCase());
  };
  return (
    <View style={styles.container}>
      <Header isBack navigation={navigation} text="Criação" />
      <View style={styles.formStlying}>
        <View style={styles.imgCont}>
          <View style={styles.textInput}>
            <TextInputComponent
              placeholder="Your name"
              containerStyle={{ width: 220, marginLeft: 10, marginTop: 60 }}
              onChangeText={(text) => setName(text)}
              autoFocus={true}
            />
            {ShowError && !Name && (
              <ErrorMessgae error="*Required" visible={true} />
            )}
            <TextInputComponent
              placeholder="Work email"
              onChangeText={(text) => setWorkEmail(text)}
              containerStyle={{ width: 220, marginLeft: 10, marginTop: 30 }}
              keybordType="email-address"
            />
            {ShowError && !validate(WorkEmail) && (
              <ErrorMessgae
                error="*Required and Should be a valid Email"
                visible={true}
              />
            )}
            <Text>{Error}</Text>
          </View>
          <View style={styles.imgStyle}>
            {ShowError && !ImageUri && (
              <ErrorMessgae error="*Required" visible={true} />
            )}
            <ImagePickerComponent
              BottomHeading="Profile Picture"
              BottomTextColor={Theme.lightColor}
              getImageUri={(uri) => setImageUri(uri)}
            />
          </View>
        </View>
        <PickerComponent
          pickedOption={countryName}
          onPickOption={(option) => setcountryName(option)}
          countryName={country_name}
          icon="list"
          placeholder="Country name"
          containerStyle={{ width: 220, marginLeft: 10, marginTop: 10 }}
        />
        {ShowError && !countryName && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
        <DatePicker
          placeholder="Date of Birth"
          containerStyle={{ width: 220, marginLeft: 10, marginTop: 30 }}
          getValue={(val) => setDate(val)}
          mode="date"
        />
        {ShowError && !Date && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
        <GradiantButton
          title="Next"
          onPress={() =>
            ValidEntries
              ? navigation.navigate(SCREENS.SocialAccounts)
              : setShowError(true)
          }
          styleButton={{ marginTop: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: Theme.primary,
  },
  formStlying: {
    width: "90%",
    backgroundColor: Theme.secondary,
    marginLeft: 20,
    paddingVertical: 30,
    borderRadius: 10,
  },
  imgStyle: {
    flexDirection: "column",
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
