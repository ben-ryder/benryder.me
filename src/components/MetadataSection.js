import React from "react";
import PropTypes from "prop-types";
import LinkComponent from "./elements/LinkComponent";

const MetadataSection = (props) => {
  return (
    <div className="mt-3 text-sm text-gray-500 flex flex-wrap">
      {props.data.map(dataItem =>
        <div key={dataItem.text} className="flex items-center mr-3 mb-2">
          { dataItem.icon }
          {dataItem.link
            ? <LinkComponent className="ml-1 text-brand-text-secondary underline hover:text-brand" url={dataItem.link}>{dataItem.text}</LinkComponent>
            : <span className="ml-1 text-brand-text-secondary">{ dataItem.text }</span>
          }
        </div>
      )}
    </div>
  )
}

MetadataSection.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object.isRequired,
      text: PropTypes.string.isRequired,
      link: PropTypes.string
    })
  ).isRequired
};

export default MetadataSection;
