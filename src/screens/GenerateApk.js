import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import GradiantButton from "../components/GradiantButton";
import Header from "../components/Header";
import { Theme } from "../constants/Theme";
import { create } from "apisauce";
export default function GenerateApk({ navigation }) {
  const [imageuri, setImageUri] = useState();
  const apiClient = create({
    baseURL: "http://192.168.0.103:8000",
  });
  const apiPP = create({
    baseURL: "http://192.168.0.103:3000",
  });

  const generate = async () => {
    console.log("request for user data");
    var user = await apiPP.get(`/api/users/get?email=adilwahed@yahoo.com`);
    console.log(user.data.AppIcon);
    setImageUri(user.data.AppIcon);
    console.log(imageuri);
    const form = new FormData();
    form.append("name", user.data.AppName);
    form.append("userId", user.data._id);
    form.append("appIcon", {
      uri: user.data.AppIcon,
      type: "image/png",
      name: "test.png",
    });
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
