import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";

const FootballTournamentCard = ({
  tournament,
  club,
  matches,
  goals,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={[styles.subheading, { flex: 1 }]}>{tournament}</Text>
        <TouchableWithoutFeedback onPress={onPress}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={30}
            color={Theme.spareColor}
          />
        </TouchableWithoutFeedback>
      </View>
      {club && (
        <View style={styles.container3}>
          <Text style={styles.club}>{club}</Text>
        </View>
      )}

      <View style={styles.container3}>
        <Text style={styles.subheading}>Matches</Text>
        <Text style={styles.subheading}>Goals</Text>
      </View>
      <View style={styles.container3}>
        <Text style={styles.text}>{matches}</Text>
        <Text style={styles.text}>{goals}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.secondary,
    borderRadius: 15,
    margin: 10,
  },
  container2: {
    flexDirection: "row",
    padding: 10,
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  club: {
    color: Theme.textColor,
    fontSize: TextSize.Heading,
  },
  subheading: {
    color: Theme.textColor,
    fontSize: TextSize.SubHeading,
    fontWeight: "bold",
  },
  text: {
    color: Theme.textColor,
    fontSize: TextSize.NormalText,
  },
});

export default FootballTournamentCard;
