import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

import PickerComponent from "../components/pickerComponent";
import Datepicker from "../components/DatePicker";
import TextInputComponent from "../components/TextInputComponent";
import DescriptionComponent from "../components/DescriptionComponent";
import { SCREENS } from "../constants/Screens";
import country_name from "../constants/CountriesNames.js";
import city_name from "../constants/CitiesNames.js";
import { Theme } from "../constants/Theme";
import Header from "../components/Header";
import TextSize from "../constants/TextSize";
import GradiantButton from "../components/GradiantButton";
import * as yup from "yup";
import ErrorMessgae from "../components/forms/ErrorMessgae";

let schema = yup.object().shape({
  countryName: yup.string().required(),
  CityName: yup.string().required(),
  Date: yup.string().required(),
  Time: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
});
export default function SingerConcertDeatils({ navigation }) {
  const [countryName, setcountryName] = useState(null);
  const [CitiesNames, setCitiesNames] = useState();
  const [CityName, setCityName] = useState();
  const [Date, setDate] = useState();
  const [Time, setTime] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [ValidEntries, setValidEntries] = useState(false);
  const [ShowError, setShowError] = useState(false);
  schema
    .isValid({ countryName, CityName, Date, Time, title, description })
    .then((valid) => setValidEntries(valid));
  useEffect(() => {
    if (countryName) {
      setCitiesNames(
        city_name.filter((obj) => {
          return obj.CountryId === countryName.id;
        })
      );
    }
  }, [countryName?.id]);
  return (
    <View style={styles.container}>
      <Header isBack navigation={navigation} text="Criação" />
      <View style={styles.formStlying}>
        <Text style={styles.subHeadin}>Add Concert Details</Text>
        <PickerComponent
          pickedOption={countryName}
          onPickOption={(option) => setcountryName(option)}
          countryName={country_name}
          icon="list"
          placeholder="Country name"
          containerStyle={{ width: 220, marginLeft: 30, marginTop: 15 }}
        />
        {ShowError && !countryName && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
        <PickerComponent
          pickedOption={CityName}
          onPickOption={(option) => setCityName(option)}
          countryName={countryName ? CitiesNames : city_name}
          icon="list"
          placeholder="City name"
          containerStyle={{ width: 220, marginLeft: 30, marginTop: 15 }}
        />
        {ShowError && !CityName && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
        <Datepicker
          mode="date"
          placeholder="Concert Date"
          getValue={(val) => setDate(val)}
          containerStyle={{ width: 220, marginLeft: 30, marginTop: 15 }}
        />
        {ShowError && !Date && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
        <Datepicker
          mode="time"
          placeholder="Concert Time"
          getValue={(time) => setTime(time)}
          containerStyle={{ width: 220, marginLeft: 30, marginTop: 15 }}
        />
        {ShowError && !Time && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
      </View>
      <View style={[styles.formStlying, { marginTop: 10 }]}>
        <Text style={styles.subHeadin}>Add Achivements</Text>
        <TextInputComponent
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          containerStyle={{ width: 220, marginLeft: 30 }}
        />
        {ShowError && !title && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
        <DescriptionComponent
          placeholder="Description"
          containerStyle={{ width: 220, marginLeft: 30 }}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={4}
        />
        {ShowError && !description && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
      </View>
      <GradiantButton
        title="Add"
        onPress={() =>
          ValidEntries
            ? navigation.navigate(SCREENS.Category)
            : setShowError(true)
        }
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
  formStlying: {
    width: "90%",
    backgroundColor: Theme.secondary,
    marginLeft: 20,
    paddingVertical: 20,
    borderRadius: 10,
  },
  subHeadin: {
    color: Theme.textColor,
    fontWeight: "bold",
    fontSize: TextSize.SubHeading,
    marginLeft: 30,
  },
});
