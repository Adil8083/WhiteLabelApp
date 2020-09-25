import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, ScrollView, View } from "react-native";
import * as Yup from "yup";

import AppButton from "../../../components/AppButton";
import AppForm from "../../../components/forms/AppForm";
import AppFormField from "../../../components/forms/AppFormField";
import CricketTournamentCard from "../../../components/CricketTournamentCard";
import Heading from "../../../components/Heading";
import SubmitButton from "../../../components/forms/SubmitButton";
import Screen from "../../../components/Screen";
import Title from "../../../components/Title";

const validationSchema = Yup.object().shape({
  tournament: Yup.string().required().label("Tournament"),
  total_matches: Yup.string().required().label("Total Matches"),
  average_score: Yup.string().required().label("Average score"),
  average_wickets: Yup.string().required().label("Average wickets"),
});
const validationSchema2 = Yup.object().shape({
  tournament: Yup.string().required().label("Tournament"),
  total_matches: Yup.string().required().label("Total Matches"),
  club: Yup.string().required().label("Club"),
  goals: Yup.string().required().label("Goals"),
});

const tournaments = [
  {
    id: 1,
    name: "World Cup",
    total_matches: "2",
    average_score: "123",
    average_wickets: "5",
  },
  {
    id: 2,
    name: "Test Cricket",
    total_matches: "2",
    average_score: "123",
    average_wickets: "5",
  },
];

const StatisticsScreen = () => {
  const [modalvisible, setModalVisible] = useState(false);
  const [modalvisible2, setModalVisible2] = useState(false);
  const [tournament, setTournament] = useState(tournaments);

  const handledelete = (item) => {
    const newArray = tournament.filter((t) => t.id !== item.id);
    setTournament(newArray);
  };

  return (
    <Screen>
      <Heading title="Statistics" onPress={() => setModalVisible2(true)} />
      <Modal visible={modalvisible} animationType="slide">
        <Screen style={{ padding: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppForm
              initialValues={{
                tournament: "",
                total_matches: "",
                average_score: "",
                average_wickets: "",
              }}
              onSubmit={(values) => console.log(values)}
              validationSchema={validationSchema}
            >
              <Title name="Tournament" style={styles.heading} />
              <AppFormField
                name="tournament"
                placeholder="Enter Tournament Name"
              />
              <Title name="Total Matches" style={styles.heading} />
              <AppFormField
                name="total_matches"
                placeholder="Enter total matches played"
              />
              <Title name="Average Score" style={styles.heading} />
              <AppFormField
                name="average_score"
                placeholder="Enter average score"
              />
              <Title name="Average Wickets" style={styles.heading} />
              <AppFormField
                name="average_wickets"
                placeholder="Enter average wickets taken"
              />
              <SubmitButton title="Post" />
            </AppForm>
            <AppButton
              title="Close"
              onPress={() => setModalVisible(false)}
              color="secondary"
            />
          </ScrollView>
        </Screen>
      </Modal>
      <Modal visible={modalvisible2} animationType="slide">
        <Screen style={{ padding: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppForm
              initialValues={{
                tournament: "",
                total_matches: "",
                club: "",
                goals: "",
              }}
              onSubmit={(values) => console.log(values)}
              validationSchema={validationSchema2}
            >
              <Title name="Tournament" style={styles.heading} />
              <AppFormField
                name="tournament"
                placeholder="Enter Tournament Name"
              />
              <Title name="Total Matches" style={styles.heading} />
              <AppFormField
                name="total_matches"
                placeholder="Enter total matches played"
              />
              <Title name="Club" style={styles.heading} />
              <AppFormField name="club" placeholder="Enter club name" />
              <Title name="Goals" style={styles.heading} />
              <AppFormField name="goals" placeholder="Enter goals" />
              <SubmitButton title="Post" />
            </AppForm>
            <AppButton
              title="Close"
              onPress={() => setModalVisible2(false)}
              color="secondary"
            />
          </ScrollView>
        </Screen>
      </Modal>

      <View>
        <FlatList
          data={tournament}
          keyExtractor={(tournament) => tournament.id.toString()}
          renderItem={({ item }) => {
            return (
              <ScrollView>
                <CricketTournamentCard
                  tournament={item.name}
                  matches={item.total_matches}
                  score={item.average_score}
                  wickets={item.average_wickets}
                  onPress={() => handledelete(item)}
                />
              </ScrollView>
            );
          }}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
  },
});

export default StatisticsScreen;
