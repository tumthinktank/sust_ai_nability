import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Navbar from "../components/navbar"
import ListItem from "../components/listItem"

const PostWrapper = styled.article`
  .legal {
    font-size: 0.8rem;
    opacity: 0.6;
    margin-top: 4em;
  }
`

const ExpertTemplate = ({
  data: { site, markdownRemark: post, allChallengesYaml: challenges },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title || `Title`
  const image = getImage(post.frontmatter.image)

  // console.log("x:", {post, challenges})
  let initiatedChallenges = challenges.nodes
  // console.log("a", initiatedChallenges)
  initiatedChallenges = initiatedChallenges.filter(
    c => c.expert.frontmatter.name === post.frontmatter.name
  )
  // console.log("b", initiatedChallenges)

  // if(!post.frontmatter.challenges){
  //   console.log("here")
  //   post.frontmatter.challenges = []
  //   challenges.forEach((c) => {
  //     if(c.name === post.frontmatter.name)
  //       post.frontmatter.challenges.push(c) }
  //   )
  //   console.log(post.frontmatter.challenges)
  // }

  return (
    <Layout location={location} title={siteTitle} mode="expert">
      <Navbar title="Detail" link="/experts" />
      <PostWrapper itemScope itemType="http://schema.org/Article">
        <section className="image">
          {post.frontmatter.image && <GatsbyImage image={image} alt="" />}
        </section>
        <header>
          <h1 itemProp="headline">{post.frontmatter.name}</h1>
          <p className="subtitle">{post.frontmatter.shortDescription}</p>
        </header>

        <section className="about">
          <h2>About</h2>
          <p
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
        </section>

        {post.frontmatter.further && (
          <section className="output">
            <h2>Further</h2>
            {post.frontmatter.further.map((link, i) => (
              <ListItem label={link.type} key={i}>
                <a href="output.url" target="_blank" rel="noreferrer nofollow">
                  {link.label}
                </a>
                <p>{link.description}</p>
              </ListItem>
            ))}
          </section>
        )}

        {initiatedChallenges.length > 0 && (
          <section className="challenges">
            <h2>Challenges</h2>
            {initiatedChallenges.map((c, i) => (
              <ListItem label={c.year} key={i}>
                <strong>{c.title}</strong>

                <p>{c.description}</p>
              </ListItem>
            ))}
          </section>
        )}

        {post.frontmatter.caption && (
          <footer className="legal">
            {post.frontmatter.further.map((link, i) => (
              <p>{post.frontmatter.caption}</p>
            ))}
          </footer>
        )}
      </PostWrapper>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => {
  return (
    <Seo
      title={post.frontmatter.name}
      description={post.frontmatter.subtitle || post.excerpt}
    />
  )
}

export default ExpertTemplate

export const pageQuery = graphql`
  query ExpertBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allChallengesYaml {
      nodes {
        title
        description
        year
        expert {
          frontmatter {
            name
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt
      frontmatter {
        name
        shortDescription
        date(formatString: "DD MMMM YYYY")
        image {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              aspectRatio: 1.7
            )
          }
        }
        further {
          type
          label
          url
          description
        }
        caption
      }
    }
  }
`
