import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import GradiantButton from "../components/GradiantButton";
import Header from "../components/Header";
import { Theme } from "../constants/Theme";
import { create } from "apisauce";
import useAuth from "../auth/useAuth";
import SubHeading from "../components/SubHeading";
import TextSize from "../constants/TextSize";
import { BarIndicator } from "react-native-indicators";
import { SCREENS } from "../constants/Screens";
export default function GenerateApk({ navigation }) {
  const [email, setEmail] = useState();

  const [visible, setVisible] = useState(false);
  const { user } = useAuth();

  const apiClient = create({
    baseURL: "http://192.168.0.101:8000",
  });
  const apiPP = create({
    baseURL: "http://192.168.0.101:3000",
  });

  const generate = async () => {
    setVisible(true);

    console.log("request for user data");
    var userData = await apiPP.get(`/api/users/get?email=${user.email}`);
    console.log(userData.data.AppIcon);
    setEmail(userData.data.email);

    const form = new FormData();
    form.append("name", userData.data.AppName);
    form.append("email", userData.data.email);
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

    setTimeout(() => {
      navigation.navigate(SCREENS.EditScreen, {
        AppName: userData.data.AppName,
        Category: userData.data.Category,
      });
    }, 8000);
  };
  return (
    <View style={styles.container}>
      {!visible && (
        <View style={{ width: "90%" }}>
          <Header isBack navigation={navigation} text="Criação" />
          <SubHeading title="App generation" />
          <Text style={styles.text}>
            All the data has been gathered and now you are just one click away
            from your app.
          </Text>
          <GradiantButton
            title="Generate App"
            onPress={() => generate()}
            styleButton={{ width: "50%" }}
          />
        </View>
      )}

      {visible && (
        <View style={{ width: "90%", paddingTop: 300 }}>
          <BarIndicator count={12} color={Theme.spareColor} size={70} />
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              alignSelf: "center",
              paddingTop: 40,
              fontSize: TextSize.SubHeading,
            }}
          >
            Your App is Generating
          </Text>
          {email && (
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "white",
                  alignSelf: "center",
                  paddingTop: 50,
                  fontSize: TextSize.SubHeading,
                }}
              >
                You will get your Apk download link on
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  color: Theme.spareColor,
                  alignSelf: "center",
                  paddingTop: 40,
                  textDecorationLine: "underline",
                  fontSize: TextSize.SubHeading,
                }}
              >
                {email}
              </Text>
            </View>
          )}
        </View>
      )}
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
  text: {
    color: "white",
    fontSize: TextSize.SubHeading,
    textAlign: "justify",
    marginTop: 40,
  },
});
