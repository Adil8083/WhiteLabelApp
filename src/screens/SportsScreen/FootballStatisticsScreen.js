import React, { useState } from "react";
import { FlatList, StyleSheet, ScrollView, View } from "react-native";
import Modal from "react-native-modal";
import * as Yup from "yup";

import AppDropDownPicker from "../../components/forms/AppDropDownPicker";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import FootballTournamentCard from "../../components/FootballTournamentCard";
import football_tournaments from "../../constants/FootballTournamentsList";
import GradiantButton from "../../components/GradiantButton";
import Header from "../../components/Header";
import SubmitButton from "../../components/forms/SubmitButton";
import SubHeading from "../../components/SubHeading";
import Screen from "../../components/Screen";
import { Theme } from "../../constants/Theme";

const validationSchema = Yup.object().shape({
  tournament: Yup.string().required().label("Tournament"),
  matches: Yup.string().required().label("Total Matches"),
  club: Yup.string().required().label("Club"),
  goals: Yup.string().required().label("Goals"),
});

const FootballStatisticsScreen = ({ navigation }) => {
  const [modalvisible, setModalVisible] = useState(false);
  const [footballTournament, setFootballTournament] = useState([]);

  const handledelete = (item) => {
    const newArray = footballTournament.filter((t) => t.id !== item.id);
    setFootballTournament(newArray);
  };

  return (
    <Screen>
      <Header isback navigation={navigation} text="Criação" />
      <SubHeading
        title="Add Statistics"
        onPress={() => setModalVisible(true)}
      />
      <Modal
        coverScreen
        visible={modalvisible}
        animationType="slide"
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AppForm
              initialValues={{
                tournament: "",
                club: "",
                matches: "",
                goals: "",
              }}
              onSubmit={({ tournament, club, matches, goals }) => {
                setModalVisible(false);
                setFootballTournament([
                  ...footballTournament,
                  {
                    id: footballTournament.length + 1,
                    tournament: tournament,
                    club: club,
                    matches: matches,
                    goals: goals,
                  },
                ]);
              }}
              validationSchema={validationSchema}
            >
              <AppDropDownPicker
                items={football_tournaments}
                name="tournament"
                placeholder="Enter Tournament Name"
              />
              <AppFormField name="club" placeholder="Enter club name" />
              <AppFormField
                name="matches"
                placeholder="Enter total matches played"
              />
              <AppFormField name="goals" placeholder="Enter goals" />
              <SubmitButton title="Post" />
            </AppForm>
          </ScrollView>
        </View>
      </Modal>
      <View>
        <FlatList
          data={footballTournament}
          keyExtractor={(tournament) => tournament.id.toString()}
          renderItem={({ item }) => {
            return (
              <ScrollView>
                <FootballTournamentCard
                  tournament={item.tournament}
                  club={item.club}
                  matches={item.matches}
                  goals={item.goals}
                  onPress={() => handledelete(item)}
                />
              </ScrollView>
            );
          }}
        />
      </View>
      <GradiantButton title="Next" onPress={() => console.log("Hello")} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.lightColor,
    borderRadius: 15,
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 20,
  },
});

export default FootballStatisticsScreen;
