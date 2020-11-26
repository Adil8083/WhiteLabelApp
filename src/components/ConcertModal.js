import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import * as yup from "yup";

import GradiantButton from "./GradiantButton";
import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";
import PickerComponent from "../components/pickerComponent";
import Datepicker from "../components/DatePicker";
import ErrorMessgae from "../components/forms/ErrorMessgae";
import * as Api from "../api/CelebBioApi";

let schema = yup.object().shape({
  countryName: yup.string().required(),
  CityName: yup.string().required(),
  Date: yup.string().required(),
  Time: yup.string().required(),
});

const ConcertModal = ({ toggle, getConcertDetails }) => {
  const [countryName, setcountryName] = useState();
  const [CitiesNames, setCitiesNames] = useState();
  const [CityName, setCityName] = useState();
  const [Date, setDate] = useState();
  const [Time, setTime] = useState();
  const [ValidEntries, setValidEntries] = useState(false);
  const [ShowError, setShowError] = useState(false);
  const [country_name, setCountry_name] = useState([]);
  const [city_name, setCity_name] = useState([]);
  schema
    .isValid({ countryName, CityName, Date, Time })
    .then((valid) => setValidEntries(valid));
  useEffect(() => {
    if (countryName) {
      setCitiesNames(
        city_name.filter((obj) => {
          return obj.Country === countryName;
        })
      );
    }
  }, [countryName]);
  const getNamesApi = async () => {
    let Response = await Api.getCountries();
    if (!Response.ok) {
      Alert.alert("Attention", "Unable to Load Countries Data", [
        {
          text: "Retry",
          onPress: () => AsynFunc(),
        },
        { text: "Cancel" },
      ]);
      return;
    }
    setCountry_name(Response.data);
    Response = await Api.getCities();
    if (!Response.ok) {
      Alert.alert("Attention", "Unable to Load Cities Data", [
        {
          text: "Retry",
          onPress: () => AsynFunc(),
        },
        { text: "Cancel" },
      ]);
      return;
    }

    setCity_name(Response.data);
  };
  useEffect(() => {
    getNamesApi();
  }, []);
  return (
    <Modal
      isVisible
      coverScreen={true}
      onBackButtonPress={() => toggle(false)}
      onBackdropPress={() => toggle(false)}
    >
      <View style={styles.card}>
        <Text
          style={{
            fontSize: TextSize.SubHeading,
            color: Theme.lightColor,
            fontWeight: "bold",
          }}
        >
          Concert Details
        </Text>
        <PickerComponent
          pickedOption={countryName}
          onPickOption={(option) => setcountryName(option)}
          countryName={country_name}
          icon="list"
          placeholder="Country name"
          containerStyle={{ width: "90%", marginTop: 30 }}
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
          containerStyle={{ width: "90%", marginTop: 10 }}
        />
        {ShowError && !CityName && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
        <Datepicker
          mode="date"
          placeholder="Concert Date"
          getValue={(val) => setDate(val)}
          containerStyle={{ width: "90%", marginTop: 10 }}
        />
        {ShowError && !Date && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
        <Datepicker
          mode="time"
          placeholder="Concert Time"
          getValue={(time) => setTime(time)}
          containerStyle={{ width: "90%", marginTop: 10 }}
        />
        {ShowError && !Time && (
          <ErrorMessgae error="*Required" visible={true} />
        )}
        <GradiantButton
          title="Add"
          onPress={() => {
            if (ValidEntries) {
              getConcertDetails({
                country: countryName,
                city: CityName,
                date: Date,
                time: Time,
              });
              toggle(false);
            } else setShowError(true);
          }}
          styleButton={{ marginTop: 10 }}
        />
      </View>
    </Modal>
  );
};

export default ConcertModal;
const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    backgroundColor: Theme.secondary,
    borderRadius: 10,
    shadowColor: Theme.darkColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    paddingVertical: 20,
    elevation: 10,
  },
});
