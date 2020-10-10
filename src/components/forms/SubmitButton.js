import React from "react";
import { useFormikContext } from "formik";

import GradiantButton from "../GradiantButton";

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();
  return <GradiantButton title={title} onPress={handleSubmit} />;
};

export default SubmitButton;
