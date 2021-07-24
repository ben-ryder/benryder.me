import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import readingTime from "reading-time";

import PageLayout from "../layouts/PageLayout";

import ProseContent from "../components/ProseContent";
import PageMetadata from "../components/PageMetadata";

const ArticlePage = ({data}) => {
    data = data.contentfulArticle;

    const articleReadingTime = readingTime(data.body.childMarkdownRemark.html);

    return (
        <PageLayout>
            <PageMetadata
                title={data.title}
                description={data.description.description}
                keywords={data.keywords}
            />
            <main className="mt-7 mb-10 sm:mt-14 sm:mb-20">
                <div className="max-w-2xl mx-auto px-2 mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">{data.title}</h1>
                    <p className="mt-3 text-sm text-gray-500">Published {data.publishedDate} / { articleReadingTime.text }</p>
                </div>
                {data.body.childMarkdownRemark &&
                    <ProseContent htmlString={data.body.childMarkdownRemark.html} />
                }
            </main>
        </PageLayout>
    )
}

ArticlePage.propTypes = {
    data: PropTypes.object,
}

export const query = graphql`
    query ($articleID: String!) {
        contentfulArticle(id: {eq: $articleID}) {
            title
            description {
                description
            }
            publishedDate(formatString: "do MMM, YYYY")
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
        }
    }
`;

export default ArticlePage;
