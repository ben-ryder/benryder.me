import React from "react";
import { Field } from 'formik';
import classNames from "classnames";
import PropTypes from "prop-types";

import FormError from "./FormError";

const FormInput = (props) => {
  return (
    <>
      {props.label && props.id &&
        <label
          className={
            classNames(
              "font-bold text-brand-text-secondary",
              {
                "hidden": props.type === "hidden"
              }
            )
          }
          htmlFor={props.id}
        >
          {props.label}
        </label>
      }
      <Field
        {...props}
        className={classNames(
          "mt-1 block w-full rounded-md outline-none",
          "bg-brand-background-primary border-2  text-brand-text-secondary",
          "focus:ring-0 focus:border-brand",
          {
            "border-brand-red": props.error,
            "border-brand-interface-secondary hover:border-brand-interface-primary": !props.error
          },
          props.className,
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
  error: PropTypes.any,
  type: PropTypes.string.isRequired,
}

export default FormInput;

