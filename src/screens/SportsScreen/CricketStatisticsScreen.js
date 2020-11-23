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

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import CricketTournamentCard from "../../components/CricketTournamentCard";
import SubmitButton from "../../components/forms/SubmitButton";
import Screen from "../../components/Screen";
import GradiantButton from "../../components/GradiantButton";
import { Theme } from "../../constants/Theme";
import Header from "../../components/Header";
import SubHeading from "../../components/SubHeading";
import AppDropDownPicker from "../../components/forms/AppDropDownPicker";
import { SCREENS } from "../../constants/Screens";
import * as StatisticsApi from "../../api/StatisticsApi";
import useAuth from "../../auth/useAuth";
import client from "../../api/client";

const validationSchema = Yup.object().shape({
  tournament: Yup.string().required().label("Tournament"),
  total_matches: Yup.string().required().label("Total Matches"),
  average_score: Yup.string().required().label("Average score"),
  average_wickets: Yup.string().required().label("Average wickets"),
});

const CricketStatisticsScreen = ({ navigation }) => {
  const scrollView = useRef();
  const { user } = useAuth();
  const [modalvisible, setModalVisible] = useState(false);
  const [cricketTournament, setCricketTournament] = useState([]);
  const [attempFailed, setAttemptFailed] = useState(false);
  const [cricket_tournaments, setCricket_tournaments] = useState([]);

  useEffect(() => {
    getStatistics();
  }, []);

  const getStatistics = async () => {
    setAttemptFailed(true);
    const response = await StatisticsApi.read(user);
    if (!response.ok) {
      Alert.alert("Attention", "Unable to load statistics.", [
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
    setCricketTournament(response.data);
    setAttemptFailed(false);
  };

  const handleSubmit = async ({
    tournament,
    total_matches,
    average_score,
    average_wickets,
  }) => {
    setAttemptFailed(true);
    let id = cricketTournament.length + 1;
    const response = await StatisticsApi.add(
      {
        identifier: id.toString(),
        tournament: tournament,
        total_matches: total_matches,
        average_score: average_score,
        average_wickets: average_wickets,
      },
      user
    );

    if (!response.ok) {
      Alert.alert("Error", "Unable to add statistic.", [
        {
          text: "Retry",
          onPress: () => handleSubmit(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      setAttemptFailed(false);
      return;
    }
    setModalVisible(false);
    setAttemptFailed(false);
    setCricketTournament([...cricketTournament, response.data]);
  };
  const getCrickTournament = async () => {
    let Response = await client.get("/cricket/get");
    if (!Response.ok) {
      Alert.alert("Attention", "Unable to Load Cricket Data", [
        {
          text: "Retry",
          onPress: () => AsynFunc(),
        },
        { text: "Cancel" },
      ]);
      return;
    }
    setCricket_tournaments(Response.data);
  };
  useEffect(() => {
    getCrickTournament();
  }, []);
  const handledelete = (item) => {
    Alert.alert("Delete", "Are you sure you want to delete this statistic?", [
      {
        text: "Yes",
        onPress: async () => {
          setAttemptFailed(true);
          const response = await StatisticsApi.del(item.identifier, user);
          if (!response.ok) {
            Alert.alert("Error", "Could not delete statistic.", [
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
          const newArray = cricketTournament.filter(
            (t) => t.identifier !== item.identifier
          );
          setCricketTournament(newArray);
          setAttemptFailed(false);
        },
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <Screen>
      <Header isBack navigation={navigation} text="Criação" />
      <ActivityIndicator animating={attempFailed} color={Theme.spareColor} />
      <ScrollView>
        <SubHeading
          title="Add Statistics"
          onPress={() => setModalVisible(true)}
        />
        <View style={{ width: "100%", height: 300 }}>
          <ScrollView
            ref={scrollView}
            onContentSizeChange={() => scrollView.current.scrollToEnd()}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            {cricketTournament.map((item) => (
              <View key={item.identifier}>
                <CricketTournamentCard
                  tournament={item.tournament}
                  matches={item.total_matches}
                  score={item.average_score}
                  wickets={item.average_wickets}
                  onPress={() => handledelete(item)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <GradiantButton
          title="Next"
          onPress={() => navigation.navigate(SCREENS.Category)}
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
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <AppDropDownPicker
                  items={cricket_tournaments}
                  name="tournament"
                  placeholder="Enter Tournament Name"
                />
                <AppFormField
                  name="total_matches"
                  keyboardType="number-pad"
                  placeholder="Enter total matches played"
                />
                <AppFormField
                  name="average_score"
                  keyboardType="number-pad"
                  placeholder="Enter average score"
                />
                <AppFormField
                  name="average_wickets"
                  keyboardType="number-pad"
                  placeholder="Enter average wickets taken"
                />
                <SubmitButton title="Post" />
              </AppForm>
            </ScrollView>
          </View>
        </Modal>
      </ScrollView>
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

export default CricketStatisticsScreen;
