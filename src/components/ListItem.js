import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "../constants/Theme";
import TextSize from "../constants/TextSize";

function ListItem({ title, subTitle, image, IconComponent, onPress }) {
  return (
    <TouchableHighlight underlayColor={"red"} onPress={onPress}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subTitle && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: Theme.secondary,
    borderRadius: 10,
    height: 80,
    width: "100%",
    marginTop: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: Theme.textColor,
    fontSize: TextSize.SubHeading,
  },
  title: {
    fontWeight: "500",
    fontSize: TextSize.Heading,
    color: Theme.lightColor,
  },
});

export default ListItem;
