import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Modal from "react-native-modal";

import { Octicons } from "@expo/vector-icons";
import { Theme } from "../constants/Theme";
import GradiantButton from "./GradiantButton";
import TextSize from "../constants/TextSize";
export default function AlbumModal({ album, toggle }) {
  return (
    <Modal
      isVisible
      coverScreen={true}
      onBackButtonPress={() => toggle(false)}
      onBackdropPress={() => toggle(false)}
    >
      <View style={styles.container}>
        <Text
          style={{
            alignSelf: "center",
            fontWeight: "bold",
            color: Theme.textColor,
            paddingTop: 30,
            marginBottom: 20,
            fontSize: 20,
          }}
        >
          {album.name}
        </Text>
        <View>
          <FlatList
            data={album.Songslist}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.listText}>
                <Octicons
                  name="primitive-dot"
                  size={15}
                  style={{ marginTop: 4.5 }}
                  color={Theme.textColor}
                />
                <Text
                  style={{
                    fontSize: TextSize.NormalText,
                    color: Theme.textColor,
                    marginLeft: 15,
                  }}
                >
                  {item}
                </Text>
              </View>
            )}
          />
          <GradiantButton
            title="Close"
            onPress={() => toggle(false)}
            styleButton={{ margin: 20 }}
          />
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.secondary,
    borderRadius: 10,
    shadowColor: Theme.lightColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    elevation: 10,
  },
  listText: {
    flexDirection: "row",
    paddingLeft: 45,
    padding: 15,
  },
});
