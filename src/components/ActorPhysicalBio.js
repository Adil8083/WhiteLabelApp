import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";
import DropDownPicker from "react-native-dropdown-picker";
import Modal from "react-native-modal";
import AppText from "./AppText";
import TextInputComponent from "./TextInputComponent";
import GradiantButton from "./GradiantButton";
import { set } from "react-native-reanimated";

export default function ActorPhysicalBio() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [eyeColor, setEyeColor] = useState();
  const [hairColor, setHairColor] = useState();
  const [bio, setBio] = useState({});
  const [nbr, setNbr] = useState(0);

  const AddBio = () => {
    if (height && weight && eyeColor && hairColor) {
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
      setModalVisible(false);
    } else {
      alert("please add all values");
    }
  };

  const onDel = () => {
    setBio();
    setNbr(0);
  };

  return (
    <View>
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
          }}
        >
          <DropDownPicker
            items={[
              { label: "Brown Eyes", value: "Brown Eyes" },
              { label: "Blue Eyes", value: "Blue Eyes" },
              { label: "Hazel Eyes", value: "Hazel Eyes" },
              { label: "Gray Eyes", value: "Gray Eyes" },
              { label: "Amber Eyes", value: "Amber Eyes" },
              { label: "Green Eyes", value: "Green Eyes" },
            ]}
            activeLabelStyle={{
              backgroundColor: Theme.darkColor,
              flex: 1,
              borderRadius: 10,
            }}
            labelStyle={{
              padding: 5,
              fontWeight: "bold",
              color: Theme.lightColor,
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
            style={{ backgroundColor: Theme.secondary }}
            dropDownStyle={{
              backgroundColor: Theme.secondary,
              paddingVertical: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onChangeItem={(item) => setEyeColor(item.value)}
          />
          <DropDownPicker
            items={[
              { label: "Brown Hair", value: "Brown Hair" },
              { label: "Blond Hair", value: "Blond Hair" },
              { label: "Black Hair", value: "Black Hair" },
              { label: "Auburn Hair", value: "Auburn Hair" },
              { label: "Red Hair", value: "Red Hair" },
              { label: "Gray Hair", value: "Gray Hair" },
              { label: "White Hair", value: "White Hair" },
            ]}
            activeLabelStyle={{
              backgroundColor: Theme.darkColor,
              flex: 1,
              borderRadius: 10,
            }}
            labelStyle={{
              padding: 5,
              fontWeight: "bold",
              color: Theme.lightColor,
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
            style={{ backgroundColor: Theme.secondary }}
            dropDownStyle={{
              backgroundColor: Theme.secondary,
              paddingVertical: 10,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            }}
            onChangeItem={(item) => setHairColor(item.value)}
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
          <GradiantButton title="Add" onPress={AddBio} />
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
