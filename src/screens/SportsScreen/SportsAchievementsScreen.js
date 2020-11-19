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
import year_list from "../../constants/YearsList";

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required(),
  name: Yup.string().required().label("Name"),
  year: Yup.string().max(4).label("Year"),
});

const SportsAchievementsScreen = ({ navigation, route }) => {
  const scrollView = useRef();
  const { user } = useAuth();
  const [achievement, setAchievement] = useState([]);
  const [modalvisible, setModalVisible] = useState(false);
  const [attempFailed, setAttemptFailed] = useState(false);

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
      Alert.alert("Attention", "Could not add this achievement", [
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

  const handledeletePress = async () => {
    setAttemptFailed(true);
    const deletedAchievement = achievement.filter(
      (a) => a.identifier === item.identifier
    );
    const newArray = achievement.filter(
      (a) => a.identifier !== item.identifier
    );
    const response = await AchievementApi.del(
      deletedAchievement.identifier,
      user
    );
    if (!response.ok) {
      Alert.alert("Attention", "Could not delete achievement", [
        {
          text: "Ok",
        },
      ]);
      setAttemptFailed(false);
      return;
    }
    setAchievement(newArray);
    setAttemptFailed(false);
  };
  const handledelete = (item) => {
    Alert.alert("Delete", "Are you sure you want to delete this achievement?", [
      {
        text: "Yes",
        onPress: () => {
          handledeletePress(item);
        },
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <Screen>
      <ActivityIndicator animating={attempFailed} color={Theme.spareColor} />
      <Header isBack navigation={navigation} text="Criação" />
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
          </Modal>
          <View style={{ width: "100%", height: 300 }}>
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
    backgroundColor: Theme.secondary,
    borderRadius: 15,
    margin: 10,
    padding: 10,
    height: 270,
  },
});

export default SportsAchievementsScreen;
