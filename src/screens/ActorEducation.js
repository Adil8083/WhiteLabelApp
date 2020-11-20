import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";

import AppText from "../components/AppText";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import GradiantButton from "../components/GradiantButton";
import Header from "../components/Header";
import Modal from "react-native-modal";
import TextInputComponent from "../components/TextInputComponent";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";
import ActorPhysicalBio from "../components/ActorPhysicalBio";
import client from "../api/client";
import useAuth from "../auth/useAuth";

export default function ActorEducation({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [degree, setDegree] = useState();
  const [institute, setInstitute] = useState();
  const [education, setEducation] = useState([]);
  const [update, setUpdate] = useState(false);
  const [nbr, setNbr] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const { user } = useAuth();
  const openModal = () => {
    setModalVisible(true);
  };
  const onAdd = async () => {
    if (education && degree) {
      setModalVisible(false);
      setShowIndicator(true);
      const response = await client.put(`users/update?email=${user.email}`, {
        ActorEducation: [
          ...education,
          {
            institute,
            degree,
          },
        ],
      });
      if (!response.ok) {
        Alert.alert("Attention", "Unable to add Actor education", [
          {
            text: "OK",
          },
        ]);
        setShowIndicator(false);
        return;
      }
      setShowIndicator(false);
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
    } else {
      alert("plaease add values");
    }
  };
  const onDel = async (val) => {
    setShowIndicator(true);
    const response = await client.put(`users/update?email=${user.email}`, {
      ActorEducation: education.filter((obj) => obj !== val),
    });
    if (!response.ok) {
      Alert.alert("Attention", "Unable to delete Actor education", [
        {
          text: "OK",
        },
      ]);
      setShowIndicator(false);
      return;
    }
    setShowIndicator(false);
    setEducation(education.filter((obj) => obj !== val));
  };
  const AsyncFunc = async () => {
    setShowIndicator(true);
    const Response = await client.get(`users/get?email=${user.email}`);
    if (!Response.ok) {
      Alert.alert("Attention", "Unable to Load Data", [
        {
          text: "Retry",
          onPress: () => AsyncFunc(),
        },
        { text: "Cancel" },
      ]);
      setShowIndicator(false);
      return;
    }
    setEducation(Response.data.ActorEducation);
    setNbr(1);
    setShowIndicator(false);
  };
  useEffect(() => {
    AsyncFunc();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Header isBack navigation={navigation} text="Criação" />
        <ActivityIndicator animating={showIndicator} color={Theme.spareColor} />
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
