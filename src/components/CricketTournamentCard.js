import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "../constants/Theme";

const CricketTournamentCard = ({
  tournament,
  matches,
  score,
  wickets,
  onPress,
}) => {
  return (
    <View style={{ padding: 10, borderRadius: 5 }}>
      <View style={styles.container2}>
        <Text style={styles.title}>{tournament}</Text>
        <TouchableOpacity onPress={onPress}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={25}
            color={Theme.lightColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Matches</Text>
        <Text style={styles.heading}>Score</Text>
        <Text style={styles.heading}>Wickets</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.result}>{matches}</Text>
        <Text style={styles.result}>{score}</Text>
        <Text style={styles.result}>{wickets}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 15,
    backgroundColor: Theme.secondary,
  },
  container2: {
    flexDirection: "row",
    backgroundColor: Theme.secondary,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: Theme.textColor,
  },
  result: {
    color: "yellow",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    flex: 1,
    color: Theme.textColor,
  },
});

export default CricketTournamentCard;
