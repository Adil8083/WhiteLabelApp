import React, { useState, useRef } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Modal from "react-native-modal";
import AppText from "../components/AppText";
import GradiantButton from "../components/GradiantButton";
import Header from "../components/Header";
import TextInputComponent from "../components/TextInputComponent";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";

export default function ActorEducation({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [degree, setDegree] = useState();
  const [institute, setInstitute] = useState();
  const [education, setEducation] = useState([]);
  const [update, setUpdate] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const onAdd = () => {
    if (education && degree) {
      setEducation([
        ...education,
        {
          institute,
          degree,
        },
      ]);
      setDegree();
      setInstitute();
      setModalVisible(false);
    } else {
      alert("plaease add values");
    }
  };
  const onDel = (val) => {
    for (var i = 0; i < education.length; i++) {
      if (education[i] == val) {
        education.splice(i, 1);
        if (update) {
          setUpdate(false);
        } else {
          setUpdate(true);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Header isBack navigation={navigation} text="Criação" />
        <ScrollView>
          <View style={styles.innerContainer}>
            <AppText
              styleText={{
                color: Theme.textColor,
                padding: 10,
                fontSize: TextSize.SubHeading,
              }}
            >
              Add Acting Degree/Education
            </AppText>
            <TouchableWithoutFeedback onPress={openModal}>
              <MaterialIcons
                name="add"
                size={30}
                color={Theme.iconColor}
                style={{ padding: 8 }}
              />
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              backgroundColor: Theme.spareColor,
              marginTop: 10,
              padding: 10,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <AppText
              styleText={{
                color: Theme.textColor,
                fontWeight: "bold",
              }}
            >
              DEGREE
            </AppText>
            <AppText
              styleText={{
                color: Theme.textColor,
                fontWeight: "bold",
              }}
            >
              INSTITUTE
            </AppText>
            <Entypo name="arrow-down" size={24} color="black" />
          </View>
          <View
            style={{
              backgroundColor: Theme.secondary,
              marginTop: 4,
              padding: 10,
              borderBottomEndRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            {education.map((item) => (
              <View
                key={item.degree}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <AppText
                  styleText={{
                    color: Theme.textColor,
                    fontWeight: "bold",
                    // textAlign: "left",
                  }}
                >
                  {item.degree}
                </AppText>
                <AppText
                  styleText={{
                    color: Theme.textColor,
                    fontWeight: "bold",
                  }}
                >
                  {item.institute}
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
      <Modal
        coverScreen={true}
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: Theme.lightColor,
            borderRadius: 10,
            shadowColor: Theme.darkColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            elevation: 10,
            padding: 10,
          }}
        >
          <TextInputComponent
            placeholder="Enter Institute/University"
            onChangeText={(val) => setInstitute(val)}
            containerStyle={{ width: "100%", marginTop: 10 }}
          />
          <TextInputComponent
            placeholder="Enter Degree/Diploma"
            onChangeText={(val) => {
              setDegree(val);
            }}
            containerStyle={{ width: "100%", marginTop: 10 }}
          />
          <GradiantButton title="Add" onPress={onAdd} />
        </View>
      </Modal>
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
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
