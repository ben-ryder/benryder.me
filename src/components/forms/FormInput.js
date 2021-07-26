import React from "react";
import { Field } from 'formik';
import classNames from "classnames";
import PropTypes from "prop-types";

import FormError from "./FormError";

const FormInput = (props) => {
  return (
    <>
      {props.label && props.id &&
        <label htmlFor={props.id}>{props.label}</label>
      }
      <Field
        {...props}
        className={classNames(
          "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50",
          props.className,
          {
            "border-red-500": props.error
          }
        )}
      />
      {props.error &&
        <FormError>{props.error}</FormError>
      }
    </>
  )
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  error: PropTypes.any
}

export default FormInput;

