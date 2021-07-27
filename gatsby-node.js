const path = require("path");
const readingTime = require("reading-time");

/**
 * Implements Gatsby's onCreateNode hook
 * Used to add custom fields to nodes:
 * - urlSlug on articles and projects.
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

    // Preprocess article tags to add the urlSlug.
    if (Array.isArray(node.tags)) {
      const articleTags = node.tags.map(tag => {
        return {
          name: tag,
          urlSlug: "/blog/tags/" + tag,
        }
      });

      createNodeField({
        node,
        name: "tags",
        value: articleTags
      })
    }
  }
  else if(node.internal.type === "ContentfulProject") {
    // Add urlSlug used to create the article page.
    createNodeField({
      node,
      name: "urlSlug",
      value: "/projects/" + node.titleSlug
    })

    // Preprocess project tags to add the urlSlug.
    if (Array.isArray(node.tags)) {
      const projectTags = node.tags.map(tag => {
        return {
          name: tag,
          urlSlug: "/projects/tags/" + tag,
        }
      });

      createNodeField({
        node,
        name: "tags",
        value: projectTags
      })
    }
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

  // Create Basic Pages
  const basicPageResults = await graphql(`
    query AllBasicPages {
      allContentfulBasicPage {
        nodes {
          id
          url
        }
      }
    }
  `);

  basicPageResults.data.allContentfulBasicPage.nodes.forEach((node) => {
    createPage({
      path: node.url,
      component: path.resolve("./src/layouts/BasicPage.js"),
      context: {
        pageID: node.id,
      },
    });
  });

  // Create Article Pages
  const articlesResult = await graphql(`
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

  articlesResult.data.allContentfulArticle.nodes.forEach((node) => {
    createPage({
      path: node.fields.urlSlug,
      component: path.resolve("./src/layouts/ArticlePage.js"),
      context: {
        articleID: node.id,
      },
    });
  });

  // Create article tag pages.
  const articleTagsResult = await graphql(`
    query AllArticleTags {
      allContentfulArticle {
        group(field: fields___tags___name) {
          tagName: fieldValue
        }
      }
    }
  `);

  articleTagsResult.data.allContentfulArticle.group.forEach(tag => {
    createPage({
      path: "/blog/tags/" + tag.tagName,
      component: path.resolve("./src/layouts/ArticleTagsPage.js"),
      context: {
        tagName: tag.tagName,
      },
    });
  })

  // Create project pages
  const projectPagesResult = await graphql(`
    query AllProjects {
      allContentfulProject {
        nodes {
          id
          fields {
            urlSlug
          }
        }
      }
    }
  `);

  projectPagesResult.data.allContentfulProject.nodes.forEach((node) => {
    createPage({
      path: node.fields.urlSlug,
      component: path.resolve("./src/layouts/ProjectPage.js"),
      context: {
        projectID: node.id,
      },
    });
  });

  // Create project tag pages.
  const projectTagsResult = await graphql(`
    query AllProjectTags {
      allContentfulProject {
        group(field: fields___tags___name) {
          tagName: fieldValue
        }
      }
    }
  `);

  projectTagsResult.data.allContentfulProject.group.forEach(tag => {
    createPage({
      path: "/projects/tags/" + tag.tagName,
      component: path.resolve("./src/layouts/ProjectTagsPage.js"),
      context: {
        tagName: tag.tagName,
      },
    });
  })
};
