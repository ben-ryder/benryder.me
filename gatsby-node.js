const path = require("path");

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
          titleSlug
        }
      }
    }
  `);

  result.data.allContentfulArticle.nodes.forEach((node) => {
    const url = "/blog/" + node.titleSlug;

    createPage({
      path: url,
      component: path.resolve("./src/layouts/ArticlePage.js"),
      context: {
        articleID: node.id,
      },
    });
  });
};
