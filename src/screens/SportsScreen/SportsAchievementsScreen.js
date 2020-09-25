import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, Text } from "react-native";
import * as Yup from "yup";

import AppButton from "../../components/AppButton";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AchievementCard from "../../components/AchievementCard";
import Heading from "../../components/Heading";
import SubmitButton from "../../components/forms/SubmitButton";
import Screen from "../../components/Screen";

const validationSchema = Yup.object().shape({
  achievement: Yup.string().required().label("Achievement"),
});

const achievements = [
  {
    id: 1,
    title: "Best Runner",
  },
  {
    id: 2,
    title: "Best person",
  },
];

const SportsAchievementsScreen = ({ navigation }) => {
  const [achievement, setAchievement] = useState(achievements);
  const [modalvisible, setModalVisible] = useState(false);

  const handledelete = (item) => {
    const newArray = achievement.filter((a) => a.id !== item.id);
    {
      console.log(newArray);
    }
    setAchievement(newArray);
  };

  return (
    <Screen>
      <Heading title="Achievements" onPress={() => setModalVisible(true)} />
      <Modal visible={modalvisible} animationType="slide">
        <Screen style={styles.container}>
          <Text style={styles.note}>
            Note : If no achievements yet, add N/A
          </Text>
          <AppForm
            initialValues={{ achievement: "" }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize="words"
              autoCorrect={false}
              icon="keyboard"
              name="achievement"
              placeholder="Achievement"
            />
            <SubmitButton title="Add" />
          </AppForm>
          <AppButton
            title="close"
            onPress={() => setModalVisible(false)}
            color="secondary"
          />
        </Screen>
      </Modal>
      <FlatList
        data={achievement}
        keyExtractor={(achievement) => achievement.id.toString()}
        renderItem={({ item }) => {
          return (
            <AchievementCard
              title={item.title}
              onPress={() => handledelete(item)}
            />
          );
        }}
      />
      <AppButton
        title="Next"
        onPress={() => navigation.navigate("Add Statistics")}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
  },
  note: {
    marginLeft: 5,
    fontStyle: "italic",
  },
});

export default SportsAchievementsScreen;
