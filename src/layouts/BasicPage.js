import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import PageLayout from "../layouts/PageLayout";

import ProseContent from "../components/ProseContent";
import PageMetadata from "../components/PageMetadata";

const BasicPage = ({ data }) => {
  data = data.contentfulBasicPage;

  return (
    <PageLayout>
      <PageMetadata
        title={data.metaData.title}
        description={data.metaData.description}
        keywords={data.metaData.keywords}
      />
      <main className="mt-7 mb-10 sm:mt-14 sm:mb-20">
        {data.body.childMarkdownRemark && (
          <ProseContent htmlString={data.body.childMarkdownRemark.html} />
        )}
      </main>
    </PageLayout>
  );
};

BasicPage.propTypes = {
  data: PropTypes.object,
};

export const query = graphql`
  query ($pageID: String!) {
    contentfulBasicPage(id: { eq: $pageID }) {
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
    }
  }
`;

export default BasicPage;
