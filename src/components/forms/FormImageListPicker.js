import React from "react";
import { useFormikContext } from "formik";

import ErrorMessgae from "./ErrorMessgae";
import ImageInputList from "../image/ImageInputList";

const FormImageListPicker = ({ name }) => {
  const { setFieldValue, values, errors, touched } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessgae error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormImageListPicker;
