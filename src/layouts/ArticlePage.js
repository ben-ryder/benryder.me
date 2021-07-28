import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import PageLayout from "../layouts/PageLayout";

import ProseContent from "../components/ProseContent";
import PageMetadata from "../components/PageMetadata";
import CTALink from "../components/CTALink";
import RelatedContent from "../components/RelatedContent";

const ArticlePage = ({ data }) => {
  data = data.contentfulArticle;

  return (
    <PageLayout>
      <PageMetadata
        title={data.metaData.title}
        description={data.metaData.description.description}
        keywords={data.metaData.keywords}
      />
      <main className="mt-5 mb-10 sm:mt-8 sm:mb-20">
        <div className="max-w-2xl mx-auto px-2 mb-8">
          <div className="font-bold text-gray-700">
            <CTALink url="/blog" text="All Posts" direction="left" />
          </div>
          <div className="mt-5 sm:mt-8">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {data.title}
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Published {data.publishedDate} / {data.fields.readingTime}
            </p>
          </div>
        </div>
        {data.body.childMarkdownRemark && (
          <ProseContent htmlString={data.body.childMarkdownRemark.html} />
        )}
        {(data.relatedArticles || data.relatedProjects) &&
          <RelatedContent
            articles={data.relatedArticles}
            projects={data.relatedProjects}
          />
        }
      </main>
    </PageLayout>
  );
};

ArticlePage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query ($articleID: String!) {
    contentfulArticle(id: { eq: $articleID }) {
      title
      description {
        description
      }
      publishedDate(formatString: "do MMM, YYYY")
      fields {
        readingTime
      }
      tags
      body {
        childMarkdownRemark {
          html
        }
      }
      metaData {
        title
        description {
          description
        }
        keywords
      }
      relatedArticles {
        title
        fields {
          urlSlug
        }
        description {
          description
        }
      }
      relatedProjects {
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

export default ArticlePage;
