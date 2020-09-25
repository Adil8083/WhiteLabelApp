import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import ErrorMessgae from "./ErrorMessgae";

const AppFormField = ({ name, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <AppTextInput
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
      />
      <ErrorMessgae error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormField;
