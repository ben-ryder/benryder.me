import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";

/**
 * Page Metadata/SEO component.
 * Based on the gatsby example SEO component found here:
 * https://www.gatsbyjs.com/docs/add-seo-component/
 *
 * @param title
 * @param description
 * @param article
 * @param keywords
 * @return {JSX.Element}
 * @constructor
 */
const PageMetadata = ({ title, description, article, keywords }) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(defaultSEOQuery);

  const { defaultTitle, titleTemplate, defaultDescription, siteUrl } =
    site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname}`,
    keywords: keywords || null,
  };

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <meta name="description" content={seo.description} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      {seo.keywords && <meta name="keywords" content={keywords.join(",")} />}

      <meta name="twitter:card" content="summary_large_image" />

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
    </Helmet>
  );
};

// Default SEO Config
const defaultSEOQuery = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl
      }
    }
  }
`;

PageMetadata.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  article: PropTypes.bool,
  keywords: PropTypes.array,
};

export default PageMetadata;
