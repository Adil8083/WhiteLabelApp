import React, { useState, useRef } from "react";
import { StyleSheet, ScrollView, View, Alert, FlatList } from "react-native";
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
  club: Yup.string().label("Club"),
  goals: Yup.string().required().label("Goals"),
});

const FootballStatisticsScreen = ({ navigation }) => {
  const scrollView = useRef();
  const [modalvisible, setModalVisible] = useState(false);
  const [footballTournament, setFootballTournament] = useState([]);
  const [tournament, setTournament] = useState();

  const handledelete = (item) => {
    Alert.alert("Delete", "Are you sure you want to delete this statistic?", [
      {
        text: "Yes",
        onPress: () => {
          const newArray = footballTournament.filter((t) => t.id !== item.id);
          setFootballTournament(newArray);
        },
      },
      {
        text: "No",
      },
    ]);
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
                {
                  if (club) {
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
                  } else {
                    setFootballTournament([
                      ...footballTournament,
                      {
                        id: footballTournament.length + 1,
                        tournament: tournament,
                        matches: matches,
                        goals: goals,
                      },
                    ]);
                  }
                }
              }}
              validationSchema={validationSchema}
            >
              <AppDropDownPicker
                items={football_tournaments}
                name="tournament"
                placeholder="Enter Tournament Name"
                onSelectItem={(value) => setTournament(value)}
              />
              {tournament == "UEFA European Championship" ||
              tournament == "UEFA Europa League" ||
              tournament == "Africa Cup of Nations" ? (
                <AppFormField name="club" placeholder="Enter club name" />
              ) : null}

              <AppFormField
                name="matches"
                keyboardType="number-pad"
                placeholder="Enter total matches played"
              />
              <AppFormField
                name="goals"
                keyboardType="number-pad"
                placeholder="Enter goals"
              />
              <SubmitButton title="Post" />
            </AppForm>
          </ScrollView>
        </View>
      </Modal>
      <View style={{ width: "100%", height: 300 }}>
        <ScrollView
          ref={scrollView}
          onContentSizeChange={() => scrollView.current.scrollToEnd()}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {footballTournament.map((item) => (
            <View key={item.id}>
              <FootballTournamentCard
                tournament={item.tournament}
                club={item.club}
                matches={item.matches}
                goals={item.goals}
                onPress={() => handledelete(item)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <GradiantButton title="Next" onPress={() => console.log(tournament)} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.secondary,
    borderRadius: 15,
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 20,
  },
});

export default FootballStatisticsScreen;
