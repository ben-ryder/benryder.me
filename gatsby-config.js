// Load environment variables
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Ben Ryder",
    titleTemplate: "%s | Ben Ryder",
    description: "The personal website of Ben Ryder.",
    author: "Ben Ryder",
    siteUrl: "https://benryder.me"
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        environment: process.env.CONTENTFUL_ENVIRONMENT,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    "gatsby-plugin-eslint",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        footnotes: true,
        gfm: true,
        plugins: [
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              noInlineHighlight: true,
            }
          }
        ],
      },
    },
  ],
};
