import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import PickerItems from "./pickerItems";

function pickerComponent({
  pickedOption,
  onPickOption,
  countryName,
  icon,
  placeholder,
}) {
  const [ModalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
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
      <Modal visible={ModalVisible} animationType="slide">
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <MaterialCommunityIcons
            style={{ alignSelf: "center" }}
            name="close"
            size={35}
            color="#696969"
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
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    marginLeft: 20,
    width: 260,
    height: 35,
    marginTop: 25,
  },
  iconOne: {
    paddingTop: 8,
    paddingLeft: 15,
  },
  textStyle: {
    flex: 1,
    paddingTop: 6,
    paddingLeft: 7,
    fontSize: 17,
    color: "#B8B8B8",
  },
});

export default pickerComponent;
