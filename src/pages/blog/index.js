import React from "react";
import {graphql} from "gatsby";
import PropTypes from "prop-types";

import PageLayout from "../../layouts/PageLayout";
import PageMetadata from "../../components/PageMetadata";
import Teaser from "../../components/Teaser";
import TagFilterList from "../../components/TagFilterList";

const BlogPage = ({data}) => {
  return (
    <PageLayout>
      <PageMetadata
        title={"Articles"}
      />
      <main className="mt-7 mb-10 sm:mt-14 sm:mb-20">
        {data.allContentfulArticle.nodes.length > 0 &&
          <div className="max-w-2xl mx-auto px-2 mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">My Blog</h1>
            <p className="text-gray-700">Everything from tutorials, project walkthroughs and random thoughts.</p>
            <div className="mt-8">
              <TagFilterList
                tagList={ data.allArticleTags.distinct }
                tagHomeUrl={ "/blog" }
                tagUrl={ "/blog/tags/" }
                currentTag={ "View All" }
              />
              <div className="mt-8">
                {data.allContentfulArticle.nodes.map((article) =>
                  <Teaser
                    url={ article.fields.urlSlug }
                    title={ article.title }
                    description={ article.description.description }
                    key={ article.fields.urlSlug }
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

BlogPage.propTypes = {
    data: PropTypes.object,
};

export const query = graphql`
  query AllArticles {
    allArticleTags: allContentfulArticle {
        distinct(field: fields___tags___name)
    }
    allContentfulArticle(sort: {fields: publishedDate, order: DESC}) {
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

export default BlogPage;
