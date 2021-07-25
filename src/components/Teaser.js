import React from "react";
import PropTypes from "prop-types";
import LinkComponent from "./elements/LinkComponent";

const Teaser = (props) => {
  return (
    <div className="mt-2" key={ props.key }>
      <LinkComponent url={props.url}>
        <h3 className="text-2xl font-extrabold text-gray-800">{props.title}</h3>
        <p className="text-gray-700">{props.description}</p>
      </LinkComponent>
    </div>
  );
}

Teaser.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  key: PropTypes.string
}

export default Teaser;
