import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Navbar from "../components/navbar"
import ExpertList from "../components/expertList"
import FilterBar from "../components/filterbar"
import Filter, { Item } from "../components/filter"

const ExpertOverview = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const allTypes = data.allMarkdownRemark.nodes

  const types = [...new Set(allTypes.flatMap(item => item.frontmatter.type))]
  // console.log("types: ", allTypes, types)
  const [selectedType, setSelectedType] = useState(false) 

  const handleTypeClick = filter => {
    setSelectedType(filter)
    // console.log(filter, " clicked")
  }

  return (
    <Layout location={location} title={siteTitle} mode="expert">
      <Navbar title="Experts and challenge givers" overview></Navbar>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <FilterBar>
        <Filter
          label={selectedType === false ? "Pick type" : selectedType}
          isActive={selectedType === false ? false : true}
          handleClick={handleTypeClick}
        >
          {types.map((t, i) => (
            <Item key={i} onClick={() => handleTypeClick(t)}>
              {t}
            </Item>
          ))}
        </Filter>
      </FilterBar>
      <ExpertList type={selectedType}/>
    </Layout>
  )
}

export default ExpertOverview

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Experts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: { frontmatter: { type: { ne: null } } }) {
      nodes {
        frontmatter {
          type
        }
      }
    }
  }
`
