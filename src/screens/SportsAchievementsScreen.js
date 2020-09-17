import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import Card from "../components/Card";

const achievementsArray = [
  {
    value: 1,
    title: "Best Runner",
  },
  {
    value: 2,
    title: "Best person",
  },
];

const SportsAchievementsScreen = () => {
  const [achievements, setAchievements] = useState(achievementsArray);
  const handledelete = (achievement) => {
    const newArray = achievements.filter((m) => m.value !== achievement.value);
    {
      console.log(newArray);
    }
    setAchievements(newArray);
  };

  return (
    <Screen>
      <AppText style={styles.title}>Achievements</AppText>
      <View style={styles.container}>
        <AppText style={styles.heading}>Add Achievements</AppText>
        <TouchableOpacity onPress={() => console.log("add")}>
          <MaterialCommunityIcons name="plus" size={35} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={achievements}
        keyExtractor={(achievement) => achievement.value.toString()}
        renderItem={({ item }) => {
          return <Card title={item.title} onPress={handledelete} />;
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.medium,
  },
  heading: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: 5,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    width: 150,
    height: 150,
    marginTop: 50,
  },
});

export default SportsAchievementsScreen;
