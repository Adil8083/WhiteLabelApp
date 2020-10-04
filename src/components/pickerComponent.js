import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";

import PickerItems from "./pickerItems";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";
import TextInputComponent from "./TextInputComponent";
import GradiantButton from "./GradiantButton";

function pickerComponent({
  pickedOption,
  onPickOption,
  countryName,
  icon,
  placeholder,
  containerStyle,
}) {
  const [ModalVisible, setModalVisible] = useState(false);
  const [OpenTxtInput, setOpenTxtInput] = useState(false);
  const [NewInput, setNewInput] = useState();
  const [ShowNewInput, setShowNewInput] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, containerStyle && containerStyle]}>
          <Feather
            style={styles.iconOne}
            name={icon}
            size={20}
            color="#B8B8B8"
          />
          {pickedOption ? (
            <Text style={[styles.textStyle, { color: "#696969" }]}>
              {pickedOption.name}
            </Text>
          ) : (
            <Text style={styles.textStyle}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons
            style={{ margin: 8 }}
            name="chevron-down"
            size={20}
            color="#B8B8B8"
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        visible={ModalVisible}
        coverScreen={true}
        onBackButtonPress={() => {
          setOpenTxtInput(false);
          setModalVisible(false);
        }}
        onBackdropPress={() => {
          setOpenTxtInput(false);
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              setOpenTxtInput(false);
              setModalVisible(false);
            }}
          >
            <MaterialCommunityIcons
              style={{ alignSelf: "center" }}
              name="close"
              size={30}
              color={Theme.textColor}
            />
          </TouchableWithoutFeedback>
          {ShowNewInput && (
            <>
              <TouchableOpacity
                onPress={() => {
                  setOpenTxtInput(false);
                  setModalVisible(false);
                  onPickOption({ id: 1, name: NewInput });
                }}
              >
                <Text style={styles.ListTextStyle}>{NewInput}</Text>
              </TouchableOpacity>
            </>
          )}
          <FlatList
            data={countryName}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PickerItems
                items={item}
                onPressEvent={() => {
                  setOpenTxtInput(false);
                  setModalVisible(false);
                  onPickOption(item);
                }}
              />
            )}
          />
          <TouchableWithoutFeedback onPress={() => setOpenTxtInput(true)}>
            <Text style={styles.ListTextStyle}>Other</Text>
          </TouchableWithoutFeedback>
          {OpenTxtInput && (
            <View style={{ flexDirection: "row" }}>
              <TextInputComponent
                placeholder="Coutry/City Name"
                containerStyle={{
                  marginVertical: 10,
                  width: 200,
                  marginHorizontal: 10,
                }}
                onChangeText={(txt) => setNewInput(txt)}
              />
              <GradiantButton
                title="Add"
                onPress={() => {
                  setOpenTxtInput(false);
                  NewInput && setShowNewInput(true);
                }}
                styleButton={{
                  width: 80,
                  paddingTop: 0,
                  marginLeft: 20,
                }}
              />
            </View>
          )}
        </View>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 35,
    borderColor: "#dfdfdf",
    borderWidth: 1,
    width: 220,
  },
  modalContainer: {
    backgroundColor: Theme.DarkGrey,
    borderRadius: 10,
    shadowColor: Theme.darkColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
    height: "50%",
  },
  iconOne: {
    paddingTop: 8,
    paddingLeft: 10,
  },
  textStyle: {
    flex: 1,
    paddingTop: 7,
    paddingLeft: 7,
    fontSize: TextSize.NormalText,
    color: "#B8B8B8",
  },
  ListTextStyle: {
    fontSize: TextSize.NormalText,
    paddingLeft: 45,
    padding: 15,
    color: Theme.textColor,
  },
});

export default pickerComponent;
