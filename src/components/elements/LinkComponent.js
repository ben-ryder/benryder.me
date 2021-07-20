import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";

/**
 * A link component to dynamically create an internal or external link.
 *
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const LinkComponent = (props) => {
    let content;
    if (props.children) {
        content = props.children;
    }
    else if (props.text) {
        content = props.text;
    }
    else {
        throw new Error("No content found to populate link");
    }

    if (props.url.startsWith("/")) {
        return <Link to={props.url}>{content}</Link>
    }
    else {
        return <a href={props.url}>{content}</a>
    }
}

LinkComponent.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
}

export default LinkComponent;
