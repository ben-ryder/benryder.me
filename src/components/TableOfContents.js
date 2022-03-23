import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {
  ChevronDown as OpenIcon,
  ChevronUp as CloseIcon
} from "lucide-react";

const TableOfContents = (props) => {

  let [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="mx-2">
      <div className="max-w-2xl mx-auto border border-brand-interface-primary rounded text-brand-text-secondary mb-6">
        <button
          onClick={() => {setIsExpanded(!isExpanded)}}
          className="w-full flex justify-between px-4 py-3"
        >
          <p className="font-bold">Table of Contents</p>
          <i>
            {isExpanded
              ? <CloseIcon />
              : <OpenIcon />
            }
          </i>
        </button>
        <ul className={classNames(
          "border-t border-brand-interface-primary px-4 py-3",
          {
            "hidden": !isExpanded
          }
        )}
        >
          {props.links.map(link =>
            <li key={ link.link } className={
              classNames(
                "mb-1",
                {
                  "pl-6": link.depth === 3,
                  "pl-8": link.depth === 4
                }
              )}
            >
              <a
                className="hover:underline"
                href={ link.link }
                onClick={() => {setIsExpanded(false)}}
              >
                { link.text }
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

TableOfContents.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      depth: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    })
  ).isRequired
};

export default TableOfContents;


