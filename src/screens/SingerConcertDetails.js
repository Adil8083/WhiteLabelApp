import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

import PickerComponent from "../components/pickerComponent";
import Datepicker from "../components/DatePicker";
import TextInputComponent from "../components/TextInputComponent";
import ButtonComponent from "../components/ButtonComponent";
import DescriptionComponent from "../components/DescriptionComponent";
import { SCREENS } from "../constants/Screens";
export default function SingerConcertDeatils({ navigation }) {
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

  const city_name = [
    {
      id: 1,
      name: "Los Angeles",
    },
    {
      id: 2,
      name: "Oakland",
    },
    {
      id: 3,
      name: "Washington",
    },
  ];
  const [countryName, setcountryName] = useState();
  const [CityName, setCityName] = useState();
  return (
    <View style={styles.container}>
      <Text style={styles.headingStyle}>Criação</Text>
      <Text style={styles.subHeadin}>Add Concert Details</Text>
      <PickerComponent
        pickedOption={countryName}
        onPickOption={(option) => setcountryName(option)}
        countryName={country_name}
        icon="list"
        placeholder="Country name"
      />
      <PickerComponent
        pickedOption={CityName}
        onPickOption={(option) => setCityName(option)}
        countryName={city_name}
        icon="list"
        placeholder="City name"
      />
      <Datepicker mode="date" placeholder="Concert Date" width="220" />
      <Datepicker mode="time" placeholder="Concert Time" width="220" />
      <Text style={styles.subHeadin}>Add Achivements</Text>
      <TextInputComponent placeholder="title" width="220" />
      <DescriptionComponent
        placeholder="Description"
        width="260"
        multiline={true}
        numberOfLines={3}
      />
      <ButtonComponent
        title="Add"
        onPressEvent={() => navigation.navigate(SCREENS.ActorWE)}
        marginTop={80}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  headingStyle: {
    fontSize: 30,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    color: "#696969",
    paddingTop: 20,
    paddingBottom: 10,
  },
  subHeadin: {
    color: "#696969",
    fontWeight: "bold",
    fontSize: 18.5,
    marginLeft: 10,
    marginTop: 30,
    marginLeft: 30,
  },
});