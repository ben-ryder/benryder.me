import React from "react";
import PropTypes from "prop-types";

const MetadataSection = (props) => {
  return (
    <div className="mt-3 text-sm text-gray-500 flex flex-wrap">
      {props.data.map(dataItem =>
        <div key={dataItem.text} className="flex items-center mr-3 mb-2">
          { dataItem.icon }
          {dataItem.link
            ? <a className="text-gray-600 underline ml-1" href={dataItem.link}>{dataItem.text}</a>
            : <span className="ml-1">{ dataItem.text }</span>
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
