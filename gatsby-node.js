/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Define the templates
const prototype = path.resolve(`./src/templates/prototype.js`)
const expert = path.resolve(`./src/templates/expert.js`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  let result = await graphql(`
  {
    prototypes: allFile(
      sort: {childMarkdownRemark: {frontmatter: {date: ASC}}}, 
      limit: 1000, 
      filter: {sourceInstanceName: {eq: "prototype"}, internal: {mediaType: {eq: "text/markdown"}}})
      {
      nodes {
        childMarkdownRemark {
          id
          fields {
            slug
          }
        }
      }
    }
    experts: allFile(
      sort: {childMarkdownRemark: {frontmatter: {date: ASC}}}, 
      limit: 1000, 
      filter: {sourceInstanceName: {eq: "expert"}, internal: {mediaType: {eq: "text/markdown"}}})
      {
      nodes {
        childMarkdownRemark {
          id
          fields {
            slug
          }
        }
      }
    }
  }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const prototypes = result.data.prototypes.nodes
  console.log("prototypes result: ", prototypes)

  const experts = result.data.experts.nodes
  console.log("experts result: ", experts)

  // Create prototype pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (prototypes.length > 0) {
    prototypes.forEach((post, index) => {
    
      createPage({
        path: "prototype"+post.childMarkdownRemark.fields.slug,
        component: prototype,
        context: {
          id: post.childMarkdownRemark.id,
        },
      })
    })
  }

  if (experts.length > 0) {
    experts.forEach((post, index) => {
    
      createPage({
        path: "expert"+post.childMarkdownRemark.fields.slug,
        component: expert,
        context: {
          id: post.childMarkdownRemark.id,
        },
      })
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    #  @dontInfer after Node to disable auto type generation, not working with image, since declation is unclear
    type MarkdownRemark implements Node @dontInfer{
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      subtitle: String
      date: Date! @dateformat
      featuredImage: File @fileByRelativePath
      year: String
      challenge: ChallengesYaml @link(by: "slug")
      team: String
      contactEmail: String!
      outputs: Links
      gallery: [File] @fileByRelativePath
      name: String
      shortDescription: String
      further: Links!
      video: String!
      type: [String!]!
      challenges: [ChallengesYaml] @link(by: "slug", from: "fields.slug") # easy back-ref
    }

    type ChallengesYaml implements Node {
      slug: String
      title: String
      year: String
      expert: MarkdownRemark @link(by: "frontmatter.name")
      prototypes: [MarkdownRemark] @link(by: "frontmatter.challenge.slug", from: "slug") # easy back-ref
    }

    type Links{
      type: String
      label: String
      url: String
      description: String
    }

    type Fields {
      slug: String
    }
  `)
}
