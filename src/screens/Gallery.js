import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Theme } from "../constants/Theme";
import Header from "../components/Header";
import ImageComponent from "../components/ImageComponent";
import AppText from "../components/AppText";
import TextSize from "../constants/TextSize";
import { MaterialIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import GradiantButton from "../components/GradiantButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Gallery({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState();
  const openModal = () => {
    setModalVisible(true);
  };

  const onChangeImage = (uri) => {
    setImageUri(uri);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Header isBack navigation={navigation} text="Criação" />
        <View
          style={{
            backgroundColor: Theme.secondary,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <AppText
            styleText={{
              color: Theme.textColor,
              fontSize: TextSize.SubHeading,
            }}
          >
            Make Your Own Gallery
          </AppText>
          <TouchableWithoutFeedback onPress={openModal}>
            <MaterialIcons
              name="add"
              size={30}
              color={Theme.iconColor}
              style={styles.touch}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.Imagecontainer}>
          {!imageUri && (
            <MaterialCommunityIcons name="camera" size={40} color="grey" />
          )}
          {imageUri && (
            <Image
              source={{ uri: imageUri }}
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
            />
          )}
        </View>
      </View>
      <Modal
        coverScreen={true}
        isVisible={isModalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: Theme.lightColor,
            padding: 10,
            borderRadius: 10,
            shadowColor: Theme.darkColor,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            elevation: 10,
            alignItems: "center",
          }}
        >
          <AppText
            styleText={{
              color: Theme.darkColor,
              fontSize: TextSize.SubHeading,
              marginBottom: 8,
            }}
          >
            Select Image
          </AppText>
          <ImageComponent imageUri={imageUri} onChangeImage={onChangeImage} />
          <GradiantButton title="Add" styleButton={{ width: "40%" }} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Theme.primary,
  },
  Imagecontainer: {
    borderRadius: 10,
    backgroundColor: Theme.lightColor,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: Theme.darkColor,
    elevation: 10,
    width: 100,
    height: 100,
    justifyContent: "center",
  },
});

export default Gallery;
