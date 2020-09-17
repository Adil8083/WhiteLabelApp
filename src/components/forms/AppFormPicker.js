import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../picker/AppPicker";
import ErrorMessage from "./ErrorMessgae";

const AppFormPicker = ({ icon, items, name, placeholder }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  return (
    <>
      <AppPicker
        items={items}
        icon={icon}
        numberofColumns={3}
        placeholder={placeholder}
        onSelectItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormPicker;
