import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames"

import LinkComponent from "./elements/LinkComponent";

// Assets
import { ArrowLeft, ArrowRight } from "lucide-react";

const CTALink = (props) => {
  return (
      <LinkComponent
        className={classNames("flex hover:text-brand", props.className)}
        url={ props.url }
      >
        {props.direction === "left" &&
          <ArrowLeft className="mr-1" />
        }
        { props.text }
        {props.direction === "right" &&
          <ArrowRight className="ml-1" />
        }
      </LinkComponent>
  );
}

CTALink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["left", "right"]),
  className: PropTypes.string,
}

export default CTALink;
