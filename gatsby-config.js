/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

// require("dotenv").config({
//   path: `.env`,
// })

module.exports = {
  siteMetadata: {
    title: `sustAInability – Perspectives and Prototypes`,
    author: {
      name: `Larissa Wunderlich`,
      summary: `For TUM Think Tank and Hochschule München`,
    },
    description: `sustAInability aims to contemplate AI and sustainability from different disciplinary perspectives. Based on a broad understanding of sustainability - encompassing aspects on the ecological, economic and social dimensions - an innovative teaching and learning space for students is to be created in order to explore the manifold potentials as well as challenges of AI-based applications, to critically reflect and to translate them into application-oriented projects.`,
    siteUrl: `https://www.hfp.tum.de/policy/projekte-in-forschung-lehre/lehrprojekte/digitalisierungskolleg-sustainability/`,
    social: {
      twitter: `PolicyTUM`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    `gatsby-transformer-yaml`,
    // {
    //   resolve: "gatsby-transformer-yaml-full",
    //   options: {
    //     plugins: [
    //       {
    //         resolve: "gatsby-yaml-full-markdown",
    //         options: {
    //           /* gatsby-yaml-full-markdown options here */
    //         },
    //       },
    //     ],
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/challenges`,
        name: `challenge`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/prototypes`,
        name: `prototype`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/experts`,
        name: `expert`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `page`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `Gatsby`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
  ],
  mapping: {
    mapping: {
      "markdownRemark.frontmatter.challenge": `challengesYaml.slug`,
      "challengesYaml.expert": `markdownRemark.frontmatter.name`,
    },
  },
}
