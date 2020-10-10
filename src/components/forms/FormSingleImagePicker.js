import React from "react";
import { useFormikContext } from "formik";

import ErrorMessgae from "./ErrorMessgae";
import ImageInput from "../image/ImageInput";

const FormSingleImagePicker = ({ name }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  const imageUri = values[name];

  const handleChange = (uri) => {
    setFieldValue(name, uri);
  };

  return (
    <>
      <ImageInput imageUri={imageUri} onChangeImage={handleChange} />
      <ErrorMessgae error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormSingleImagePicker;
