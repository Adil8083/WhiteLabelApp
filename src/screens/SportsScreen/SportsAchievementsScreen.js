import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import * as Yup from "yup";

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AchievementCard from "../../components/AchievementCard";
import AppDropDownPicker from "../../components/forms/AppDropDownPicker";
import * as AchievementApi from "../../api/AchievementApi";
import GradiantButton from "../../components/GradiantButton";
import Header from "../../components/Header";
import SubHeading from "../../components/SubHeading";
import SubmitButton from "../../components/forms/SubmitButton";
import Screen from "../../components/Screen";
import { SCREENS } from "../../constants/Screens";
import { Theme } from "../../constants/Theme";
import useAuth from "../../auth/useAuth";
import client from "../../api/client";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  year: Yup.string().max(4).label("Year"),
});

const SportsAchievementsScreen = ({ navigation, route }) => {
  const scrollView = useRef();
  const { user } = useAuth();
  const [achievement, setAchievement] = useState([]);
  const [modalvisible, setModalVisible] = useState(false);
  const [attempFailed, setAttemptFailed] = useState(false);
  const [year_list, setYearsList] = useState([]);

  useEffect(() => {
    getAchievements();
  }, []);

  const getAchievements = async () => {
    setAttemptFailed(true);
    const response = await AchievementApi.Read(user);
    if (!response.ok) {
      Alert.alert("Attention", "Unable to load achievements.", [
        {
          text: "Retry",
          onPress: () => getAchievements(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      setAttemptFailed(false);
      return;
    }
    setAchievement(response.data);
    setAttemptFailed(false);
  };

  const handleSubmit = async ({ name, year }) => {
    setAttemptFailed(true);
    let id = achievement.length + 1;
    const response = await AchievementApi.add(
      {
        identifier: id.toString(),
        name: name,
        year: year,
      },
      user
    );
    if (!response.ok) {
      Alert.alert("Error", "Could not add this achievement", [
        {
          text: "OK",
          onPress: () => {
            setModalVisible(false);
          },
        },
      ]);
      setAttemptFailed(false);
      return;
    }
    setModalVisible(false);
    setAttemptFailed(false);
    setAchievement([...achievement, response.data]);
  };

  const handledelete = (item) => {
    Alert.alert("Delete", "Are you sure you want to delete this achievement?", [
      {
        text: "Yes",
        onPress: async () => {
          setAttemptFailed(true);
          const response = await AchievementApi.del(item.identifier, user);
          if (!response.ok) {
            Alert.alert("Error", "Unable to delete the achievement.", [
              {
                text: "Retry",
                onPress: () => handledelete(item),
              },
              {
                text: "Cancel",
                onPress: () => {
                  return setAttemptFailed(false);
                },
                style: "cancel",
              },
            ]);
          }
          setAttemptFailed(false);
          setAchievement(
            achievement.filter((val) => val.identifier !== item.identifier)
          );
        },
      },
      {
        text: "No",
      },
    ]);
  };
  const getYears = async () => {
    let Response = await client.get("/year/get");
    if (!Response.ok) {
      Alert.alert("Attention", "Unable to Load Years Data", [
        {
          text: "Retry",
          onPress: () => AsynFunc(),
        },
        { text: "Cancel" },
      ]);
      return;
    }
    setYearsList(Response.data);
  };
  useEffect(() => {
    getYears();
  }, []);
  return (
    <Screen>
      <Header isBack navigation={navigation} text="Criação" />
      <ActivityIndicator animating={attempFailed} color={Theme.spareColor} />
      <View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <SubHeading
            title="Add Achievements"
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
              <View>
                <AppForm
                  initialValues={{ title: "", year: "" }}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  <AppFormField
                    autoCapitalize="words"
                    autoCorrect={false}
                    name="name"
                    placeholder="Achievement"
                  />
                  <AppDropDownPicker
                    items={year_list}
                    placeholder="Year"
                    name="year"
                  />
                  <SubmitButton title="Add" />
                </AppForm>
              </View>
            </View>
          </Modal>
          <View style={{ width: "100%", height: 280 }}>
            <ScrollView
              ref={scrollView}
              onContentSizeChange={() => scrollView.current.scrollToEnd()}
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {achievement.map((item) => (
                <View key={item.identifier}>
                  <AchievementCard
                    title={item.name}
                    year={item.year}
                    onPress={() => handledelete(item)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          <GradiantButton
            title="Next"
            onPress={() => {
              {
                route.params.sport == "Cricket"
                  ? navigation.navigate(SCREENS.CricketStatistics)
                  : navigation.navigate(SCREENS.FootBallStatistics);
              }
            }}
          />
        </ScrollView>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 15,
  },
  container: {
    backgroundColor: Theme.DarkGrey,
    borderRadius: 15,
    margin: 10,
    padding: 10,
    justifyContent: "space-evenly",
    height: 400,
  },
});

export default SportsAchievementsScreen;
