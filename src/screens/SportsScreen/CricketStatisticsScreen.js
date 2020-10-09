import React, { useState, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  ScrollView,
  View,
  scrollView,
} from "react-native";
import Modal from "react-native-modal";
import * as Yup from "yup";

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import CricketTournamentCard from "../../components/CricketTournamentCard";
import cricket_tournaments from "../../constants/CricketTournamentsList";
import SubmitButton from "../../components/forms/SubmitButton";
import Screen from "../../components/Screen";
import GradiantButton from "../../components/GradiantButton";
import { Theme } from "../../constants/Theme";
import Header from "../../components/Header";
import SubHeading from "../../components/SubHeading";
import AppDropDownPicker from "../../components/forms/AppDropDownPicker";
const validationSchema = Yup.object().shape({
  tournament: Yup.string().required().label("Tournament"),
  total_matches: Yup.string().required().label("Total Matches"),
  average_score: Yup.string().required().label("Average score"),
  average_wickets: Yup.string().required().label("Average wickets"),
});

const CricketStatisticsScreen = ({ navigation }) => {
  const scrollView = useRef();
  const [modalvisible, setModalVisible] = useState(false);
  const [cricketTournament, setCricketTournament] = useState([]);

  const handledelete = (item) => {
    const newArray = cricketTournament.filter((t) => t.id !== item.id);
    setCricketTournament(newArray);
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
                total_matches: "",
                average_score: "",
                average_wickets: "",
              }}
              onSubmit={({
                tournament,
                total_matches,
                average_score,
                average_wickets,
              }) => {
                setModalVisible(false);
                setCricketTournament([
                  ...cricketTournament,
                  {
                    id: cricketTournament.length + 1,
                    tournament: tournament,
                    total_matches: total_matches,
                    average_score: average_score,
                    average_wickets: average_wickets,
                  },
                ]);
              }}
              validationSchema={validationSchema}
            >
              <AppDropDownPicker
                items={cricket_tournaments}
                name="tournament"
                placeholder="Enter Tournament Name"
              />
              <AppFormField
                name="total_matches"
                placeholder="Enter total matches played"
              />
              <AppFormField
                name="average_score"
                placeholder="Enter average score"
              />
              <AppFormField
                name="average_wickets"
                placeholder="Enter average wickets taken"
              />
              <SubmitButton title="Post" />
            </AppForm>
          </ScrollView>
        </View>
      </Modal>
      {/* <FlatList
          data={cricketTournament}
          keyExtractor={(tournament) => tournament.id.toString()}
          renderItem={({ item }) => {
            return (
              <CricketTournamentCard
              tournament={item.tournament}
              matches={item.total_matches}
              score={item.average_score}
              wickets={item.average_wickets}
              onPress={() => handledelete(item)}
              />
              );
            }}
          /> */}
      <ScrollView ref={scrollView}>
        <View style={{ height: "90%", marginBottom: 10 }}>
          {cricketTournament.map((item) => (
            <CricketTournamentCard
              key={item.id}
              tournament={item.tournament}
              matches={item.total_matches}
              score={item.average_score}
              wickets={item.average_wickets}
              onPress={() => handledelete(item)}
            />
          ))}
        </View>
      </ScrollView>
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

export default CricketStatisticsScreen;
