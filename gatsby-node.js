const path = require("path");
const readingTime = require("reading-time");

/**
 * Implements Gatsby's onCreateNode hook
 * Used to add custom fields to nodes:
 * - urlSlug on articles and projects used for page creation and linking.
 * - readingTime on articles.
 *
 * @param node
 * @param actions
 * @param getNode
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "ContentfulArticle") {
    // Add urlSlug used to create the article page.
    createNodeField({
      node,
      name: "urlSlug",
      value: "/blog/" + node.titleSlug
    })

    // Add readingTime field to article.
    const articleBody = getNode(node.body___NODE);
    const articleReadingTime = readingTime(articleBody.body);
    createNodeField({
      node,
      name: "readingTime",
      value: articleReadingTime.text
    })
  }
  else if(node.internal.type === "ContentfulProject") {
    // Add urlSlug used to create the article page.
    createNodeField({
      node,
      name: "urlSlug",
      value: "/projects/" + node.titleSlug
    })
  }
}

/**
 * Implements Gatsby's createPages hook
 * Used to create pages based on articles pulled from contentful (ContentfulArticle)
 *
 * @param createResolvers
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query AllArticles {
      allContentfulArticle {
        nodes {
          id
          fields {
            urlSlug
          }
        }
      }
    }
  `);

  result.data.allContentfulArticle.nodes.forEach((node) => {
    createPage({
      path: node.fields.urlSlug,
      component: path.resolve("./src/layouts/ArticlePage.js"),
      context: {
        articleID: node.id,
      },
    });
  });
};
