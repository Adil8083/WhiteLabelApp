import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import * as Yup from "yup";

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AchievementCard from "../../components/AchievementCard";
import GradiantButton from "../../components/GradiantButton";
import Header from "../../components/Header";
import SubmitButton from "../../components/forms/SubmitButton";
import Screen from "../../components/Screen";
import { SCREENS } from "../../constants/Screens";
import { Theme } from "../../constants/Theme";
import TextSize from "../../constants/TextSize";
import Title from "../../components/Title";

const validationSchema = Yup.object().shape({
  achievement: Yup.string().required().label("Achievement"),
  year: Yup.string().max(4).label("Year"),
});

const achievements = [];

const SportsAchievementsScreen = ({ navigation }) => {
  const [achievement, setAchievement] = useState(achievements);
  const [modalvisible, setModalVisible] = useState(false);

  const handledelete = (item) => {
    const newArray = achievement.filter((a) => a.id !== item.id);
    setAchievement(newArray);
  };

  return (
    <Screen>
      <Header isback navigation={navigation} text="Achievements" />
      <GradiantButton
        title="Add Achievement"
        style={styles.button}
        onPress={() => setModalVisible(true)}
      />
      <Modal visible={modalvisible} animationType="slide">
        <Screen>
          <View style={styles.container}>
            <Text style={styles.note}>
              Note : If no achievements yet, add N/A
            </Text>
            <AppForm
              initialValues={{ achievement: "", year: "" }}
              onSubmit={({ achievement, year }) => {
                setModalVisible(false);
                achievements.push({
                  id: achievements.length + 1,
                  title: achievement,
                  year: year,
                });
              }}
              validationSchema={validationSchema}
            >
              <Title name="Achievement" />
              <AppFormField
                autoCapitalize="words"
                autoCorrect={false}
                name="achievement"
                placeholder="Achievement"
              />
              <Title name="Year" />
              <AppFormField
                autoCapitalize="none"
                autoCorrect={false}
                name="year"
                placeholder="Year of achievement"
                keyboardType="number-pad"
              />
              <SubmitButton title="Add" />
            </AppForm>
            <GradiantButton
              title="Close"
              onPress={() => setModalVisible(false)}
              color="secondary"
            />
          </View>
        </Screen>
      </Modal>
      <View>
        <FlatList
          data={achievement}
          keyExtractor={(achievement) => achievement.id.toString()}
          renderItem={({ item }) => {
            return (
              <AchievementCard
                title={item.title}
                year={item.year}
                onPress={() => handledelete(item)}
              />
            );
          }}
        />
      </View>
      <GradiantButton
        title="Next"
        onPress={() => navigation.navigate(SCREENS.Statistics)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 15,
  },
  container: {
    backgroundColor: Theme.secondary,
    borderRadius: 15,
    margin: 10,
    padding: 10,
  },
  note: {
    color: "yellow",
    margin: 10,
    fontStyle: "italic",
    fontSize: TextSize.NormalText,
  },
});

export default SportsAchievementsScreen;
