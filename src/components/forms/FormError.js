import React from "react";
import PropTypes from "prop-types";

const FormError = (props) => {
  return <p className="mt-1 text-sm text-red-500">{ props.children }</p>
}

FormError.propTypes = {
  children: PropTypes.any
}

export default FormError;
