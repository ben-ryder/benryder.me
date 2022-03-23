import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import LinkComponent from "./elements/LinkComponent";

const TagFilterItem = (props) => {
  return (
    <li className="mr-2 mb-2">
      <LinkComponent
        className={classNames(
          "block py-1 px-2 text-sm rounded",
          {
            "bg-brand text-brand-text-secondary": props.active,
            "bg-brand-interface-secondary hover:bg-brand-interface-primary text-brand-text-secondary": !props.active
          },
        )}
        url={ props.url }
        text={ props.text }
      />
    </li>
  );
}

TagFilterItem.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool
}

export default TagFilterItem;
