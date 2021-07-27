import React from "react";
import {graphql} from "gatsby";
import PropTypes from "prop-types";

import PageLayout from "../layouts/PageLayout";
import PageMetadata from "../components/PageMetadata";
import Teaser from "../components/Teaser";
import TagList from "../components/TagList";

const ProjectsPage = ({data}) => {
  return (
    <PageLayout>
      <PageMetadata
        title={"Projects"}
      />
      <main className="mt-7 mb-10 sm:mt-14 sm:mb-20">
        {data.allContentfulProject.nodes.length > 0 &&
          <div className="max-w-2xl mx-auto px-2 mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">My Projects</h1>
            <p className="text-gray-700">Below you can find a list of all my projects including websites, python games and more. Why not check a few out!</p>
            <div className="mt-8">
              <TagList
                tagList={ data.allProjectTags.distinct }
                tagHomeUrl={ "/projects" }
                tagUrl={ "/projects/tags/" }
                currentTag={ "View All" }
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

ProjectsPage.propTypes = {
    data: PropTypes.object,
};

export const query = graphql`
  query AllProjects {
    allProjectTags: allContentfulProject {
      distinct(field: fields___tags___name)
    }
    allContentfulProject(sort: {fields: publishedDate, order: DESC}) {
      nodes {
        title
        fields {
          urlSlug
        }
        description {
          description
        }
      }
    }
  }
`;

export default ProjectsPage;
