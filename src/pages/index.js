import React from "react";
import {graphql} from "gatsby";
import PropTypes from "prop-types";

import PageLayout from "../layouts/PageLayout";
import PageMetadata from "../components/PageMetadata";
import LinkComponent from "../components/elements/LinkComponent";

const IndexPage = ({data}) => {
  console.log(data);

  return (
    <PageLayout>
      <PageMetadata
        title={"Home"}
      />
      <main className="mt-7 mb-10 sm:mt-14 sm:mb-20">
        <div className="max-w-2xl mx-auto px-2 mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Hello, I&apos;m Ben Ryder</h1>
          <p className="text-2xl text-blue-600 font-bold">Apprentice Developer</p>
          <p className="mt-3 prose leading-normal">
            I&apos;m an Apprentice Developer and Degree Apprentice.
            My day to day work is with Drupal and other web technologies.
            In my spare time I make websites, desktop apps, python games and
            anything else that catches my interest.
          </p>
          <p className="prose mt-2">Find me online: <a href="">GitHub</a>, <a href="">LinkedIn</a>, <a href="">Drupal.org</a>.</p>
        </div>
        {data.allContentfulProject.nodes.length > 0 &&
          <div className="max-w-2xl mx-auto px-2 mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Projects</h2>
            <div className="mt-2">
              {data.allContentfulProject.nodes.map((project) =>
                <div key={ project.title } className="mt-2">
                  <LinkComponent url={ "/projects/" + project.titleSlug }>
                    <h3 className="text-2xl font-extrabold text-gray-800">{ project.title }</h3>
                    <p className="text-gray-700">{ project.description.description }</p>
                  </LinkComponent>
                </div>
              )}
            </div>
          </div>
        }
        {data.allContentfulArticle.nodes.length > 0 &&
          <div className="max-w-2xl mx-auto px-2 mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Articles</h2>
            <div className="mt-2">
              {data.allContentfulArticle.nodes.map((article) =>
                <div key={ article.title } className="mt-2">
                  <LinkComponent url={ "/blog/" + article.titleSlug }>
                    <h3 className="text-2xl font-extrabold text-gray-800">{ article.title }</h3>
                    <p className="text-gray-700">{ article.description.description }</p>
                  </LinkComponent>
                </div>
              )}
            </div>
          </div>
        }
      </main>
    </PageLayout>
  );
};

IndexPage.propTypes = {
    data: PropTypes.object,
};

export const query = graphql`
  query FeaturedContent {
    allContentfulArticle(filter: {featured: {eq: true}}) {
        nodes {
            title
            titleSlug
            description {
                description
            }
        }
    }
    allContentfulProject(filter: {featured: {eq: true}}) {
        nodes {
            title
            titleSlug
            description {
                description
            }
        }
    }
  }
`;

export default IndexPage;
