import React from "react";
import { useFormikContext } from "formik";

import ErrorMessgae from "./ErrorMessgae";
import TextInputComponent from "../TextInputComponent";

const AppFormField = ({ name, width, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <TextInputComponent
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        width={width}
        {...otherProps}
      />
      <ErrorMessgae error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormField;
