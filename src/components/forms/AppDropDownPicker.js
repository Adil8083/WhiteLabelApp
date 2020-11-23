import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import DropDownPicker from "react-native-dropdown-picker";

import ErrorMessage from "./ErrorMessgae";

const AppDropDownPicker = ({ items, placeholder, name, onSelectItem }) => {
  const { setFieldValue, errors, touched } = useFormikContext();
  return (
    <>
      <DropDownPicker
        autoScrollToDefaultValue
        containerStyle={styles.conatiner}
        defaultValue={""}
        dropDownStyle={styles.dropdown}
        items={items}
        itemStyle={styles.item}
        labelStyle={styles.label}
        placeholder={placeholder}
        placeholderStyle={{ color: "#B8B8B8" }}
        onChangeItem={({ value }) => {
          setFieldValue(name, value);
          {
            onSelectItem && onSelectItem(value);
          }
        }}
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
  dropdown: {
    backgroundColor: "white",
    paddingVertical: 10,
  },
  item: {
    justifyContent: "flex-start",
  },
  label: {
    color: "black",
  },
});

export default AppDropDownPicker;
