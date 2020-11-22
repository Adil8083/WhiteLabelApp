import React, { useState, useRef } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import * as Yup from "yup";
import Modal from "react-native-modal";

import AppForm from "../../components/forms/AppForm";
import Header from "../../components/Header";
import Screen from "../../components/Screen";
import SubHeading from "../../components/SubHeading";
import AppFormField from "../../components/forms/AppFormField";
import SubmitButton from "../../components/forms/SubmitButton";
import { Theme } from "../../constants/Theme";
import GradiantButton from "../../components/GradiantButton";
import ProjectCard from "../../components/ProjectCard";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Project "),
  description: Yup.string().required().label("Description"),
});
const PoliticianProjectScreen = ({ navigation }) => {
  const [modalvisible, setModalVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const scrollView = useRef();
  const handleSubmit = ({ name, description }) => {
    setModalVisible(false);
    setProjects([
      ...projects,
      { identifier: projects.length + 1, name: name, description: description },
    ]);
  };
  const handledelete = (item) => {
    Alert.alert("Delete", "Are you sure you want to delete this achievement?", [
      {
        text: "Yes",
        onPress: () => {
          const newArray = projects.filter(
            (a) => a.identifier !== item.identifier
          );
          setProjects(newArray);
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
      <SubHeading
        title="Current Projects"
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
            initialValues={{ name: "", description: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormField
              name="name"
              placeholder="Name of the project"
              autoCorrect={false}
              autoCapitalize="none"
            />
            <AppFormField
              name="description"
              placeholder="Describe the project and assumed date of completion."
              autoCorrect={false}
              autoCapitalize="none"
              multiline
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
          {projects.map((item) => (
            <View key={item.identifier}>
              <ProjectCard
                title={item.name}
                description={item.description}
                onPress={() => handledelete(item)}
              />
            </View>
          ))}
        </ScrollView>
      </View>
      <GradiantButton title="Next" onPress={() => console.log("Next")} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.secondary,
    borderRadius: 15,
    margin: 10,
    padding: 10,
    height: 270,
  },
  container2: {
    width: "100%",
    height: 300,
  },
});

export default PoliticianProjectScreen;
