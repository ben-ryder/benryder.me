import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const ProseContent = (props) => {
  const className = classNames(
    "prose-content",
    "prose max-w-2xl mx-auto px-2 overflow-x-hidden",
    props.className
  );

  return (
    <>
      {props.htmlString ? (
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: props.htmlString }}
        />
      ) : (
        <div className={className}>{props.children}</div>
      )}
    </>
  );
};

ProseContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  htmlString: PropTypes.string,
};

export default ProseContent;
