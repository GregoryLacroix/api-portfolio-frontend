import React from "react";
import { useRef } from "react";

const FormFieldError = (message) => {
  const errorItem = useRef();

  return (
    <span className="msgErrorTitle has-text-danger is-size-7" ref={errorItem}>
      {message.message}
    </span>
  );
};

export default FormFieldError;
