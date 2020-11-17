import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
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
import SubHeading from "../components/SubHeading";
import useAuth from "../auth/useAuth";
import * as Api from "../api/CelebBioApi";
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
  const [ValidEntries, setValidEntries] = useState(false);
  const [ShowError, setShowError] = useState(false);
  const [EditName, setEditName] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);
  schema
    .isValid({ Name, WorkEmail, countryName, ImageUri, Date })
    .then((valid) => setValidEntries(valid));

  const validate = (email) => {
    const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return expression.test(String(email).toLowerCase());
  };
  const handleSubmit = () => {
    if (ValidEntries) {
      navigation.navigate(SCREENS.SocialAccounts);
      ImageUri &&
        Api.add(
          {
            profilePic: ImageUri,
          },
          user
        );
      WorkEmail &&
        Api.add(
          {
            ContactEmail: WorkEmail,
          },
          user
        );
      countryName &&
        Api.add(
          {
            Country: countryName,
          },
          user
        );
      Date &&
        Api.add(
          {
            DateOfBirth: Date,
          },
          user
        );
    } else setShowError(true);
  };
  const { user } = useAuth();
  const AsynFunc = async () => {
    setShowIndicator(true);
    const Response = await Api.get(user);
    if (!Response.ok) {
      setShowIndicator(false);
      return Alert("Unable to Load Data");
    }
    Response.data.name !== " " && setName(Response.data.name);
    Response.data.name !== " " && setEditName(false);
    Response.data.ContactEmail !== " " &&
      setWorkEmail(Response.data.ContactEmail);
    Response.data.Country !== " " && setcountryName(Response.data.Country);
    Response.data.DateOfBirth !== " " && setDate(Response.data.DateOfBirth);
    setShowIndicator(false);
  };
  useEffect(() => {
    AsynFunc();
  }, []);
  return (
    <View style={styles.container}>
      <Header isBack navigation={navigation} text="Criação" />
      <SubHeading
        title="Biography"
        style={{ width: "90%", alignSelf: "center" }}
      />
      <ActivityIndicator animating={showIndicator} color={Theme.spareColor} />
      <ScrollView>
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
              value={Name && Name}
              editable={EditName}
              containerStyle={{ width: "90%", marginTop: 20 }}
              onChangeText={(text) => setName(text)}
            />
            {ShowError && !Name && (
              <ErrorMessgae error="*Required" visible={true} />
            )}
            <TextInputComponent
              placeholder="Contact email"
              autoCapitalize="none"
              value={WorkEmail && WorkEmail}
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
              Date={Date}
            />
            {ShowError && !Date && (
              <ErrorMessgae error="*Required" visible={true} />
            )}
            <GradiantButton
              title="Next"
              onPress={handleSubmit}
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
    paddingVertical: 30,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 8,
  },
  imgStyle: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    paddingTop: 45,
  },
});
