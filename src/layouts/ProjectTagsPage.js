import React from "react";
import {graphql} from "gatsby";
import PropTypes from "prop-types";

import PageLayout from "../layouts/PageLayout";
import PageMetadata from "../components/PageMetadata";
import Teaser from "../components/Teaser";
import TagFilterList from "../components/TagFilterList";

const ProjectTagsPage = ({data, pageContext}) => {
  return (
    <PageLayout>
      <PageMetadata
        title={"Projects"}
      />
      <main className="pt-7 pb-10 sm:pt-14 sm:pb-20">
        {data.allContentfulProject.nodes.length > 0 &&
          <div className="max-w-2xl mx-auto px-2 mb-8">
            <h1 className="text-3xl font-extrabold text-brand-text-primary">My Projects</h1>
            <p className="text-brand-text-primary">Below you can find a list of all my projects including websites, python games and more. Why not check a few out!</p>
            <div className="mt-8">
              <TagFilterList
                tagList={ data.allProjectTags.distinct }
                currentTag={ pageContext.tagName }
                tagHomeUrl={ "/projects" }
                tagUrl={ "/projects/tags/" }
              />
              <div className="mt-8">
                {data.allContentfulProject.nodes.map((project) =>
                  <Teaser
                    url={ project.fields.urlSlug }
                    title={ project.title }
                    description={ project.description.description }
                    key={ project.fields.urlSlug }
                  />
                )}
              </div>
            </div>
          </div>
        }
      </main>
    </PageLayout>
  );
};

ProjectTagsPage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
};

export const query = graphql`
  query AllProjectsWithTag($tagName: String!)  {
    allProjectTags: allContentfulProject {
      distinct(field: fields___tags___name)
    }
    allContentfulProject(
      filter: {fields: {tags: {elemMatch: {name: {eq: $tagName}}}}}
      sort: {fields: publishedDate, order: DESC}
    ) {
      nodes {
        title
        description {
          description
        }
        fields {
          urlSlug
        }
      }
    }
  }
`;

export default ProjectTagsPage;
