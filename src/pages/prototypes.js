import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Navbar from "../components/navbar"
import PrototypeList from "../components/prototypeList"

const PrototypeOverview = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle} mode="prototype">
      <Navbar title="Prototypes" overview></Navbar>
      <PrototypeList />
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
  }
`
