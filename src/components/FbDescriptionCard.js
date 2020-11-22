import React from "react";
import { View, Image } from "react-native";
import { Theme } from "../constants/Theme";
import AppText from "./AppText";

const FbDescriptionCard = ({ Description, image, win, height, ratio }) => {
  return (
    <>
      <AppText
        children={Description}
        styleText={{
          color: Theme.lightGrey,
          marginTop: 10,
        }}
      />
      {image && (
        <Image
          source={image}
          style={{
            width: "100%",
            height: height * ratio,
            borderRadius: 10,
            marginTop: 10,
          }}
        />
      )}
    </>
  );
};

export default FbDescriptionCard;
