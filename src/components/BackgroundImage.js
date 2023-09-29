import React from "react"
import styled from "styled-components"

import { device } from "../utils/device"

import cubus from "../images/Cubus.png"
import cubusOverlay from "../images/Cubus-overlay.png"

const BackgroundStyles = `
background-repeat: no-repeat;
background-position-y: calc(100vh-15rem);
background-size: 100vw auto;
background-attachment: none;

@media ${device.tablet} {
  background-repeat: no-repeat;
  background-position-y: 0;
  background-position-x: calc(100% - 15rem);
  background-size: auto clamp(600px, 100vh, 800px);
  background-attachment: fixed;
}
`

const BGImage = styled.div`
  display: none;
  pointer-events: none;

  @media ${device.tablet} {
    display: block;
    position: absolute;
    width: calc(100% + 4rem);
    height: calc(100% + 4rem);
    top: -2rem;
    left: -4rem;

    ${BackgroundStyles};
    background-image: url(${cubus});

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 2s ease-out; /* Adjust the transition duration as desired */
      pointer-events: none;

      ${BackgroundStyles};
      background-image: url(${cubusOverlay});
    }

    &:hover::after {
      opacity: 1;
    }
  }
`

const BackgroundImage = () => <BGImage />

export default BackgroundImage
