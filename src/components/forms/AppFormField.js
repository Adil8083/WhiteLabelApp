import React from "react";
import { useFormikContext } from "formik";

import ErrorMessgae from "./ErrorMessgae";
import TextInputComponent from "../TextInputComponent";

const AppFormField = ({ name, width, heigth, ...otherProps }) => {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <TextInputComponent
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        width={width}
        heigth={heigth}
        {...otherProps}
      />
      <ErrorMessgae error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormField;
