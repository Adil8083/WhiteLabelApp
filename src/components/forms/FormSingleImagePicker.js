import React, { useState } from "react";
import { useFormikContext } from "formik";

import ErrorMessgae from "./ErrorMessgae";
import ImageInputList from "../image/ImageInputList";
import ImageInput from "../image/ImageInput";

const FormSingleImagePicker = ({ name }) => {
  const [item, setItem] = useState([]);
  const { setFieldValue, values, errors, touched } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
    setItem([...item, uri]);
  };

  const handleChange = (uri) => {
    {
      uri == null ? removeImages(uri) : setItem([...item, uri]);
    }
  };

  const removeImages = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri == uri)
    );
    setItem(item.filter((imageUri) => imageUri == uri));
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
    setItem(item.filter((imageUri) => imageUri !== uri));
  };

  return (
    <>
      {item.length == 1 ? (
        <ImageInput imageUri={item[0]} onChangeImage={handleChange} />
      ) : (
        <ImageInputList
          imageUris={imageUris}
          onAddImage={handleAdd}
          onRemoveImage={handleRemove}
        />
      )}
      <ErrorMessgae error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormSingleImagePicker;
