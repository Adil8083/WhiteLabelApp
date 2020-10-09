import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import * as yup from "yup";

import TextInputComponent from "../components/TextInputComponent";
import PickerComponent from "../components/pickerComponent";
import ImagePickerComponent from "../components/ImagePickerComponent";
import DatePicker from "../components/DatePicker";
import { SCREENS } from "../constants/Screens";
import country_name from "../constants/CountriesNames.js";
import { Theme } from "../constants/Theme";
import Header from "../components/Header";
import GradiantButton from "../components/GradiantButton";
import ErrorMessgae from "../components/forms/ErrorMessgae";
import Title from "../components/Title";

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
      <ScrollView>
        <Header isBack navigation={navigation} text="Criação" />
        <View style={{ alignItems: "center" }}>
          <View style={styles.formStlying}>
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
            <TextInputComponent
              placeholder="Your name"
              containerStyle={{ width: "90%", marginTop: 20 }}
              onChangeText={(text) => setName(text)}
              autoFocus={true}
            />
            {ShowError && !Name && (
              <ErrorMessgae error="*Required" visible={true} />
            )}
            <TextInputComponent
              placeholder="Work email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setWorkEmail(text)}
              containerStyle={{ width: "90%", marginTop: 20 }}
            />
            {ShowError && !validate(WorkEmail) && (
              <ErrorMessgae
                error="*Required and Should be a valid Email"
                visible={true}
              />
            )}
            <PickerComponent
              pickedOption={countryName}
              onPickOption={(option) => setcountryName(option)}
              countryName={country_name}
              icon="list"
              placeholder="Country name"
              containerStyle={{ width: "90%", marginTop: 20 }}
            />
            {ShowError && !countryName && (
              <ErrorMessgae error="*Required" visible={true} />
            )}
            <DatePicker
              placeholder="Date of Birth"
              containerStyle={{ width: "90%", marginTop: 20 }}
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
  formStlying: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.secondary,
    marginLeft: 10,
    paddingVertical: 30,
    borderRadius: 10,
    marginBottom: 30,
  },
  imgStyle: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingTop: 45,
  },
});
