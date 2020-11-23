import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import AppText from "../components/AppText";
import GradiantButton from "../components/GradiantButton";
import Header from "../components/Header";
import TextInputComponent from "../components/TextInputComponent";
import { SCREENS } from "../constants/Screens";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";

export default function ActorHobbies({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState();
  const [hoobies, setHobbies] = useState([]);
  const [hobby, setHobby] = useState();
  const onAdd = () => {
    if (hobby) {
      if (hoobies.find((obj) => obj === hobby)) {
        setError("it is already exist");
      } else {
        setHobbies([...hoobies, hobby]);
        setModalVisible(false);
        setHobby();
        setError();
      }
    } else {
      setError("Please Write Something");
    }
  };
  const onDel = (val) => {
    setHobbies(hoobies.filter((obj) => obj !== val));
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Header isBack navigation={navigation} text="Criação" />
        <View style={styles.innerContainer}>
          <Text
            style={{
              color: Theme.textColor,
              fontSize: TextSize.SubHeading,
              padding: 10,
            }}
          >
            Add Hobbies
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialIcons
              name="add"
              size={30}
              color={Theme.iconColor}
              style={{ padding: 8 }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView>
            <View
              style={{
                borderRadius: 5,
                marginTop: 10,
              }}
            >
              {hoobies.map((item) => (
                <View
                  key={item}
                  style={{
                    flexDirection: "row",
                    backgroundColor: Theme.secondary,
                    justifyContent: "space-between",
                    padding: 10,
                    borderRadius: 10,
                    marginVertical: 5,
                    width: "95%",
                    alignSelf: "center",
                  }}
                >
                  <AppText
                    styleText={{
                      color: Theme.textColor,
                      fontWeight: "bold",
                    }}
                  >
                    {item}
                  </AppText>
                  <TouchableOpacity onPress={() => onDel(item)}>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={24}
                      color={Theme.spareColor}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
      <Modal
        coverScreen={true}
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: Theme.secondary,
            borderRadius: 10,
            shadowColor: Theme.darkColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            elevation: 10,
            padding: 10,
          }}
        >
          <TextInputComponent
            placeholder="Enter Your Hobby"
            onChangeText={(val) => setHobby(val)}
            containerStyle={{ width: "100%", marginTop: 10 }}
          />
          <AppText
            styleText={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            {error}
          </AppText>
          <GradiantButton title="Add" onPress={onAdd} />
        </View>
      </Modal>
      <GradiantButton
        title="Next"
        onPress={() => navigation.navigate(SCREENS.ActorEdu)}
      />
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
  innerContainer: {
    backgroundColor: Theme.secondary,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
