import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import DropDownPicker from "react-native-dropdown-picker";

import ErrorMessage from "./ErrorMessgae";

const AppDropDownPicker = ({ items, placeholder, name }) => {
  const { setFieldValue, errors, touched } = useFormikContext();
  return (
    <>
      <DropDownPicker
        autoScrollToDefaultValue
        activeLabelStyle={styles.activeLabel}
        items={items}
        placeholder={placeholder}
        placeholderStyle={{ color: "#B8B8B8" }}
        defaultValue={""}
        containerStyle={styles.conatiner}
        itemStyle={styles.item}
        dropDownStyle={styles.dropdown}
        onChangeItem={(item) => setFieldValue(name, item.value)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    height: 40,
    marginTop: 5,
  },
  activeLabel: {
    backgroundColor: "tomato",
    flex: 1,
    height: "100%",
  },
  dropdown: {
    backgroundColor: "white",
    paddingVertical: 10,
  },
  item: {
    justifyContent: "flex-start",
  },
});

export default AppDropDownPicker;
