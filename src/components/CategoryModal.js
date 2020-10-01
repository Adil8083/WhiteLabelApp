import React from "react";
import { View } from "react-native";

import Modal from "react-native-modal";
import AppButton from "./AppButton";
import AppText from "./AppText";
import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";

export default function CategoryModal({
  MovieCategory,
  visible,
  visibleFunction,
  category,
}) {
  return (
    <View>
      <Modal
        coverScreen={true}
        onBackButtonPress={() => visibleFunction(false)}
        onBackdropPress={() => visibleFunction(false)}
        isVisible={visible}
      >
        <View
          style={{
            backgroundColor: Theme.lightColor,
            borderRadius: 10,
            shadowColor: Theme.darkColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            elevation: 10,
          }}
        >
          <View
            style={{
              backgroundColor: Theme.spareColor,
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
            }}
          >
            <AppText
              styleText={{
                textAlign: "center",
                fontWeight: "bold",
                marginVertical: 10,
                fontSize: TextSize.SubHeading,
                color: Theme.textColor,
              }}
            >
              {category} Movies
            </AppText>
          </View>
          {MovieCategory.map((item) => (
            <View
              key={item.title}
              style={{
                flexDirection: "row",
                paddingLeft: 10,
                paddingBottom: 2,
              }}
            >
              {item.category === category && (
                <AppText
                  styleText={{
                    fontSize: 15,
                    paddingRight: 10,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  ->
                </AppText>
              )}
              {item.category === category && (
                <AppText
                  styleText={{
                    fontSize: 20,
                    fontWeight: "bold",
                    fontSize: TextSize.NormalText,
                  }}
                >
                  {item.title}
                </AppText>
              )}
            </View>
          ))}
        </View>
      </Modal>
    </View>
  );
}
