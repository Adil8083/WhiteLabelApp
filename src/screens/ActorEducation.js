import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import API from "apisauce";

import AppText from "../components/AppText";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import GradiantButton from "../components/GradiantButton";
import Header from "../components/Header";
import Modal from "react-native-modal";
import TextInputComponent from "../components/TextInputComponent";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";
import ActorPhysicalBio from "../components/ActorPhysicalBio";

const baseURL = "http://192.168.10.9:3000/api";
const api = API.create({
  baseURL: baseURL,
  headers: {
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFhYTU1NzAwM2RkODIxZTQyOGY0YjciLCJpYXQiOjE2MDUwMTg5Njh9.5YyRrgRx8avimh25pEgAPVWuIEmHhcyH8zdjW4sIxFo",
  },
});
export default function ActorEducation({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [degree, setDegree] = useState();
  const [institute, setInstitute] = useState();
  const [education, setEducation] = useState([]);
  const [update, setUpdate] = useState(false);
  const [nbr, setNbr] = useState(0);

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
      setNbr(1);
      setModalVisible(false);
    } else {
      alert("plaease add values");
    }
  };
  const onDel = (val) => {
    setEducation(education.filter((obj) => obj !== val));
  };
  useEffect(() => {
    api
      .put("users/update?email=uzair12naseem@gmail.com", {
        ActorEducation: education,
      })
      .then((Response) => console.log(Response.data))
      .catch((error) => console.log(error));
  }, [education.length]);
  useEffect(() => {
    api
      .get("users/get")
      .then((Response) => {
        setEducation(Response.data.ActorEducation);
        setNbr(1);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Header isBack navigation={navigation} text="Criação" />
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
        {education.length > 0 && (
          <View>
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
                  marginRight: 130,
                }}
              >
                INSTITUTE
              </AppText>
            </View>
            <View
              style={{
                backgroundColor: Theme.secondary,
                marginTop: 4,
                padding: 10,
                borderBottomEndRadius: 10,
                borderBottomLeftRadius: 10,
                height: 150,
              }}
            >
              <ScrollView>
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
              </ScrollView>
            </View>
          </View>
        )}
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
      <View>
        <ActorPhysicalBio />
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
  innerContainer: {
    backgroundColor: Theme.secondary,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
