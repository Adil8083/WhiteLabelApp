import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SCREENS } from "../constants/Screens";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";

export default function EditScreen({ navigation, route }) {
  const App = route.params.AppName;
  const HandleNavigation = () => {
    if (route.params.Category === "Actor") {
      navigation.navigate(SCREENS.ActorWE);
    }
    if (route.params.Category === "Singer") {
      navigation.navigate(SCREENS.SingerWE);
    }
    if (route.params.Category === "SportsPerson") {
      navigation.navigate(SCREENS.SportsInfo);
    }
    if (route.params.Category === "Politician") {
      navigation.navigate(SCREENS.PoliticianInfo);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <View
          style={[
            styles.container,
            {
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
              marginTop: StatusBar.currentHeight + 20,
              marginBottom: 20,
            },
          ]}
        >
          <Text
            style={{
              fontSize: TextSize.Heading,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Criação
          </Text>
        </View>
        <View
          style={{
            height: 50,
            backgroundColor: Theme.secondary,
            borderRadius: 10,
            padding: 5,
            marginTop: 30,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: Theme.textColor,
              fontWeight: "bold",
              fontSize: TextSize.SubHeading,
              paddingTop: 8,
            }}
          >
            YOUR APP
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Theme.secondary,
            borderRadius: 20,
            padding: 15,
            marginTop: 10,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: Theme.primary,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 15,
              borderRadius: 30,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Theme.textColor,
                alignSelf: "center",
                fontSize: TextSize.SubHeading,
              }}
            >
              {App}
            </Text>
            <TouchableOpacity
              onPress={() => {
                HandleNavigation();
              }}
            >
              <MaterialIcons name="edit" size={24} color={Theme.spareColor} />
            </TouchableOpacity>
          </View>
        </View>
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
