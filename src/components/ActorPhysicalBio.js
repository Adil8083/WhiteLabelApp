import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";
import DropDownPicker from "react-native-dropdown-picker";
import Modal from "react-native-modal";
import AppText from "./AppText";
import TextInputComponent from "./TextInputComponent";
import GradiantButton from "./GradiantButton";
import client from "../api/client";
import useAuth from "../auth/useAuth";

export default function ActorPhysicalBio() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [eyeColor, setEyeColor] = useState();
  const [hairColor, setHairColor] = useState();
  const [bio, setBio] = useState({});
  const [nbr, setNbr] = useState(0);
  const [showIndicator, setShowIndicator] = useState(false);
  const [items, setItems] = useState([]);
  const [HairColorsList, setHairColorsList] = useState([]);
  const { user } = useAuth();
  const AddBio = async () => {
    if (height && weight && eyeColor && hairColor) {
      setModalVisible(false);
      setShowIndicator(true);
      const response = await client.put(`users/update?email=${user.email}`, {
        Height: height,
        Weight: weight,
        EyeColor: eyeColor,
        HairColor: hairColor,
      });
      if (!response.ok) {
        Alert.alert("Attention", "Unable to Add Actor Physical Info", [
          {
            text: "OK",
          },
        ]);
        setShowIndicator(false);
        return;
      }
      setShowIndicator(false);
      setBio({
        height,
        weight,
        eyeColor,
        hairColor,
      });
      setHairColor();
      setEyeColor();
      setHeight();
      setWeight();
      setNbr(1);
    } else {
      alert("please add all values");
    }
  };

  const onDel = async () => {
    setShowIndicator(true);
    const response = await client.put(`users/update?email=${user.email}`, {
      Height: 1,
      Weight: 1,
      EyeColor: " ",
      HairColor: " ",
    });
    if (!response.ok) {
      Alert.alert("Attention", "Unable to Delete Actor Physical Info", [
        {
          text: "OK",
        },
      ]);
      setShowIndicator(false);
      return;
    }
    setShowIndicator(false);
    setNbr(0);
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
    setBio({
      height: Response.data.Height,
      weight: Response.data.Weight,
      eyeColor: Response.data.EyeColor,
      hairColor: Response.data.HairColor,
    });
    Response.data.HairColor !== " " &&
      Response.data.EyeColor !== " " &&
      Response.data.Height !== " " &&
      Response.data.Weight !== " " &&
      setNbr(1);
    setShowIndicator(false);
  };
  useEffect(() => {
    AsyncFunc();
  }, []);
  const getActorEyeColors = async () => {
    let Response = await client.get("/eyecolor/get");
    if (!Response.ok) {
      Alert.alert("Attention", "Unable to Load EyeColors Data", [
        {
          text: "Retry",
          onPress: () => AsynFunc(),
        },
        { text: "Cancel" },
      ]);
      return;
    }
    setItems(Response.data);
  };
  useEffect(() => {
    getActorEyeColors();
  }, []);
  const getActorHairColors = async () => {
    let Response = await client.get("/haircolor/get");
    if (!Response.ok) {
      Alert.alert("Attention", "Unable to Load HairColors Data", [
        {
          text: "Retry",
          onPress: () => AsynFunc(),
        },
        { text: "Cancel" },
      ]);
      return;
    }
    setHairColorsList(Response.data);
  };
  useEffect(() => {
    getActorHairColors();
  }, []);
  return (
    <View>
      <ActivityIndicator animating={showIndicator} color={Theme.spareColor} />
      {nbr === 0 && (
        <View style={styles.container}>
          <AppText
            styleText={{
              fontSize: TextSize.SubHeading,
              color: Theme.textColor,
            }}
          >
            Add Your Bio
          </AppText>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <MaterialIcons name="add" size={30} color={Theme.iconColor} />
          </TouchableWithoutFeedback>
        </View>
      )}
      {nbr === 1 && (
        <View style={styles.container}>
          <AppText
            styleText={{
              fontSize: TextSize.SubHeading,
              color: Theme.textColor,
            }}
          >
            Edit Your Bio
          </AppText>
          <TouchableOpacity onPress={onDel}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={24}
              color={Theme.spareColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <MaterialIcons name="edit" size={24} color={Theme.spareColor} />
          </TouchableOpacity>
        </View>
      )}
      {nbr === 1 && (
        <View>
          <View style={styles.bioContainer}>
            <AppText styleText={{ color: Theme.textColor, fontWeight: "bold" }}>
              Eye Color
            </AppText>
            <AppText styleText={{ color: Theme.textColor, fontWeight: "bold" }}>
              Height
            </AppText>
            <AppText styleText={{ color: Theme.textColor, fontWeight: "bold" }}>
              Weight
            </AppText>
            <AppText styleText={{ color: Theme.textColor, fontWeight: "bold" }}>
              Hair Color
            </AppText>
          </View>
          <View style={styles.bioStyle}>
            <AppText styleText={{ color: Theme.textColor, paddingBottom: 8 }}>
              {bio.eyeColor}
            </AppText>
            <AppText styleText={{ color: Theme.textColor, paddingBottom: 8 }}>
              {bio.height} (cm)
            </AppText>
            <AppText styleText={{ color: Theme.textColor, paddingBottom: 8 }}>
              {bio.weight} (kg)
            </AppText>
            <AppText styleText={{ color: Theme.textColor }}>
              {bio.hairColor}
            </AppText>
          </View>
        </View>
      )}
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
            paddingBottom: 40,
            paddingTop: 25,
          }}
        >
          <DropDownPicker
            items={items}
            activeLabelStyle={{
              backgroundColor: Theme.lightGrey,
              flex: 1,
              borderRadius: 10,
            }}
            labelStyle={{
              padding: 5,
              fontWeight: "bold",
              color: Theme.darkColor,
            }}
            placeholder="Select Eye Color"
            defaultValue={""}
            containerStyle={{
              height: 40,
              marginTop: 10,
            }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            style={{ backgroundColor: Theme.lightColor }}
            dropDownStyle={{
              paddingVertical: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onChangeItem={(item) => setEyeColor(item.value)}
          />
          <TextInputComponent
            placeholder="Enter Height (cm)"
            keyboardType="numeric"
            onChangeText={(val) => {
              setHeight(val);
            }}
            containerStyle={{ width: "100%", marginTop: 10 }}
          />
          <TextInputComponent
            placeholder="Enter Weight (kg)"
            keyboardType="numeric"
            onChangeText={(val) => {
              setWeight(val);
            }}
            containerStyle={{ width: "100%", marginTop: 10 }}
          />
          <DropDownPicker
            items={HairColorsList}
            activeLabelStyle={{
              backgroundColor: Theme.lightGrey,
              flex: 1,
              borderRadius: 10,
            }}
            labelStyle={{
              padding: 5,
              fontWeight: "bold",
              color: Theme.darkColor,
            }}
            placeholder="Select Hair Color"
            defaultValue={""}
            containerStyle={{
              height: 40,
              marginTop: 10,
            }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            style={{ backgroundColor: Theme.lightColor }}
            dropDownStyle={{
              paddingVertical: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onChangeItem={(item) => setHairColor(item.value)}
          />
          <GradiantButton
            styleButton={{ marginTop: 20 }}
            title="Add"
            onPress={AddBio}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 47,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: Theme.secondary,
    flexDirection: "row",
  },
  innerContainer: {
    width: 350,
    height: 47,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: Theme.secondary,
    flexDirection: "row",
  },
  bioContainer: {
    width: 350,
    height: 35,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Theme.spareColor,
    flexDirection: "row",
  },
  bioStyle: {
    width: 350,
    height: 50,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Theme.secondary,
    flexDirection: "row",
  },
});
