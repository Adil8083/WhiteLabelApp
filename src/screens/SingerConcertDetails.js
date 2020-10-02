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

export default function SingerConcertDeatils({ navigation }) {
  const [countryName, setcountryName] = useState(null);
  const [CitiesNames, setCitiesNames] = useState();
  const [CityName, setCityName] = useState();
  const [title, setTitle] = useState();
  const [decription, setDescription] = useState();
  const [region, setRegion] = useState();
  const [country, setCountry] = useState();
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
      <Text style={styles.subHeadin}>Add Concert Details</Text>
      <PickerComponent
        pickedOption={countryName}
        onPickOption={(option) => setcountryName(option)}
        countryName={country_name}
        icon="list"
        placeholder="Country name"
        containerStyle={{ width: 220, marginLeft: 30, marginTop: 15 }}
      />
      <PickerComponent
        pickedOption={CityName}
        onPickOption={(option) => setCityName(option)}
        countryName={countryName ? CitiesNames : city_name}
        icon="list"
        placeholder="City name"
        containerStyle={{ width: 220, marginLeft: 30, marginTop: 15 }}
      />
      <Datepicker
        mode="date"
        placeholder="Concert Date"
        containerStyle={{ width: 220, marginLeft: 30, marginTop: 15 }}
      />
      <Datepicker
        mode="time"
        placeholder="Concert Time"
        containerStyle={{ width: 220, marginLeft: 30, marginTop: 15 }}
      />
      <Text style={styles.subHeadin}>Add Achivements</Text>
      <TextInputComponent
        placeholder="Title"
        getValue={(text) => setTitle(text)}
        containerStyle={{ width: 220, marginLeft: 30 }}
      />
      <DescriptionComponent
        placeholder="Description"
        containerStyle={{ width: 220, marginLeft: 30 }}
        getValue={(text) => setDescription(text)}
        multiline={true}
        numberOfLines={4}
      />
      <GradiantButton
        title="Add"
        onPress={() => navigation.navigate(SCREENS.Category)}
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
  subHeadin: {
    color: Theme.textColor,
    fontWeight: "bold",
    fontSize: TextSize.SubHeading,
    marginTop: 25,
    marginLeft: 30,
  },
});
