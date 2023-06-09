import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import styled from "styled-components"
import ListItem from "../components/listItem"
import Navbar from "../components/navbar"

const PostWrapper = styled.article``

const Infobox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  .left, .right{
    padding: 1rem;

    & h2:first-child{
      margin-top: 0;
    }

    p{
      margin-bottom: .5rem;
    }

    & p:last-child{
      margin-bottom: 0;
    }
  }

  .left{
    background: var(--color-primary);

    a{
      text-decoration-color: white;
    }
  }

  .right{
    background: var(--color-light);
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
        <section class="image">
          {post.frontmatter.featuredImage && (
            <GatsbyImage image={featuredImage} />
          )} 
        </section>
        <header>
          <h1 itemProp="headline">{post.frontmatter.name}</h1>
          <p class="subtitle">{post.frontmatter.subtitle}</p>
        </header>

        <Infobox className="info">
          {post.frontmatter.challenge.title && (
            <div class="left">
              <h2>Challenge</h2>
              <p><strong>{post.frontmatter.challenge.title}</strong></p>
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

        {post.frontmatter.outputs && (
          <section className="output">
            <h2>Outputs</h2>
            {post.frontmatter.outputs.map(output => (
              <ListItem label={output.type}>
                <a href="output.url" target="_blank" rel="noreferrer nofollow">
                  {output.label}
                </a>
                <p>{output.description}</p>
              </ListItem>
            ))}
          </section>
        )}

        {galleryImages.length > 0 && (
          
          <section className="gallery">
            <h2>Impressions</h2>
            {galleryImages.map(img => (
              <GatsbyImage image={img} />
            ))}
          </section>
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
              aspectRatio: 1.4
            )
          }
        }
      }
    }
  }
`
