import React from "react"
import styled from "styled-components"

import { Label } from "./styledComponents"

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin-bottom: 0.5rem;
`

const listItem = ({label, children}) => {
  return (
    <ListItem>
      <Label>{label}</Label>
      {children}
    </ListItem>
  )
}

export default listItem
