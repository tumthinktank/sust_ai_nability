import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PrototypeList from "../components/prototypeList"
import ExpertList from "../components/expertList"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  
  return (
    <Layout location={location} title={siteTitle}>
      <p>HERE THE PROTOTYPES</p>
      <hr />
      <PrototypeList />
      <hr />
      <p>HERE THE EXPERTS</p>
      <hr />
      <ExpertList />
      <hr />
      <p>HERE THE OLD STUFF</p>      
    </Layout>
  )
}

export default BlogIndex

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`
