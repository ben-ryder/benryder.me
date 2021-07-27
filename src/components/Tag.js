import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import LinkComponent from "./elements/LinkComponent";

const TagList = (props) => {
  return (
    <li className="ml-2 mb-2">
      <LinkComponent
        className={classNames(
          "block py-1 px-2 text-sm rounded",
          {
          "bg-blue-700 text-white": props.active,
          "bg-gray-200 text-gray-600": !props.active
          }
        )}
        url={ props.url }
        text={ props.text }
      />
    </li>
  );
}

TagList.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool
}

export default TagList;
