import React, { Suspense } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { device } from "../utils/device"

import LogoFull from "../assets/Logo-complete.svg"
import CubusMobile from "../assets/Cubus-mobile.svg"

const BackgroundImage = React.lazy(() =>
  import("../components/BackgroundImage")
)

const Homewrapper = styled.div`
  position: relative;
  margin: -2rem -4rem;
  padding: 2rem 4rem;

  @media ${device.tablet} {
    padding: 2rem 50% 2rem 4rem;
  }
`

const VisibleArea = styled.div` #
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  display: flex;

  height: calc(100vh - 9em);   
  @media ${device.tablet} {
    height: calc(100vh - 4rem);
  }

  .logo {
    position: sticky;
    top: -1rem;
    background: #fff;
    display: block;
    margin: -1rem;
    padding: 1rem;

    @media ${device.tablet} {
      top: 1rem;
      padding: 3rem 1rem;
      // background: transparent;
    }
  }

  .abstract {
    font-size: var(--fontSize-2);
    font-weight: 600;
    display: none;

    @media ${device.tablet} {
      display: block;
    }
  }

  .cubus{
    display: block;
    margin-left: -2rem;
    margin-right: -2rem;
    width: calc(100vw + 2rem);
    height: auto;

    @media ${device.tablet} {
      display: none;
    }
  }
`

const OverflowArea = styled.div`
  z-index: 0;

  .abstract {
    font-size: var(--fontSize-1);
    font-weight: 600;
    margin-top: 2rem;

    display: block;

    @media ${device.tablet} {
      display: none;
    }
  }

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
          &:hover {
            text-decoration: 8px underline #00e08aaa;
          }
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
  const siteTitle =
    site.siteMetadata?.title ||
    `SustAInability · Perspecives and Prototypes for a Sustainable AI`

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
          <CubusMobile className="cubus" width="100%" />
        </VisibleArea>

        <OverflowArea name="about">
          <p className="abstract">{post.frontmatter.abstract}</p>
          <p
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
          <footer>
            {post.frontmatter.legal && (
              <ul>
                {post.frontmatter.legal.map((link, i) => (
                  <li key={i}>
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
                    key={i}
                    rel="noreferrer nofollow"
                    href={post.frontmatter.logos[i].url}
                  >
                    <GatsbyImage
                      image={logo}
                      objectFit="contain"
                      alt="Logo sustAInability"
                    />
                  </a>
                ))}
              </div>
            )}
          </footer>
        </OverflowArea>
        <Suspense>
          <BackgroundImage />
        </Suspense>
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
