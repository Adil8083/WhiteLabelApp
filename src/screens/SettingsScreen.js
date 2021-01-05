import React from "react";
import { AntDesign } from "@expo/vector-icons";

import AccountItems from "../components/AccountItems";
import Header from "../components/Header";
import Screen from "../components/Screen";
import SubHeading from "../components/SubHeading";
import { Theme } from "../constants/Theme";
import { SCREENS } from "../constants/Screens";
import TextSize from "../constants/TextSize";

const SettingsScreen = ({ navigation }) => {
  return (
    <Screen>
      <Header isBack={true} navigation={navigation} text="Criação" />
      <SubHeading title="Settings" />
      <AccountItems
        title="Change Password"
        icon={
          <AntDesign
            name="lock"
            color={Theme.spareColor}
            size={TextSize.iconSize}
          />
        }
        onPress={() => navigation.navigate(SCREENS.ChangePasswordScreen)}
      />
    </Screen>
  );
};

export default SettingsScreen;
