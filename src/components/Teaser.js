import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import LinkComponent from "./elements/LinkComponent";

const Teaser = (props) => {
  return (
    <LinkComponent className={classNames("block mt-4 border rounded p-3 hover:border-gray-400 transition", props.className)} url={ props.url }>
      <h3 className="text-xl font-bold text-gray-800">{ props.title }</h3>
      <p className="text-gray-700">{ props.description }</p>
    </LinkComponent>
  );
}

Teaser.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default Teaser;
