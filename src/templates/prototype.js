import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Close from "../components/close"
import styled from "styled-components"

const PostWrapper = styled.article``

const Infobox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const PrototypeTemplate = ({
  data: { site, markdownRemark: post },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const featuredImage = getImage(post.frontmatter.featuredImage)
  let galleryImages = []
  if (post.frontmatter.gallery)
    post.frontmatter.gallery.map(img => galleryImages.push(getImage(img)))

  return (
    <Layout location={location} title={siteTitle} mode="prototype">
      <navbar>
        <p>Project detail</p>
        <Link to="/prototypes">
          <Close />
        </Link>
      </navbar>
      <PostWrapper itemScope itemType="http://schema.org/Article">
        <section>
          {post.frontmatter.featuredImage && (
            <GatsbyImage image={featuredImage} />
          )}
        </section>
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p class="subtitle">{post.frontmatter.subtitle}</p>
        </header>

        <Infobox className="info">
          {post.frontmatter.challenge.title && (
            <div class="left">
              <h2>Challenge</h2>
              <p>{post.frontmatter.challenge.title}</p>
              <p>
                Contact:{" "}
                <a
                  href={`/expert/${post.frontmatter.challenge.expert.fields.slug}`}
                >
                  {post.frontmatter.challenge.expert.frontmatter.name}
                </a>
              </p>
            </div>
          )}
          {post.frontmatter.team && (
            <div class="right">
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

        <section className="gallery">
          {galleryImages.length > 0 &&
            galleryImages.map(img => <GatsbyImage image={img} />)}
        </section>
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
        title
        date(formatString: "MMMM DD, YYYY")
        subtitle
        year
        team
        contactEmail
        outputs {
          type
          label
          url
          description
        }
        challenge {
          title
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
            id
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              aspectRatio: 1.4
            )
          }
        }
        gallery {
          childImageSharp {
            id
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              aspectRatio: 1.4
            )
          }
        }
      }
    }
  }
`
