import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

function Cards({ title, subtitle, image }) {
  return (
    <View style={styles.card}>
      {console.log(title)}
      <Image source={image} style={styles.cardImage} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    marginBottom: 30,
  },
  cardImage: {
    borderRadius: 14,
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 16,
    fontFamily: "Roboto",
    top: 10,
    left: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "dodgerblue",
    fontWeight: "bold",
    fontFamily: "Roboto",
    top: 15,
    left: 10,
  },
});
export default Cards;
