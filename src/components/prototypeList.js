import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { PostGrid, Post } from "./styledComponents"
import ListItem from "./listItem"

const PrototypeList = ({ data }) => {
  let posts = data.prototypes.nodes

  if (posts.length === 0) {
    return <p>No prototypes found.</p>
  }

  return (
    <PostGrid style={{ listStyle: `none` }}>
      {posts.map(post => {
        post = post.childMarkdownRemark
        const title = post.frontmatter.name || post.fields.slug
        const image = getImage(post.frontmatter.featuredImage)

        return (
          <Post key={post.fields.slug}>
            <article
              className="prototype-list-item"
              itemScope
              itemType="http://schema.org/Article"
            >
              <section>
                {post.frontmatter.featuredImage && (
                  <GatsbyImage image={image} />
                )}
              </section>
              <header>
                <h2>
                  <Link to={`/prototype${post.fields.slug}`} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <p class="h3">{post.frontmatter.subtitle}</p>
              </header>
              <footer>
                <ul>
                  {post.frontmatter.challenge.title && (
                    <ListItem label="Prototype">
                      {post.frontmatter.challenge.title}
                    </ListItem>
                  )}
                  {post.frontmatter.year && (
                    <ListItem label="Year">{post.frontmatter.year}</ListItem>
                  )}
                </ul>
              </footer>
            </article>
          </Post>
        )
      })}
    </PostGrid>
  )
}

export default function MyPrototypeList(props) {
  return (
    <StaticQuery
      query={graphql`
        {
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
                fields {
                  slug
                }
                frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  name
                  subtitle
                  year
                  challenge {
                    title
                  }
                  featuredImage {
                    childImageSharp {
                      gatsbyImageData(
                        placeholder: BLURRED
                        layout: CONSTRAINED
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
      render={data => <PrototypeList data={data} {...props} />}
    />
  )
}
