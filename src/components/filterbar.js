import React from "react"
import styled from "styled-components"

const Bar = styled.nav`
  margin-bottom: 2em;

  & > div{
    display: flex;
    gap: 1em;
  }
`

const FilterBar = ({ children }) => (
  <Bar>
    <h2>Filter</h2>
    <div>{children}</div>
  </Bar>
)

export default FilterBar
