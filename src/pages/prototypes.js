import React, { useState, useEffect } from "react"
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
  const challengeNodes = data.allChallengesYaml.nodes
  const years = [...new Set(challengeNodes.map(item => item.year).filter(Boolean))]
  const queryParams = queryString.parse(location.search)

  const [selectedYear, setSelectedYear] = useState(queryParams.year || false)
  const [selectedChallenge, setSelectedChallenge] = useState(
    challengeNodes.find(c => c.slug === queryParams.challenge) || false
  )

  const filteredChallenges = selectedYear
    ? challengeNodes.filter(c => c.year === selectedYear)
    : challengeNodes

  useEffect(() => {
    if (selectedYear && selectedChallenge && selectedChallenge.year !== selectedYear) {
      setSelectedChallenge(false)
    }

    if (selectedChallenge && !selectedYear) {
      setSelectedYear(selectedChallenge.year)
    }
  }, [selectedYear, selectedChallenge])

  const handleYearClick = filter => {
    setSelectedYear(filter)
    setSelectedChallenge(current => {
      if (filter === false) return false
      if (current && current.year !== filter) return false
      return current
    })

    handleClick(setSelectedYear, filter, "year", filter, location, queryParams)
  }

  const handleChallengeClick = filter => {
    const nextChallenge = filter === false ? false : filter

    setSelectedChallenge(nextChallenge)
    if (nextChallenge) {
      setSelectedYear(nextChallenge.year)
    }

    handleClick(
      setSelectedChallenge,
      nextChallenge,
      "challenge",
      nextChallenge ? nextChallenge.slug : false,
      location,
      queryParams
    )
  }

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
          handleClick={filter => handleYearClick(filter)}
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
          handleClick={filter => handleChallengeClick(filter)}
        >
          {filteredChallenges.map(c => (
            <Item key={c.slug} onClick={() => handleChallengeClick(c)}>
              {c.title}
            </Item>
          ))}
        </Filter>
      </FilterBar>
      <PrototypeList year={selectedYear} challenge={selectedChallenge?.slug || false} />
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
        year
      }
    }
  }
`
