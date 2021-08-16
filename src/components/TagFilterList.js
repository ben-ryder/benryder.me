import React from "react";
import PropTypes from "prop-types";

import TagFilterItem from "./TagFilterItem";

const TagFilterList = (props) => {
  return (
    <ul className="flex flex-wrap">
      <TagFilterItem
        text="View All"
        url={props.tagHomeUrl }
        active={ "View All" === props.currentTag }
      />
      {props.tagList.map(tag =>
        <TagFilterItem
          key={ tag }
          text={ tag }
          url={ props.tagUrl + tag }
          active={ tag === props.currentTag }
        />
      )}
    </ul>
  );
}

TagFilterList.propTypes = {
  tagList: PropTypes.array.isRequired,
  currentTag: PropTypes.string,
  tagUrl: PropTypes.string.isRequired,
  tagHomeUrl: PropTypes.string.isRequired
}

export default TagFilterList;
