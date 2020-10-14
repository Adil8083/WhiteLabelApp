import React from "react";
import {
  View,
  StyleSheet,
  text,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import TextSize from "../constants/TextSize";
import { Theme } from "../constants/Theme";
import AppText from "./AppText";
import FbDescriptionCard from "./FbDescriptionCard";
import GradiantButton from "./GradiantButton";

const win = Dimensions.get("window");
const ratio = win.width / 1080;
const FacebookHelpModal = ({ toggle }) => {
  return (
    <Modal
      isVisible
      onBackButtonPress={() => toggle(false)}
      onBackdropPress={() => toggle(false)}
    >
      <View style={styles.container}>
        <AppText
          children="How to add Facebook Account/Page Path"
          styleText={{
            fontSize: TextSize.SubHeading,
            color: Theme.lightColor,
            fontWeight: "bold",
            alignSelf: "center",
          }}
        />
        <View style={{ marginTop: 10, height: 400 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <AppText
              children="Add Account Path:"
              styleText={{
                fontSize: TextSize.NormalText,
                color: Theme.lightColor,
                fontWeight: "bold",
                marginTop: 10,
              }}
            />
            <AppText
              children="Open your Facbook app, sign in your account"
              styleText={{
                color: Theme.lightGrey,
                marginTop: 10,
              }}
            />
            <FbDescriptionCard
              Description="Tap on icon in upper right corner of the screen like the selected icon of the below picture"
              image={require("../../assets/FbAccount_1.jpg")}
              win={win}
              height={286}
              ratio={ratio}
            />
            <FbDescriptionCard
              Description="Then tap on your profile name in the upper left part of the screen"
              image={require("../../assets/FbAccount_2.jpg")}
              win={win}
              height={442}
              ratio={ratio}
            />
            <FbDescriptionCard
              Description="Tap on icon placed right after add to story button"
              image={require("../../assets/FbAccount_3.jpg")}
              win={win}
              height={471}
              ratio={ratio}
            />
            <FbDescriptionCard
              Description="Tap on 'copy link' button in the bottom of the screen"
              image={require("../../assets/FbAccount_4.jpg")}
              win={win}
              height={370}
              ratio={ratio}
            />
            <AppText
              children="Add Page Path:"
              styleText={{
                fontSize: TextSize.NormalText,
                color: Theme.lightColor,
                fontWeight: "bold",
                marginTop: 18,
              }}
            />
            <AppText
              children="After Signing in perform first step same as given in add account part"
              styleText={{
                color: Theme.lightGrey,
                marginTop: 5,
              }}
            />
            <FbDescriptionCard
              Description="Then tap on Page icon"
              image={require("../../assets/FbPage_1.jpg")}
              win={win}
              height={700}
              ratio={ratio}
            />
            <FbDescriptionCard
              Description="Then tap on Search icon in the right upper corner of the screen "
              image={require("../../assets/FbPage_2.jpg")}
              win={win}
              height={500}
              ratio={ratio}
            />
            <FbDescriptionCard
              Description="Type your page name in the search bar"
              image={require("../../assets/FbPage_3.jpg")}
              win={win}
              height={403}
              ratio={ratio}
            />
            <FbDescriptionCard
              Description="Tap on share icon in the right upper corner of the screen"
              image={require("../../assets/FbPage_4.jpg")}
              win={win}
              height={910}
              ratio={ratio}
            />
            <FbDescriptionCard
              Description="Copy link"
              image={require("../../assets/FbPage_5.jpg")}
              win={win}
              height={780}
              ratio={ratio}
            />
          </ScrollView>
        </View>
        <GradiantButton
          title="Close"
          onPress={() => toggle(false)}
          styleButton={{ marginTop: 10 }}
        />
      </View>
    </Modal>
  );
};

export default FacebookHelpModal;
const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.secondary,
    borderRadius: 10,
    shadowColor: Theme.darkColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    padding: 15,
    elevation: 10,
  },
});
