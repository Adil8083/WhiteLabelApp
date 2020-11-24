import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
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
import useAuth from "../../auth/useAuth";
import * as StatisticsApi from "../../api/StatisticsApi";
import { SCREENS } from "../../constants/Screens";

const validationSchema = Yup.object().shape({
  tournament: Yup.string().required().label("Tournament"),
  total_matches: Yup.string().required().label("Total Matches"),
  club: Yup.string().label("Club"),
  total_goals: Yup.string().required().label("Goals"),
});

const FootballStatisticsScreen = ({ navigation }) => {
  const scrollView = useRef();
  const [modalvisible, setModalVisible] = useState(false);
  const [footballTournament, setFootballTournament] = useState([]);
  const [tournament, setTournament] = useState();
  const [attempFailed, setAttemptFailed] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    getStatistics();
  }, []);
  const getStatistics = async () => {
    setAttemptFailed(true);
    const response = await StatisticsApi.read(user);
    if (!response.ok) {
      Alert.alert("Error", "Unable to load statistics.", [
        {
          text: "Retry",
          onPress: () => getStatistics(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      setAttemptFailed(false);
      return;
    }
    setFootballTournament(response.data);
    setAttemptFailed(false);
  };

  const handledelete = (item) => {
    Alert.alert("Delete", "Are you sure you want to delete this statistic?", [
      {
        text: "Yes",
        onPress: async () => {
          setAttemptFailed(true);
          const response = await StatisticsApi.del(item.identifier, user);
          if (!response.ok) {
            Alert.alert("Error", "Unable to  delete statistic.", [
              {
                text: "Retry",
                onPress: () => handledelete(item),
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ]);
            setAttemptFailed(false);
            return;
          }
          const newArray = footballTournament.filter(
            (t) => t.identifier !== item.identifier
          );
          setFootballTournament(newArray);
          setAttemptFailed(false);
        },
      },
      {
        text: "No",
      },
    ]);
  };

  const handleSubmit = async ({
    tournament,
    club,
    total_matches,
    total_goals,
  }) => {
    setAttemptFailed(true);
    let id = footballTournament.length + 1;

    let object = {
      identifier: id.toString(),
      tournament: tournament,
      total_matches: total_matches,
      total_goals: total_goals,
    };
    if (club) {
      object = { ...object, club: club };
    }
    const response = await StatisticsApi.add(object, user);

    if (!response.ok) {
      Alert.alert("Error", "Unable to add statistic.", [
        {
          text: "Retry",
          onPress: () => handleSubmit(),
        },
        {
          text: "Cancel",
          onPress: () => setModalVisible(false),
          style: "cancel",
        },
      ]);
      setAttemptFailed(false);
      return;
    }
    setFootballTournament([...footballTournament, response.data]);
    setModalVisible(false);
    setAttemptFailed(false);
  };

  return (
    <Screen>
      <Header isBack navigation={navigation} text="Criação" />
      <ActivityIndicator animating={attempFailed} color={Theme.spareColor} />
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
                total_matches: "",
                total_goals: "",
              }}
              onSubmit={handleSubmit}
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
                name="total_matches"
                keyboardType="number-pad"
                placeholder="Enter total matches played"
              />
              <AppFormField
                name="total_goals"
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
            <View key={item.identifier}>
              <FootballTournamentCard
                tournament={item.tournament}
                club={item.club}
                matches={item.total_matches}
                goals={item.total_goals}
                onPress={() => handledelete(item)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <GradiantButton
        title="Next"
        onPress={() => navigation.navigate(SCREENS.GenerateApk)}
      />
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
