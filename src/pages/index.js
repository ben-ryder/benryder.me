import React from "react";
import {graphql} from "gatsby";
import PropTypes from "prop-types";

import PageLayout from "../layouts/PageLayout";
import PageMetadata from "../components/PageMetadata";
import Teaser from "../components/Teaser";
import CTALink from "../components/CTALink";

const IndexPage = ({data}) => {
  return (
    <PageLayout>
      <PageMetadata
        title={"Home"}
      />
      <main className="pt-7 pb-10 sm:pt-14 sm:pb-20">
        <div className="max-w-2xl mx-auto px-2 mb-8">
          <h1 className="text-4xl font-extrabold text-brand-text-secondary sm:text-5xl">Hello, I&apos;m Ben Ryder</h1>
          <p className="text-2xl text-brand font-bold">Junior Developer</p>
          <p className="mt-3 prose leading-normal">
            I&apos;m a Junior Developer and Degree Apprentice.
            My day to day work is with Drupal and other web technologies.
            In my spare time I make websites, desktop apps, python games and
            anything else that catches my interest.
          </p>
          <p className="prose mt-2">
            Find me online:{" "}
            <a href="https://github.com/Ben-Ryder">GitHub</a> /{" "}
            <a href="https://www.linkedin.com/in/benryderdev/">LinkedIn</a> /{" "}
            <a href="https://www.drupal.org/u/ben-ryder">Drupal.org</a>.
          </p>
        </div>
        {data.allContentfulProject.nodes.length > 0 &&
          <div className="max-w-2xl mx-auto px-2 mb-8">
            <h2 className="text-3xl font-extrabold text-brand-text-secondary">Featured Projects</h2>
            <div className="mt-2">
              {data.allContentfulProject.nodes.map((project) =>
                <Teaser
                  url={ project.fields.urlSlug }
                  title={ project.title }
                  description={ project.description.description }
                  key={ project.fields.urlSlug }
                />
              )}
            </div>
            <div className="mt-3 flex justify-end font-bold text-brand-text-secondary">
              <CTALink url="/projects" text="View More" direction="right" />
            </div>
          </div>
        }
        {data.allContentfulArticle.nodes.length > 0 &&
          <div className="max-w-2xl mx-auto px-2 mb-8">
            <h2 className="text-3xl font-extrabold text-brand-text-secondary">Featured Articles</h2>
            <div className="mt-2">
              {data.allContentfulArticle.nodes.map((article) =>
                <Teaser
                  url={ article.fields.urlSlug }
                  title={ article.title }
                  description={ article.description.description }
                  key={ article.fields.urlSlug }
                />
              )}
            </div>
            <div className="mt-3 flex justify-end font-bold text-brand-text-secondary">
              <CTALink url="/blog" text="View More" direction="right" />
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
    allContentfulArticle(
      filter: {featured: {eq: true}}
      sort: {fields: publishedDate, order: DESC}
    ) {
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
    allContentfulProject(
      filter: {featured: {eq: true}}
      sort: {fields: publishedDate, order: DESC}
    ) {
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

export default IndexPage;
