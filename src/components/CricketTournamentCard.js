import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const CricketTournamentCard = ({
  tournament,
  matches,
  score,
  wickets,
  onPress,
}) => {
  return (
    <View style={{ padding: 10 }}>
      <View style={styles.container2}>
        <Text style={styles.title}>{tournament}</Text>
        <TouchableOpacity onPress={onPress}>
          <MaterialCommunityIcons name="trash-can-outline" size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>Matches</Text>
        <Text style={styles.heading}>Score</Text>
        <Text style={styles.heading}>Wickets</Text>
      </View>
      <View style={styles.container}>
        <Text>{matches}</Text>
        <Text>{score}</Text>
        <Text>{wickets}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontSize: 15,
    backgroundColor: colors.light,
  },
  container2: {
    flexDirection: "row",
    backgroundColor: colors.light,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    flex: 1,
  },
});

export default CricketTournamentCard;
