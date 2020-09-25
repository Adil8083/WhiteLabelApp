import React, { useState } from "react";
import { View, Text } from "react-native";

import Modal from "react-native-modal";
import AppButton from "./AppButton";
import AppText from "./AppText";

export default function CategoryModal({
  MovieCategory,
  visible,
  visibleFunction,
  category,
}) {
  const closeModal = () => {
    visibleFunction(false);
  };
  return (
    <View>
      <Modal
        isVisible={visible}
        backdropColor="#145374"
        style={{
          justifyContent: "flex-start",
          borderRadius: 50,
          margin: 10,
          padding: 20,
        }}
      >
        {MovieCategory.map((item) => (
          <View key={item.title} style={{ flexDirection: "row" }}>
            {item.category === category && (
              <AppText
                styleText={{
                  fontSize: 40,
                  paddingRight: 10,
                  margin: 0,
                  fontWeight: "bold",
                }}
              >
                .
              </AppText>
            )}
            {item.category === category && (
              <AppText
                styleText={{ fontSize: 20, paddingTop: 20, fontWeight: "bold" }}
              >
                {item.title}
              </AppText>
            )}
          </View>
        ))}
        <AppButton
          title="close"
          onPress={closeModal}
          styleButton={{
            backgroundColor: "black",
            width: "80%",
            alignSelf: "center",
            borderRadius: 10,
          }}
        />
      </Modal>
    </View>
  );
}
