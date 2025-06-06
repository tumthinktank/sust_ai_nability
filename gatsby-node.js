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
      challenges: allChallengesYaml {
        nodes {
          experts {
            frontmatter {
              name
            }
          }
        }
      }
      prototypes: allFile(
        sort: { childMarkdownRemark: { frontmatter: { date: ASC } } }
        limit: 1000
        filter: {
          sourceInstanceName: { eq: "prototype" }
          internal: { mediaType: { eq: "text/markdown" } }
        }
      ) {
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
        sort: { childMarkdownRemark: { frontmatter: { date: ASC } } }
        limit: 1000
        filter: {
          sourceInstanceName: { eq: "expert" }
          internal: { mediaType: { eq: "text/markdown" } }
        }
      ) {
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
  // console.log("prototypes result: ", prototypes)

  const experts = result.data.experts.nodes
  // console.log("experts result: ", experts)

  const challenges = result.data.challenges.nodes
  // console.log("challenges result: ", challenges)

  // Create prototype pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (prototypes.length > 0) {
    prototypes.forEach((post, index) => {
      if (post.childMarkdownRemark) {
        createPage({
          path: "prototype" + post.childMarkdownRemark.fields.slug,
          component: prototype,
          context: {
            id: post.childMarkdownRemark.id,
          },
        })
      }
    })
  }

  if (experts.length > 0) {
    experts.forEach((post, index) => {
      challenges.forEach(node => {
        // console.log("node name:", node.expert.frontmatter.name)
        // console.log("post name:", post.childMarkdownRemark.frontmatter.name)
        if (
          node.expert &&
          node.expert.frontmatter.name ===
            post.childMarkdownRemark.frontmatter.name
        ) {
          // console.log("post challenges:", post.childMarkdownRemark.frontmatter.challenges)
          post.childMarkdownRemark.frontmatter.challenges =
            post.childMarkdownRemark.frontmatter.challenges || []
          post.childMarkdownRemark.frontmatter.challenges.push(node)
        }
      })

      createPage({
        path: "expert" + post.childMarkdownRemark.fields.slug,
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
    // console.log("Slug creation", node, value)
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
  const typeDefs = `
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      keywords: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    #  @dontInfer after Node to disable auto type generation
    type MarkdownRemark implements Node @dontInfer{
      frontmatter: Frontmatter
      fields: Fields
      # challenges: [ChallengesYaml] @link(by: "expert.frontmatter.name")
    }

    type Frontmatter {
      # ----- page -----
      abstract: String
      logos: [Logo]
      legal: [SimpleLink]
      # ----- prototype -----
      name: String
      subtitle: String
      date: Date @dateformat
      featuredImage: File @fileByRelativePath
      year: String
      challenge: ChallengesYaml @link(by: "slug")
      team: String
      contactEmail: String
      outputs: [Link]
      gallery: [File] @fileByRelativePath
      # ----- expert -----
      shortDescription: String
      image: File @fileByRelativePath
      further: [Link]
      type: [String]
      # challenges: [ChallengesYaml] @link(by: "expert.frontmatter.name", from: "frontmatter: name") # backref not working
      caption: String
    }

    type ChallengesYaml implements Node {
      slug: String
      title: String
      description: String
      year: String
      expert: MarkdownRemark @link(by: "frontmatter.name")
      experts: [MarkdownRemark] @link(by: "frontmatter.name")
      linkedPrototypes: [MarkdownRemark] @link(by: "frontmatter.challenge.slug", from: "slug") # backref working
    }

    type Link{
      type: String
      label: String
      iUrl: File @fileByRelativePath
      eUrl: String
      description: String
    }

    type Logo{
      image: File @fileByRelativePath
      url: String
    }

    type SimpleLink{
      label: String
      url: String
    }

    type Fields {
      slug: String
    }
  `

  createTypes(typeDefs)
}
