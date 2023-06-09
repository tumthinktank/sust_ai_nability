import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import Close from "../components/close"

const Bar = styled.li`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: center;

  p, h1 {
    text-transform: uppercase;
    letter-spacing: 0.04rem;
    font-size: 1.2rem;
    font-family: var(--font-emphasis);
    font-weight: 600;
    margin: 0;
  }

  a{
    height: 20px;
  }
`

const Navbar = ({ title, link, overview }) => {
  return (
    <Bar>
      {overview ? <h1>{title}</h1> : <p>{title}</p>}
      {!overview &&
      <Link to={link}>
        <Close />
      </Link>}
    </Bar>
  )
}

export default Navbar
