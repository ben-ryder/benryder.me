import React from "react";
import PropTypes from "prop-types";

import Tag from "./Tag";

const TagList = (props) => {
  return (
    <ul className="flex flex-wrap">
      <Tag
        text="View All"
        url={props.tagHomeUrl }
        active={ "View All" === props.currentTag }
      />
      {props.tagList.map(tag =>
        <Tag
          key={ tag }
          text={ tag }
          url={ props.tagUrl + tag }
          active={ tag === props.currentTag }
        />
      )}
    </ul>
  );
}

TagList.propTypes = {
  tagList: PropTypes.array.isRequired,
  currentTag: PropTypes.string,
  tagUrl: PropTypes.string.isRequired,
  tagHomeUrl: PropTypes.string.isRequired
}

export default TagList;
