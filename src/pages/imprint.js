import React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import styled from "styled-components"

import LogoFull from "../assets/Logo-complete.svg"

const ImprintWrapper = styled.div`
  main p{
    white-space: pre-wrap;
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
          &:hover{
            text-decoration: 8px underline #00e08aaa;
          }
        }
      }
    }
  }
`

const Imprint = ({ data: { site, markdownRemark: post }, location }) => {
  const siteTitle = site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle} mode="subpage">
      <ImprintWrapper>
        <Link to="/" className="logo">
          <LogoFull width="100%" />
        </Link>

        <main
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <footer>
          {post.frontmatter.legal && (
            <ul>
              {post.frontmatter.legal.map((link, i) => (
                <li key={i}>
                  <a target="_blank" rel="noreferrer nofollow" href={link.url}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </footer>
      </ImprintWrapper>
    </Layout>
  )
}

export default Imprint

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Imprint" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: "/imprint/" } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        legal {
          label
          url
        }
      }
    }
  }
`
