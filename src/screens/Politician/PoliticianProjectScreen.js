import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Yup from "yup";
import Modal from "react-native-modal";

import AppForm from "../../components/forms/AppForm";
import GradiantButton from "../../components/GradiantButton";
import Header from "../../components/Header";
import ProjectCard from "../../components/ProjectCard";
import * as ProjectApi from "../../api/politicianProjApi";
import Screen from "../../components/Screen";
import SubHeading from "../../components/SubHeading";
import AppFormField from "../../components/forms/AppFormField";
import SubmitButton from "../../components/forms/SubmitButton";
import { Theme } from "../../constants/Theme";
import useAuth from "../../auth/useAuth";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Project "),
  detail: Yup.string().required().label("Detail"),
});
const PoliticianProjectScreen = ({ navigation }) => {
  const { user } = useAuth();
  const scrollView = useRef();
  const [projects, setProjects] = useState([]);
  const [modalvisible, setModalVisible] = useState(false);
  const [attemptfailed, setAttemptFailed] = useState(false);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    setAttemptFailed(true);
    const response = await ProjectApi.Read(user);

    if (!response.ok) {
      Alert.alert("Error", "Anable to load project details.", [
        {
          text: "Retry",
          onPress: () => getProjects(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      setAttemptFailed(false);
      return;
    }

    setProjects(response.data);
    setAttemptFailed(false);
  };

  const handleSubmit = async ({ name, detail }) => {
    setAttemptFailed(true);
    let id = projects.length + 1;
    const response = await ProjectApi.add(
      {
        identifier: id.toString(),
        name: name,
        detail: detail,
      },
      user
    );

    if (!response.ok) {
      Alert.alert("Error", "Unable to add this project.", [
        {
          text: "Retry",
          onPress: () => handleSubmit({ name, detail }),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
      setAttemptFailed(false);
      setModalVisible(false);
      return;
    }

    setAttemptFailed(false);
    setModalVisible(false);
    setProjects([...projects, response.data]);
  };

  const handledelete = (item) => {
    Alert.alert("Delete", "Are you sure you want to delete this achievement?", [
      {
        text: "Yes",
        onPress: async () => {
          setAttemptFailed(true);
          const response = await ProjectApi.del(item.identifier, user);
          if (!response.ok) {
            Alert.alert("Error", "Unable to delete this project.", [
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

          setAttemptFailed(false);
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
      <ActivityIndicator animating={attemptfailed} color={Theme.spareColor} />
      <Modal
        coverScreen
        visible={modalvisible}
        animationType="slide"
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.container}>
          <AppForm
            initialValues={{ name: "", detail: "" }}
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
              name="detail"
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
                detail={item.detail}
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
