import React, { useState } from "react"
import { graphql } from "gatsby"
import queryString from "query-string"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Navbar from "../components/navbar"
import PrototypeList from "../components/prototypeList"
import FilterBar from "../components/filterbar"
import Filter, { Item } from "../components/filter"
import { handleClick } from "../utils/handlers"

const PrototypeOverview = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const allYears = data.allMarkdownRemark.nodes

  const years = [...new Set(allYears.map(item => item.frontmatter.year))]
  const challenges = data.allChallengesYaml.nodes

  const queryParams = queryString.parse(location.search)
  const [selectedYear, setSelectedYear] = useState(queryParams.year || false)
  const [selectedChallenge, setSelectedChallenge] = useState(
    challenges.find(c => c.slug === queryParams.challenge) || false
  )

  const handleYearClick = filter =>
    handleClick(setSelectedYear, filter, "year", filter, location, queryParams)

  const handleChallengeClick = filter =>
    handleClick(
      setSelectedChallenge,
      filter,
      "challenge",
      filter.slug,
      location,
      queryParams
    )

  return (
    <Layout location={location} title={siteTitle} mode="prototype">
      <Navbar title="Prototypes" overview></Navbar>
      <p>
        Facing real-world problems in the intersection of sustainability and AI,
        interdisciplinary groups of students create prototypes for technical and
        non-technical solutions.
      </p>
      <FilterBar>
        <Filter
          label={selectedYear === false ? "Pick year" : selectedYear}
          isActive={selectedYear === false ? false : true}
          handleClick={handleYearClick}
        >
          {years.map((y, i) => (
            <Item key={i} onClick={() => handleYearClick(y)}>
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
          handleClick={handleChallengeClick}
        >
          {challenges.map(c => (
            <Item key={c.slug} onClick={() => handleChallengeClick(c)}>
              {c.title}
            </Item>
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
      filter: { linkedPrototypes: { elemMatch: { id: { ne: "" } } } }
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
