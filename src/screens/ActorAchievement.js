import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import * as ApiAchv from "../api/AchievementApi";
import { SCREENS } from "../constants/Screens";
import { Theme } from "../constants/Theme";
import Header from "../components/Header";
import TextSize from "../constants/TextSize";
import GradiantButton from "../components/GradiantButton";
import SingerAchivementsModal from "./SingerAchivementsModal";
import useAuth from "../auth/useAuth";
import ActivityIndicator from "../components/ActivityIndicator";

export default function ActorAchievement({ navigation }) {
  const [AchievementDetails, setAchievementDetails] = useState([]);
  const [ShowAchiveModal, setShowAchiveModal] = useState(false);
  const [showIndicator, setShowIndicator] = useState(false);

  let id = "";
  let temp_2 = [];
  const { user } = useAuth();

  const RemoveAchivement = (obj) => {
    Alert.alert("Delete", "Are you sure you want to Delete this?", [
      {
        text: "Yes",
        onPress: async () => {
          setShowIndicator(true);
          const response = await ApiAchv.del(obj.id, user);
          if (!response.ok) {
            Alert.alert("Attention", `Unable to delete Achievement`, [
              {
                text: "OK",
              },
            ]);
            setShowIndicator(false);
            return;
          }
          setShowIndicator(false);
          setAchievementDetails(
            AchievementDetails.filter((val) => val.id !== obj.id)
          );
        },
      },
      { text: "No" },
    ]);
  };
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
  const addAchievement = async (obj) => {
    id = uuid();
    setShowIndicator(true);
    const response = await ApiAchv.add(
      {
        identifier: id,
        name: obj.title,
        description: obj.description,
      },
      user
    );
    if (!response.ok) {
      Alert.alert("Attention", `Unable to add achievement`, [
        {
          text: "OK",
        },
      ]);
      setShowIndicator(false);
      return;
    }
    setShowIndicator(false);
    setAchievementDetails([
      ...AchievementDetails,
      { id: id, largeText: false, ...obj },
    ]);
  };
  const AsynFunc = async () => {
    setShowIndicator(true);

    let Response = await ApiAchv.Read(user);
    if (!Response.ok) {
      Alert.alert("Attention", "Unable to Load Data", [
        {
          text: "Retry",
          onPress: () => AsynFunc(),
        },
        { text: "Cancel" },
      ]);
      setShowIndicator(false);
      return;
    }
    Response.data.map((data) =>
      temp_2.push({
        id: data.identifier,
        title: data.name,
        description: data.description,
      })
    );
    setShowIndicator(false);
    setAchievementDetails(temp_2);
  };
  useEffect(() => {
    AsynFunc();
  }, []);
  return (
    <>
      <ActivityIndicator visible={showIndicator} />
      <View style={styles.container}>
        <Header isBack navigation={navigation} text="Criação" />
        <ScrollView>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
            }}
          >
            <View style={[styles.formStlying, { marginTop: 20 }]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.subHeadin}>Add Achivements</Text>
                <TouchableOpacity
                  onPress={() => setShowAchiveModal(!ShowAchiveModal)}
                >
                  <MaterialIcons name="add" size={30} color={Theme.iconColor} />
                </TouchableOpacity>
              </View>
              {ShowAchiveModal && (
                <SingerAchivementsModal
                  getAhcivementDetail={(obj) => addAchievement(obj)}
                  toggle={(val) => setShowAchiveModal(val)}
                />
              )}
              {AchievementDetails.length > 0 && (
                <View style={styles.DetailsStyling}>
                  <View style={styles.DetailsHeadingsCont}>
                    <Text style={styles.DetailsHeadings}>Title</Text>
                    <Text style={[styles.DetailsHeadings, { width: "63%" }]}>
                      Description
                    </Text>
                  </View>
                  {AchievementDetails.map((obj) => (
                    <View style={styles.DetailsDataCont} key={obj.id}>
                      <Text style={styles.DetailsData}>{obj.title}</Text>
                      <Text
                        numberOfLines={obj.largeText ? 100 : 3}
                        style={[
                          styles.DetailsData,
                          { width: "63%", marginRight: 8 },
                        ]}
                        onPress={() =>
                          setAchievementDetails(
                            AchievementDetails.map((val) =>
                              val.id === obj.id
                                ? { ...obj, largeText: !obj.largeText }
                                : val
                            )
                          )
                        }
                      >
                        {obj.description}
                      </Text>
                      <TouchableOpacity onPress={() => RemoveAchivement(obj)}>
                        <MaterialCommunityIcons
                          name="delete"
                          size={20}
                          color={Theme.spareColor}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <GradiantButton
              title="Add"
              onPress={() => navigation.navigate(SCREENS.GenerateApk)}
              styleButton={{ marginTop: 10 }}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: Theme.primary,
  },
  formStlying: {
    width: "90%",
    backgroundColor: Theme.secondary,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  subHeadin: {
    color: Theme.textColor,
    fontWeight: "bold",
    fontSize: TextSize.SubHeading,
  },
  DetailsStyling: {
    backgroundColor: Theme.DarkGrey,
    borderRadius: 10,
    marginTop: 5,
  },
  DetailsHeadingsCont: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  DetailsHeadings: {
    color: Theme.textColor,
    fontSize: TextSize.NormalText,
    fontWeight: "bold",
    marginRight: 14,
    width: "20%",
  },
  DetailsData: {
    color: Theme.textColor,
    fontSize: TextSize.NormalText,
    marginRight: 14,
    width: "20%",
  },
  DetailsDataCont: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});
