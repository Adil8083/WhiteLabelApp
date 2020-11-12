import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import * as yup from "yup";
import API from "apisauce";

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

let schema = yup.object().shape({
  Name: yup.string().required().label("Name"),
  WorkEmail: yup.string().email().label("Work Email"),
  countryName: yup.string().required().label("Country Name"),
  ImageUri: yup.string().required().label("Image"),
  Date: yup.string().required().label("Date"),
});

const baseURL = "http://192.168.10.9:3000/api";
const api = API.create({
  baseURL: baseURL,
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFhYTU1NzAwM2RkODIxZTQyOGY0YjciLCJpYXQiOjE2MDUwMTg5Njh9.5YyRrgRx8avimh25pEgAPVWuIEmHhcyH8zdjW4sIxFo",
  },
});
export default function CelebBio({ navigation }) {
  const [countryName, setcountryName] = useState(null);
  const [Name, setName] = useState();
  const [WorkEmail, setWorkEmail] = useState();
  const [ImageUri, setImageUri] = useState();
  const [Date, setDate] = useState();
  const [ValidEntries, setValidEntries] = useState(false);
  const [ShowError, setShowError] = useState(false);
  const [EditName, steEditName] = useState(true);
  const [EditEmail, steEditEmail] = useState(true);
  schema
    .isValid({ Name, WorkEmail, countryName, ImageUri, Date })
    .then((valid) => setValidEntries(valid));

  const validate = (email) => {
    const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return expression.test(String(email).toLowerCase());
  };

  useEffect(() => {
    api
      .get("users/get")
      .then((Response) => {
        Response.data.name !== " " && setName(Response.data.name);
        Response.data.name !== " " && steEditName(false);
        Response.data.ContactEmail !== " " &&
          setWorkEmail(Response.data.ContactEmail);
        Response.data.ContactEmail !== " " && steEditEmail(false);
        Response.data.Country !== " " && setcountryName(Response.data.Country);
        Response.data.DateOfBirth !== " " && setDate(Response.data.DateOfBirth);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <View style={styles.container}>
      <Header isBack navigation={navigation} text="Criação" />
      <SubHeading
        title="Biography"
        style={{ width: "90%", alignSelf: "center" }}
      />
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
              editable={EditEmail}
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
              onPress={() => {
                if (ValidEntries) {
                  navigation.navigate(SCREENS.SocialAccounts);
                  ImageUri &&
                    api
                      .put("users/update?email=uzair12naseem@gmail.com", {
                        profilePic: ImageUri,
                      })
                      .then((Response) => console.log(Response.data))
                      .catch((error) => console.log(error));
                  EditEmail &&
                    api
                      .put("users/update?email=uzair12naseem@gmail.com", {
                        ContactEmail: WorkEmail,
                      })
                      .then((Response) => console.log(Response.data))
                      .catch((error) => console.log(error));
                  countryName &&
                    api
                      .put("users/update?email=uzair12naseem@gmail.com", {
                        Country: countryName,
                      })
                      .then((Response) => console.log(Response.data))
                      .catch((error) => console.log(error));
                  Date &&
                    api
                      .put("users/update?email=uzair12naseem@gmail.com", {
                        DateOfBirth: Date,
                      })
                      .then((Response) => console.log(Response.data))
                      .catch((error) => console.log(error));
                } else setShowError(true);
              }}
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
