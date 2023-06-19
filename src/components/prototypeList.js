import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { PostGrid, Post } from "./styledComponents"
import ListItem from "./listItem"

const PrototypeList = ({ prototypes, year, challenge }) => {
  
  // Filter empty index.md (no name)
  let posts = prototypes.filter(
    p => p.childMarkdownRemark?.frontmatter.name != null
  )

  // Apply filters if year or challenge are selected
  if (year) {
    posts = posts.filter(p => p.childMarkdownRemark.frontmatter.year === year)
  }

  if (challenge) {
    posts = posts.filter(
      p => p.childMarkdownRemark.frontmatter.challenge.slug === challenge
    )
  }

  if (posts.length === 0) {
    return (
      <p>
        No prototypes found that match your filter criteria. Try another
        combination or clear one of the filters.
      </p>
    )
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
                  <GatsbyImage image={image} alt="" />
                )}
              </section>
              <header>
                <h2>
                  <Link to={`/prototype${post.fields.slug}`} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <p>{post.frontmatter.subtitle}</p>
              </header>
              <footer>
                <ul>
                  {post.frontmatter.challenge?.title && (
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
  const data = useStaticQuery(graphql`
    query PrototypesQuery {
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
              date
              name
              subtitle
              year
              challenge {
                title
                slug
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
  `)

  return <PrototypeList prototypes={data.prototypes.nodes} {...props} />
}
