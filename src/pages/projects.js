import React from "react";
import {graphql} from "gatsby";
import PropTypes from "prop-types";

import PageLayout from "../layouts/PageLayout";
import PageMetadata from "../components/PageMetadata";
import Teaser from "../components/Teaser";

const ProjectsPage = ({data}) => {
  data = data.allContentfulProject;

  return (
    <PageLayout>
      <PageMetadata
        title={"Projects"}
      />
      <main className="mt-7 mb-10 sm:mt-14 sm:mb-20">
        {data.nodes.length > 0 &&
          <div className="max-w-2xl mx-auto px-2 mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">My Projects</h2>
            <p className="text-gray-700">Below you can find a list of all my projects including websites, python games and more. Why not check a few out!</p>
            <div className="mt-8">
              {data.nodes.map((project) =>
                <Teaser
                  url={ project.fields.urlSlug }
                  title={ project.title }
                  description={ project.description.description }
                  key={ project.fields.urlSlug }
                />
              )}
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
