import React from "react";
import PropTypes from "prop-types";

import { Tag as TagIcon } from "lucide-react";

const TagList = (props) => {
  return (
    <div className="text-sm text-brand-primary flex">
      <TagIcon size="20" className="stroke-brand" />
      <div className="ml-1 flex flex-wrap">
        {props.tagList.map(tag =>
          <a key={tag} className="mr-2 text-brand-text-primary hover:underline" href={props.tagUrl + tag}>{"#" + tag}</a>
        )}
      </div>
    </div>
  )
}

TagList.propTypes = {
  tagList: PropTypes.array.isRequired,
  tagUrl: PropTypes.string.isRequired
};

export default TagList;
