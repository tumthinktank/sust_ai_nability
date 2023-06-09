import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { PostGrid, Post } from "./styledComponents"

const ExpertList = ({ data }) => {
  const posts = data.experts.nodes

  if (posts.length === 0) {
    return <p>No experts found.</p>
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
                {post.frontmatter.image && (
                  <GatsbyImage image={image} />
                )}
              </section>
              <header>
                <h2>
                  <Link to={`/expert${post.fields.slug}`} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <p class="h3">{post.frontmatter.shortDescription}</p>
              </header>
            </article>
          </Post>
        )
      })}
    </PostGrid>
  )
}

export default function MyExpertList(props) {
  return (
    <StaticQuery
      query={graphql`
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
      `}
      render={data => <ExpertList data={data} {...props} />}
    />
  )
}
