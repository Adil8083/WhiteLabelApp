import React from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Fontisto,
} from "@expo/vector-icons";

import AccountItems from "../components/AccountItems";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";
import useAuth from "../auth/useAuth";
import { SCREENS } from "../constants/Screens";

const AccountScreen = ({ navigation }) => {
  const { user, logOut } = useAuth();

  return (
    <Screen>
      <ListItem
        title={user.name}
        subTitle={user.email}
        IconComponent={
          <Fontisto
            name={user.gender.toLowerCase()}
            size={40}
            color={Theme.spareColor}
          />
        }
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
        onPress={() => navigation.navigate(SCREENS.Settings)}
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
        onPress={() => logOut()}
      />
    </Screen>
  );
};

export default AccountScreen;
