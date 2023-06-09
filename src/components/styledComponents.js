import styled from "styled-components"
import { device } from "../utils/device"

export const Label = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1rem;
  font-size: 0.7rem;
  font-weight: 600;
  font-family: var(--fontFamily-emphasis);
  display: inline-block;
  margin-top: 0.3rem;
`

export const PostGrid = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`

export const Post = styled.li`
  position: relative;

  h2 {
    text-transform: none;
    letter-spacing: 0;
    font-weight: 600;
    font-family: var(--font-emphasis);
    margin: 2rem 0 0.5rem;

    a::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      cursor: pointer;
      top: 0;
      left: 0;
    }
  }
`
