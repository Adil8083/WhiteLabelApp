import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import PickerItem from "./PickerItem";
import Screen from "../Screen";
import { Theme } from "../../constants/Theme";
import GradiantButton from "../GradiantButton";

function AppPicker({ placeholder, icon, items, selectedItem, onSelectItem }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeHolder}>{placeholder}</Text>
          )}
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <View style={styles.button}>
            <GradiantButton
              title="Close"
              onPress={() => setModalVisible(false)}
            />
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <PickerItem
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
  },
  container: {
    backgroundColor: Theme.primary,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeHolder: {
    flex: 1,
    color: "#808080",
  },
  text: {
    flex: 1,
    color: Theme.lightColor,
  },
});

export default AppPicker;
