import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, Text, TouchableWithoutFeedback, StyleSheet } from "react-native";

import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import TextSize from "../constants/TextSize";
export default function Datepicker({
  containerStyle,
  placeholder,
  mode,
  getValue,
}) {
  const [DatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const handleConfirm = (confirmValue) => {
    mode === "date"
      ? setSelectedDate(confirmValue)
      : setSelectedTime(confirmValue);
    setDatePickerVisibility(false);
  };
  useEffect(
    () => selectedTime && getValue(selectedTime.toString().slice(16, 24)),
    [selectedTime]
  );
  useEffect(
    () => selectedDate && getValue(selectedDate.toString().slice(0, 15)),
    [selectedDate]
  );
  return (
    <TouchableWithoutFeedback onPress={() => setDatePickerVisibility(true)}>
      <View style={[styles.container, containerStyle && containerStyle]}>
        {mode === "date" && (
          <Fontisto
            style={styles.iconOne}
            name="date"
            size={18}
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
            {selectedTime.toString().slice(16, 24)}
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
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 35,
    borderColor: "#dfdfdf",
    borderWidth: 1,
    width: 220,
  },
  iconOne: {
    paddingTop: 8,
    paddingLeft: 10,
  },
  textStyle: {
    paddingTop: 7,
    paddingLeft: 10,
    fontSize: TextSize.NormalText,
    color: "#B8B8B8",
  },
});
