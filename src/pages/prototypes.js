import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Navbar from "../components/navbar"
import PrototypeList from "../components/prototypeList"
import FilterBar from "../components/filterbar"
import Filter, { Item } from "../components/filter"

const PrototypeOverview = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const allYears = data.allMarkdownRemark.nodes
  
  const years = [...new Set(allYears.map(item => item.frontmatter.year))];  
  const challenges = data.allChallengesYaml.nodes

  const [selectedYear, setSelectedYear] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(false)

  const handleYearClick = filter => {
    setSelectedYear(filter)
    console.log(filter, " clicked")
  }

  const handleChallengeClick = filter => {
    setSelectedChallenge(filter)
    console.log(filter, " clicked")
  }

  return (
    <Layout location={location} title={siteTitle} mode="prototype">
      <Navbar title="Prototypes" overview></Navbar>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <FilterBar>
        <Filter
          label={selectedYear === false ? "Pick year" : selectedYear}
          isActive={selectedYear === false ? false : true}
        >
          <Item onClick={() => handleYearClick(false)} clear>
            Clear selection
          </Item>
          {years.map(y => (
            <Item onClick={() => handleYearClick(y)}>
              {y}
            </Item>
          ))}
        </Filter>
        <Filter
          label={
            selectedChallenge === false
              ? "Pick challenge"
              : selectedChallenge.title
          }
          isActive={selectedChallenge === false ? false : true}
        >
          <Item
            onClick={() => handleChallengeClick(false)}
            clear
          >
            Clear selection
          </Item>
          {challenges.map(c => (
            <Item key={c.slug} onClick={() => handleChallengeClick(c)}>{c.title}</Item>
          ))}
        </Filter>
      </FilterBar>
      <PrototypeList year={selectedYear} challenge={selectedChallenge.slug} />
    </Layout>
  )
}

export default PrototypeOverview

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Prototypes" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allChallengesYaml(
      filter: { prototypes: { elemMatch: { id: { ne: "" } } } }
    ) {
      nodes {
        title
        slug
      }
    }
    allMarkdownRemark(filter: { frontmatter: { year: { ne: null } } }) {
      nodes {
        frontmatter {
          year
        }
      }
    }
  }
`
