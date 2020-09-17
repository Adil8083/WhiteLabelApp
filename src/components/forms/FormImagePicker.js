import React from "react";
import { useFormikContext } from "formik";
import * as ImagePicker from "expo-image-picker";

import ErrorMessgae from "./ErrorMessgae";
import ImageInput from "../image/ImageInput";

const FormImagePicker = ({ name }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();

  return (
    <>
      <ImageInput
        imageUri={values[name]}
        onChangeImage={(uri) => setFieldValue(name, uri)}
      />
      <ErrorMessgae error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormImagePicker;
