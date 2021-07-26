import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const FormRow = (props) => {
  return (
    <div {...props} className={classNames("mb-2", props.className)}>
      { props.children }
    </div>
  )
}

FormRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any
}

export default FormRow;