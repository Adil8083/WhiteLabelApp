import React from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import AccountItems from "../components/AccountItems";
import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";

const AccountScreen = () => {
  return (
    <Screen>
      <ListItem
        title="James"
        subTitle="jamesbond007@gmail.com"
        image={require("../../assets/profile.jpg")}
      />
      <AccountItems
        title="Settings"
        icon={
          <MaterialIcons
            name="settings"
            size={TextSize.iconSize}
            color={Theme.spareColor}
          />
        }
        onPress={() => console.log("Settings")}
      />
      <AccountItems
        title="Log Out"
        icon={
          <MaterialCommunityIcons
            name="logout"
            size={TextSize.iconSize}
            color={Theme.spareColor}
          />
        }
        onPress={() => console.log("Log Out")}
      />
    </Screen>
  );
};

export default AccountScreen;
