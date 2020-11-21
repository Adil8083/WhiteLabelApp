import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar, Image } from "react-native";
import GradiantButton from "../components/GradiantButton";
import Header from "../components/Header";
import { Theme } from "../constants/Theme";
import { create } from "apisauce";
import picture from "../../assets/icon.png";
export default function GenerateApk({ navigation }) {
  const apiClient = create({
    baseURL: "http://192.168.0.103:8000",
  });
  const apiPP = create({
    baseURL: "http://192.168.0.103:3000",
  });
  const form = new FormData();
  form.append("name", "aaa");
  form.append("userId", "userId");
  form.append("appIcon", {
    uri: picture,
    type: "image/jpeg",
    name: "icon.jpg",
  });
  const generate = async () => {
    console.log("request for user data");
    var user = await apiPP.get(`/api/users/get?email=uzair@gmail.com`);
    console.log(user.data.AppIcon);
    setImageUri(user.data.AppIcon);
    const headers = {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
    };
    console.log(form);
    console.log("req to engine");
    const response = await apiClient.post("/", form);
    console.log("reuest send", response.status);
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Header isBack navigation={navigation} text="Criação" />
        <GradiantButton
          title="Generate App"
          onPress={() => generate()}
          styleButton={{ width: "50%" }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.primary,
    marginTop: StatusBar.currentHeight,
  },
});
