import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { PostGrid, Post } from "./styledComponents"

const ExpertList = ({ experts, type }) => {

  // console.log("here", experts)

  // Filter empty index.md (no name)
  let posts = experts.filter(
    p => p.childMarkdownRemark?.frontmatter.name != null
  )

  // Apply filters
  if (type) {
    posts = posts.filter(p =>
      p.childMarkdownRemark.frontmatter.type.includes(type)
    )
  }

  if (posts.length === 0) {
    return <p> No experts found.</p>
  }

  return (
    <PostGrid style={{ listStyle: `none` }}>
      {posts.map(post => {
        post = post.childMarkdownRemark
        const title = post.frontmatter.name || post.fields.slug
        const image = getImage(post.frontmatter.image)

        return (
          <Post key={post.fields.slug}>
            <article
              className="prototype-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <section>
                {post.frontmatter.image && <GatsbyImage image={image} alt="" />}
              </section>
              <header>
                <h2>
                  <Link to={`/expert${post.fields.slug}`} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <p>{post.frontmatter.shortDescription}</p>
              </header>
            </article>
          </Post>
        )
      })}
    </PostGrid>
  )
}

export default function MyExpertList(props) {
  const data = useStaticQuery(graphql`
    {
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
            fields {
              slug
            }
            frontmatter {
              name
              shortDescription
              type
              image {
                childImageSharp {
                  gatsbyImageData(
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                    aspectRatio: 1.4
                  )
                }
              }
            }
          }
        }
      }
    }
  `)

  return <ExpertList experts={data.experts.nodes} {...props} />
}
