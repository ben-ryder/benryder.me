import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";

import PageLayout from "../layouts/PageLayout";

import ProseContent from "../components/ProseContent";
import PageMetadata from "../components/PageMetadata";
import CTALink from "../components/CTALink";
import RelatedContent from "../components/RelatedContent";
import MetadataSection from "../components/MetadataSection";
import TagList from "../components/TagList";
import TableOfContents from "../components/TableOfContents";

import { Calendar as CalendarIcon, Clock as ClockIcon } from "lucide-react";

const ArticlePage = ({ data }) => {
  data = data.contentfulArticle;

  const tocLinks = data.body.childMarkdownRemark.headings.map(heading => {
    return {
      text: heading.value,
      link: "#" + heading.id,
      depth: heading.depth
    }
  });

  return (
    <PageLayout>
      <PageMetadata
        title={data.metaData.title}
        description={data.metaData.description.description}
        keywords={data.metaData.keywords}
      />
      <main className="pt-7 pb-10 sm:pt-14 sm:pb-20">
        <div className="max-w-2xl mx-auto px-2 mb-8">
          <div className="font-bold text-brand-text-primary">
            <CTALink url="/blog" text="All Posts" direction="left" />
          </div>
          <div className="mt-5 sm:mt-8">
            <h1 className="text-4xl font-extrabold text-brand-text-primary">
              {data.title}
            </h1>
            <MetadataSection
              data={[
                {
                  text: "Published " + data.publishedDate,
                  icon: <CalendarIcon size="20" className="stroke-brand" />
                },
                {
                  text: data.fields.readingTime,
                  icon: <ClockIcon size="20" className="stroke-brand" />
                }
              ]}
            />
          </div>
        </div>
        {tocLinks.length > 0 &&
          <TableOfContents links={tocLinks} />
        }
        {data.body.childMarkdownRemark && (
          <ProseContent htmlString={data.body.childMarkdownRemark.html} />
        )}
        <div className="max-w-2xl mx-auto mt-8 px-2">
          <TagList tagList={data.tags} tagUrl="/blog/tags/" />
        </div>
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
          headings {
            id
            value
            depth  
          }
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
