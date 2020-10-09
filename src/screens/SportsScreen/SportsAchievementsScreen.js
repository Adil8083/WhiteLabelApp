import React, { useState,useRef } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import * as Yup from "yup";

import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AchievementCard from "../../components/AchievementCard";
import AppDropDownPicker from "../../components/forms/AppDropDownPicker";
import GradiantButton from "../../components/GradiantButton";
import Header from "../../components/Header";
import SubHeading from "../../components/SubHeading";
import SubmitButton from "../../components/forms/SubmitButton";
import Screen from "../../components/Screen";
import { SCREENS } from "../../constants/Screens";
import { Theme } from "../../constants/Theme";
import year_list from "../../constants/YearsList";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  year: Yup.string().max(4).label("Year"),
});

const SportsAchievementsScreen = ({ navigation, route }) => {
  const scrollView = useRef();
  const [achievement, setAchievement] = useState([]);
  const [modalvisible, setModalVisible] = useState(false);

  const handledelete = (item) => {
    const newArray = achievement.filter((a) => a.id !== item.id);
    setAchievement(newArray);
  };

  return (
    <Screen>
      <Header isback navigation={navigation} text="Criação" />
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
            onSubmit={({ title, year }) => {
              setModalVisible(false);
              setAchievement([
                ...achievement,
                {
                  id: achievement.length + 1,
                  title: title,
                  year: year,
                },
              ]);
            }}
            validationSchema={validationSchema}
          >
            <AppFormField
              autoCapitalize="words"
              autoCorrect={false}
              name="title"
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
      <View style={{width:"100%",height:350}}>
        <ScrollView  
        ref={scrollView}
        onContentSizeChange={()=>scrollView.current.scrollToEnd()}
        contentContainerStyle={{flexGrow:1}}
        showsVerticalScrollIndicator={false}
         >
        {achievement.map((item) => (
          <View key={item.id}>
              <AchievementCard
              title={item.title}
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
    height:270
  },
});

export default SportsAchievementsScreen;
