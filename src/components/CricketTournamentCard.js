import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";

const CricketTournamentCard = ({
  tournament,
  matches,
  score,
  wickets,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.heading}>{tournament}</Text>
        <TouchableWithoutFeedback onPress={onPress}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={30}
            color={Theme.iconColor}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.container3}>
        <Text style={styles.subheading}>Matches</Text>
        <Text style={styles.subheading}>Avg. Score</Text>
        <Text style={styles.subheading}>Avg. Wickets</Text>
      </View>
      <View style={styles.container3}>
        <Text style={styles.text}>{matches}</Text>
        <Text style={styles.text}>{score}</Text>
        <Text style={styles.text}>{wickets}</Text>
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
  heading: {
    color: Theme.textColor,
    fontSize: TextSize.Heading,
    flex: 1,
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

export default CricketTournamentCard;
