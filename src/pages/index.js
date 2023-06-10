import React, { useEffect } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

import LogoFull from "../assets/Logo-complete.svg"
import cubus from "../images/Cubus.png"
import cubusOverlay from "../images/Cubus-overlay.png"

const BackgroundStyles = `
  background-repeat: no-repeat;
  background-position-x: calc(100% - 15rem);
  background-size: auto clamp(600px, 100vh, 800px);
  background-attachment: fixed;
`

const Homewrapper = styled.div`
  position: relative;
  margin: -2rem -4rem;
  padding: 2rem 50% 2rem 4rem;

  ${BackgroundStyles};
  background-image: url(${cubus});

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 2s ease-out; /* Adjust the transition duration as desired */

    ${BackgroundStyles};
    background-image: url(${cubusOverlay});
  }

  &:hover::before {
    opacity: 1;
  }
`

const VisibleArea = styled.div`
  height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .logo {
    position: sticky;
    top: 2rem;
    background: #fff;
    display: block;
  }

  .abstract {
    font-size: var(--fontSize-2);
    font-weight: 600;
  }
`

const OverflowArea = styled.div`
  z-index: 0;

  footer {
    display: flex;
    align-items: flex-end;

    ul {
      display: flex;
      flex: 50% 0 0;
      gap: 1rem;
      margin: 0;

      li {
        list-style-type: none;
        font-size: 0.8rem;
        margin: 0;

        a {
          text-decoration: none;
        }
      }
    }

    .logos {
      display: flex;
      // flex-wrap: wrap;
      gap: 1rem;

      div {
        flex: 50% 0 0;
      }

      img {
        filter: grayscale(100%);

        &:hover {
          filter: grayscale(0%);
        }
      }
    }
  }
`

const Home = ({ data: { site, markdownRemark: post }, location }) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  // Generate images for gallery
  let logos = []
  if (post.frontmatter.logos)
    post.frontmatter.logos.map(img => logos.push(getImage(img.image)))

  return (
    <Layout location={location} title={siteTitle}>
      <Homewrapper>
        <VisibleArea>
          <Link to="/" className="logo">
            <LogoFull width="100%" />
          </Link>
          <p className="abstract">{post.frontmatter.abstract}</p>
        </VisibleArea>
        <OverflowArea name="about">
          <p
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <footer>
            {post.frontmatter.legal && (
              <ul>
                {post.frontmatter.legal.map(link => (
                  <li>
                    <a
                      target="_blank"
                      rel="noreferrer nofollow"
                      href={link.url}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {logos.length > 0 && (
              <div className="logos">
                {logos.map((logo, i) => (
                  <a
                    target="_blank"
                    rel="noreferrer nofollow"
                    href={post.frontmatter.logos[i].url}
                  >
                    <GatsbyImage image={logo} objectFit="contain" />
                  </a>
                ))}
              </div>
            )}
          </footer>
        </OverflowArea>
      </Homewrapper>
    </Layout>
  )
}

export default Home

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: "/about/" } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        abstract
        logos {
          image {
            childImageSharp {
              gatsbyImageData(sizes: "200px")
            }
          }
          url
        }
        legal {
          label
          url
        }
      }
    }
  }
`
