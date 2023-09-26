import React from "react"
import styled from "styled-components"

import { device } from "../utils/device"

const Bar = styled.nav`
  margin-bottom: 2em;

  & > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;

    @media ${device.tablet} {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`

const FilterBar = ({ children }) => (
  <Bar>
    <h2>Filter</h2>
    <div>{children}</div>
  </Bar>
)

export default FilterBar
