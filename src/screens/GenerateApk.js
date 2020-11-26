import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import GradiantButton from "../components/GradiantButton";
import Header from "../components/Header";
import { Theme } from "../constants/Theme";
import { create } from "apisauce";
import useAuth from "../auth/useAuth";
export default function GenerateApk({ navigation }) {
  const { user } = useAuth();
  const [imageuri, setImageUri] = useState();
  const apiClient = create({
    baseURL: "http://192.168.0.103:8000",
  });
  const apiPP = create({
    baseURL: "http://192.168.0.103:3000",
  });

  const generate = async () => {
    console.log("request for user data");
    var userData = await apiPP.get(`/api/users/get?email=${user.email}`);
    console.log(userData.data.AppIcon);
    setImageUri(userData.data.AppIcon);
    console.log(imageuri);
    const form = new FormData();
    form.append("name", userData.data.AppName);
    form.append("userId", userData.data._id);
    form.append("appIcon", {
      uri: userData.data.AppIcon,
      type: "image/png",
      name: "test.png",
    });
    console.log(form);
    console.log("req to engine");
    const response = await apiClient.post("/", form);
    console.log("reuest send", response.status);
    console.log(user.email);
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
