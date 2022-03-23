import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// Assets
import { Loader2 as LoadingIcon } from "lucide-react";

const FormSubmitButton = (props) => {
  // Filter out custom props before passing to element.
  const domProps = Object.assign({}, props);
  delete domProps.isSubmitting;

  return (
    <button {...domProps} className={
      classNames(
        "rounded-md py-2 px-5 text-brand-text-secondary flex font-bold",
        {
          "bg-gray-400": props.isSubmitting,
          "bg-brand hover:bg-brand-accent": !props.isSubmitting,
        },
        domProps.className
      )}
    >
      { props.children }
      {props.isSubmitting &&
        <LoadingIcon className="animate-spin ml-2" />
      }
    </button>
  )
}

FormSubmitButton.propTypes = {
  isSubmitting: PropTypes.bool,
  children: PropTypes.any
}

export default FormSubmitButton;
