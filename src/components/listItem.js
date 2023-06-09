import React from "react"
import styled from "styled-components"

import { Label } from "./styledComponents"

const Item = styled.li`
  display: grid;
  grid-template-columns: 5rem 4fr;
  margin-bottom: 0.5rem;
  margin-left: 0;
`

const ListItem = ({label, children}) => {
  return (
    <Item>
      <Label>{label}</Label>
      <div>{children}</div>
    </Item>
  )
}

export default ListItem
