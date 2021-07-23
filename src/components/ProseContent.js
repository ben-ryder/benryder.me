import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const ProseContent = (props) => {
    return (
        <div className={classNames("prose max-w-2xl mx-auto px-2", props.className)}>
            {props.children}
        </div>
    )
}

ProseContent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
}

export default ProseContent;
