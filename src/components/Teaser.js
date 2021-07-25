import React from "react";
import PropTypes from "prop-types";
import LinkComponent from "./elements/LinkComponent";

const Teaser = (props) => {
  return (
    <LinkComponent className="block mt-4 border rounded p-3 hover:border-gray-400 transition" url={ props.url }>
      <h3 className="text-2xl font-extrabold text-gray-800">{ props.title }</h3>
      <p className="text-gray-700">{ props.description }</p>
    </LinkComponent>
  );
}

Teaser.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Teaser;
