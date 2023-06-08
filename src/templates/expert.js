import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

const ExpertTemplate = ({ data: { site, markdownRemark: post }, location }) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const image = getImage(post.frontmatter.featuredImage)
  console.log(post.frontmatter.featuredImage, image)

  return (
    <Layout location={location} title={siteTitle} mode="expert">
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        {post.frontmatter.featuredImage && <GatsbyImage image={image} />}
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default ExpertTemplate

export const pageQuery = graphql`
  query ExpertBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        subtitle
        featuredImage {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  }
`
