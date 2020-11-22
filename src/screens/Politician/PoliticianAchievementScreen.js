import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import * as Yup from "yup";

import AppDropDownPicker from "../../components/forms/AppDropDownPicker";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AchievementCard from "../../components/AchievementCard";
import GradiantButton from "../../components/GradiantButton";
import Header from "../../components/Header";
import SubmitButton from "../../components/forms/SubmitButton";
import Screen from "../../components/Screen";
import SubHeading from "../../components/SubHeading";
import { Theme } from "../../constants/Theme";
import year_list from "../../constants/YearsList";
import { SCREENS } from "../../constants/Screens";
import * as AchievementApi from "../../api/AchievementApi";
import useAuth from "../../auth/useAuth";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Achieveemnt"),
  year: Yup.string().required().label("Year"),
  description: Yup.string().min(5).label("Description"),
});

const PoliticianAchievementScreen = ({ navigation }) => {
  const scrollView = useRef();
  const { user } = useAuth();
  const [modalvisible, setModalVisible] = useState(false);
  const [attemptFailed, setAttemptFailed] = useState(false);
  const [achievements, setAchievements] = useState([]);

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
    setAchievements(response.data);
    setAttemptFailed(false);
  };

  const handleSubmit = async ({ name, year, description }) => {
    setAttemptFailed(true);
    let id = achievements.length + 1;
    let object = {
      identifier: id.toString(),
      name: name,
      year: year,
    };

    if (description) {
      object = { ...object, description: description };
    }
    const response = await AchievementApi.add(object, user);
    if (!response.ok) {
      Alert.alert("Error", "Unable to add this achievement", [
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
    setAchievements([...achievements, response.data]);
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
          setAchievements(
            achievements.filter((val) => val.identifier !== item.identifier)
          );
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
      <SubHeading title="Achievements" onPress={() => setModalVisible(true)} />
      <ActivityIndicator animating={attemptFailed} color={Theme.spareColor} />
      <Modal
        coverScreen
        visible={modalvisible}
        animationType="slide"
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.container}>
          <AppForm
            initialValues={{ name: "", year: "", description: "" }}
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
              name="year"
              placeholder="Select year"
              items={year_list}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              name="description"
              placeholder="Something you want to add. (Optional)"
              multiline={true}
              height={100}
            />
            <SubmitButton title="Post" />
          </AppForm>
        </View>
      </Modal>
      <View style={styles.container2}>
        <ScrollView
          ref={scrollView}
          onContentSizeChange={() => scrollView.current.scrollToEnd()}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {achievements.map((item) => (
            <View key={item.identifier}>
              <AchievementCard
                title={item.name}
                year={item.year}
                description={item.description}
                onPress={() => handledelete(item)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <GradiantButton
        title="Next"
        onPress={() => navigation.navigate(SCREENS.PoliticianEducation)}
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
    height: 315,
  },
  container2: { width: "100%", height: 300 },
});

export default PoliticianAchievementScreen;
