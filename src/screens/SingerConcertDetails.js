import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { SCREENS } from "../constants/Screens";
import { Theme } from "../constants/Theme";
import Header from "../components/Header";
import TextSize from "../constants/TextSize";
import GradiantButton from "../components/GradiantButton";
import ConcertModal from "../components/ConcertModal";
import SingerAchivementsModal from "./SingerAchivementsModal";

export default function SingerConcertDeatils({ navigation }) {
  const [ConcertDetails, setConcertDetails] = useState([]);
  const [AchivementDetails, setAchivementDetails] = useState([]);
  const [ShowConcertModal, setShowConcertModal] = useState(false);
  const [ShowAchiveModal, setShowAchiveModal] = useState(false);
  const [ShowCompleteText, setShowCompleteText] = useState(false);
  const RemoveConcert = (obj) =>
    setConcertDetails(ConcertDetails.filter((val) => val.id !== obj.id));
  const RemoveAchivement = (obj) =>
    setAchivementDetails(AchivementDetails.filter((val) => val.id !== obj.id));
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  return (
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
          <View style={styles.formStlying}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.subHeadin}>Add Concert Details</Text>
              <TouchableOpacity
                onPress={() => setShowConcertModal(!ShowConcertModal)}
              >
                <MaterialIcons name="add" size={30} color={Theme.iconColor} />
              </TouchableOpacity>
            </View>
            {ShowConcertModal && (
              <ConcertModal
                getConcertDetails={(obj) =>
                  setConcertDetails([...ConcertDetails, { id: uuid(), ...obj }])
                }
                toggle={(value) => setShowConcertModal(value)}
              />
            )}
            {ConcertDetails.length > 0 && (
              <View style={styles.DetailsStyling}>
                <View style={styles.DetailsHeadingsCont}>
                  <Text style={styles.DetailsHeadings}>Country</Text>
                  <Text style={styles.DetailsHeadings}>City</Text>
                  <Text style={styles.DetailsHeadings}>Date</Text>
                  <Text style={styles.DetailsHeadings}>Time</Text>
                </View>
                {ConcertDetails.map((obj) => (
                  <View style={styles.DetailsDataCont} key={obj.id}>
                    <Text style={styles.DetailsData}>{obj.country}</Text>
                    <Text style={styles.DetailsData}>{obj.city}</Text>
                    <Text style={styles.DetailsData}>{obj.date}</Text>
                    <Text
                      style={[
                        styles.DetailsData,
                        { width: "15%", marginRight: 8 },
                      ]}
                    >
                      {obj.time}
                    </Text>
                    <TouchableOpacity onPress={() => RemoveConcert(obj)}>
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
                getAhcivementDetail={(obj) =>
                  setAchivementDetails([
                    ...AchivementDetails,
                    { id: uuid(), ...obj },
                  ])
                }
                toggle={(val) => setShowAchiveModal(val)}
              />
            )}
            {AchivementDetails.length > 0 && (
              <View style={styles.DetailsStyling}>
                <View style={styles.DetailsHeadingsCont}>
                  <Text style={styles.DetailsHeadings}>Title</Text>
                  <Text style={[styles.DetailsHeadings, { width: "63%" }]}>
                    Description
                  </Text>
                </View>
                {AchivementDetails.map((obj) => (
                  <View style={styles.DetailsDataCont} key={obj.id}>
                    <Text style={styles.DetailsData}>{obj.title}</Text>
                    <Text
                      numberOfLines={ShowCompleteText ? 100 : 3}
                      style={[
                        styles.DetailsData,
                        { width: "63%", marginRight: 8 },
                      ]}
                      onPress={() => setShowCompleteText(!ShowCompleteText)}
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
            onPress={() => navigation.navigate(SCREENS.Category)}
            styleButton={{ marginTop: 10 }}
          />
        </View>
      </ScrollView>
    </View>
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
    backgroundColor: "#3D3C41",
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
