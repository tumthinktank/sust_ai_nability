
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