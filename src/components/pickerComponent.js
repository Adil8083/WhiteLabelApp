import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";

import PickerItems from "./pickerItems";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";

function pickerComponent({
  pickedOption,
  onPickOption,
  countryName,
  icon,
  placeholder,
  containerStyle,
}) {
  const [ModalVisible, setModalVisible] = useState(false);
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
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
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
          <FlatList
            data={countryName}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PickerItems
                items={item}
                onPressEvent={() => {
                  setModalVisible(false);
                  onPickOption(item);
                }}
              />
            )}
          />
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
});

export default pickerComponent;
