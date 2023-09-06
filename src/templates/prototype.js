import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"
import ListItem from "../components/listItem"
import Navbar from "../components/navbar"
import { device } from "../utils/device"

const PostWrapper = styled.article`
  .legal {
    font-size: 0.8rem;
    opacity: 0.6;
    margin-top: 4em;
  }
`

const Infobox = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  .left,
  .right {
    padding: 1rem;

    & h2:first-child {
      margin-top: 0;
    }

    p {
      margin-bottom: 0.5rem;
    }

    & p:last-child {
      margin-bottom: 0;
    }
  }

  .left {
    background: var(--color-primary);

    a {
      text-decoration-color: white;
    }
  }

  .right {
    background: var(--color-light);
  }

  .legal {
    font-size: 0.8rem;
    opacity: 0.6;
    margin-top: 4em;
  }
`

const Gallery = styled.section`
  div {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;

    @media ${device.tablet} {
      grid-template-columns: ${props =>
        props.sum > 2 ? "1fr 1fr 1fr" : props.sum > 1 ? "1fr 1fr" : "1fr"};
    }
  }

  .gatsby-image-wrapper {
    aspect-ratio: 3/2;
  }
`

const PrototypeTemplate = ({
  data: { site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const featuredImage = getImage(post.frontmatter.featuredImage)

  // Generate images for gallery
  let galleryImages = []
  if (post.frontmatter.gallery)
    post.frontmatter.gallery.map(img => galleryImages.push(getImage(img)))

  return (
    <Layout location={location} title={siteTitle} mode="prototype">
      <Navbar title="Project detail" link="/prototypes" />
      <PostWrapper itemScope itemType="http://schema.org/Article">
        <section className="image">
          {post.frontmatter.featuredImage && (
            <GatsbyImage image={featuredImage} alt="" />
          )}
        </section>
        <header>
          <h1 itemProp="headline">{post.frontmatter.name}</h1>
          <p className="subtitle">{post.frontmatter.subtitle}</p>
        </header>

        <Infobox className="info">
          {post.frontmatter.challenge?.title && (
            <div className="left">
              <h2>Challenge</h2>
              <p>
                <strong>{post.frontmatter.challenge.title}</strong>
              </p>
              <p>{post.frontmatter.challenge.description}</p>
              <p>
                <a
                  href={`/expert${post.frontmatter.challenge.expert.fields.slug}`}
                >
                  {post.frontmatter.challenge.expert.frontmatter.name}
                </a>
              </p>
            </div>
          )}
          {post.frontmatter.team && (
            <div className="right">
              <h2>Team</h2>
              <p>{post.frontmatter.team}</p>
              <p>
                Contact:{" "}
                <a href={`mailto:${post.frontmatter.contactEmail}`}>
                  {post.frontmatter.contactEmail}
                </a>
              </p>
            </div>
          )}
        </Infobox>

        <section className="about">
          <h2>About the prototype</h2>
          <p
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
        </section>

        {post.frontmatter.outputs && (
          <section className="output">
            <h2>Outputs</h2>
            {post.frontmatter.outputs.map(output => (
              <ListItem label={output.type}>
                <a
                  href={output.url.publicURL}
                  target="_blank"
                  rel="noreferrer nofollow"
                >
                  {output.label}
                </a>
                <p>{output.description}</p>
              </ListItem>
            ))}
          </section>
        )}

        {galleryImages.length > 0 && (
          <Gallery className="gallery" sum={galleryImages.length}>
            <h2>Impressions</h2>
            <div>
              {galleryImages.map(img => (
                <GatsbyImage image={img} alt="" />
              ))}
            </div>
          </Gallery>
        )}

        {post.frontmatter.caption && (
          <footer className="legal">
            <p>{post.frontmatter.caption}</p>
          </footer>
        )}
      </PostWrapper>
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

export default PrototypeTemplate

export const pageQuery = graphql`
  query PrototypeBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        name
        date
        subtitle
        year
        team
        contactEmail
        caption
        outputs {
          type
          label
          url {
            publicURL
          }
          description
        }
        challenge {
          title
          description
          expert {
            fields {
              slug
            }
            frontmatter {
              name
            }
          }
        }
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              aspectRatio: 1.9
            )
          }
        }
        gallery {
          childImageSharp {
            id
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              aspectRatio: 1.5
            )
          }
        }
      }
    }
  }
`
