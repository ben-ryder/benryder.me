import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import Teaser from "./Teaser";

const RelatedContent = (props) => {
  return (
    <div className="max-w-2xl mx-auto px-2 border-t border-brand-interface-primary mt-5">
      {props.articles &&
        <div className="mt-5">
          <h2 className="text-3xl font-extrabold text-brand-text-primary">Related Articles</h2>
          <div className={classNames("mt-2", {"sm:flex sm:justify-between": props.articles.length > 1})}>
            {props.articles.map((article) =>
              <Teaser
                className={classNames({"sm:max-w-half": props.articles.length > 1})}
                url={ article.fields.urlSlug }
                title={ article.title }
                description={ article.description.description }
                key={ article.fields.urlSlug }
              />
            )}
          </div>
        </div>
      }
      {props.projects &&
        <div className="mt-5">
          <h2 className="text-3xl font-extrabold text-brand-text-primary">Related Projects</h2>
          <div className={classNames("mt-2", {"sm:flex sm:justify-between": props.projects.length > 1})}>
            {props.projects.map((project) =>
              <Teaser
                className={classNames({"sm:max-w-half": props.projects.length > 1})}
                url={ project.fields.urlSlug }
                title={ project.title }
                description={ project.description.description }
                key={ project.fields.urlSlug }
              />
            )}
          </div>
        </div>
      }
    </div>
  );
}

RelatedContent.propTypes = {
  articles: PropTypes.array,
  projects: PropTypes.array,
}

export default RelatedContent;
