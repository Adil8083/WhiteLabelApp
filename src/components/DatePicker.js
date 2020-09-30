import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
export default function Datepicker({ width, placeholder, mode }) {
  const [DatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const handleConfirm = (confirmValue) => {
    mode === "date" && setSelectedDate(confirmValue);
    mode === "time" && setSelectedTime(confirmValue);
    setDatePickerVisibility(false);
  };
  return (
    <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
      <View style={[styles.container, { width: parseInt(width) }]}>
        {mode === "date" && (
          <Fontisto
            style={styles.iconOne}
            name="date"
            size={20}
            color="#B8B8B8"
          />
        )}
        {mode === "time" && (
          <Ionicons
            style={styles.iconOne}
            name="md-time"
            size={20}
            color="#B8B8B8"
          />
        )}
        {selectedDate ? (
          <Text style={[styles.textStyle, { color: "#696969" }]}>
            {selectedDate.toString().slice(0, 15)}
          </Text>
        ) : selectedTime ? (
          <Text style={[styles.textStyle, { color: "#696969" }]}>
            {console.log(selectedTime.toString())}
            {selectedTime.toString().slice(15, 24)}
          </Text>
        ) : (
          <Text style={styles.textStyle}>{placeholder}</Text>
        )}
        <DateTimePickerModal
          isVisible={DatePickerVisible}
          mode={mode}
          is24Hour
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    marginLeft: 20,
    height: 35,
    marginTop: 25,
  },
  iconOne: {
    paddingTop: 8,
    paddingLeft: 15,
  },
  textStyle: {
    paddingTop: 6,
    paddingLeft: 10,
    fontSize: 17,
    fontFamily: "Roboto",
    color: "#B8B8B8",
  },
});
