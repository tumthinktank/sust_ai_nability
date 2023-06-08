import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import { device } from "../utils/device"
import Logo from "../assets/Logo.svg"

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  @media ${device.tablet} {
    flex-direction: row;
    height: auto;
  }
`

const Header = styled.header`
  position: relative;
  flex: auto 0 0;

  width: 100%;
  height: 5rem;

  @media ${device.tablet} {
    height: 100vh;
    width: 12rem;
  }

  div {
    position: fixed;
    width: inherit;
    height: inherit;
    padding: 1.6rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #f2f2f2;

    @media ${device.tablet} {
      padding: 2rem 2rem;
    }
  }

  svg {
    width: 100%;
    height: fit-content;
  }

  .blurb {
    margin: 0;
    display: none;
    font-size: 0.8em;
    opacity: 0.8;

    @media ${device.tablet} {
      display: block;
    }
  }
`

const NavStrip = styled.div`
  position: relative;
  flex: auto 0 0;

  width: 100%;
  height: 3rem;

  @media ${device.tablet} {
    height: 100vh;
    width: 5rem;
  }

  a {
    width: 100%;
    heigth: 3rem;
    padding: 1rem;
    display: flex;
    position: fixed;
    box-shadow: ${(props) =>
      (props.active ? "none" : "0px 7px 7px #ccc inset")};
    background: white;

    text-transform: uppercase;
    letter-spacing: 0.02em;
    text-decoration: none;
    line-height: 1rem;
    font-size: 1rem;
    font-weight: 600;
    font-family: var(--fontFamily-emphasis);

    @media ${device.tablet} {
      writing-mode: sideways-lr;
      padding: 2rem;
      height: 100vh;
      width: 5rem;
      box-shadow: ${(props) =>
        (props.active ? "none" : "7px 0px 7px #ccc inset")};
    }
  }
`

// background: ${(props) =>(props.isRootPath ? "red" : "blue")};

const Content = styled.main`
  box-shadow: ${(props) =>
    (props.isRootPath ? "none" : "0px 7px 7px #ccc inset")};

  padding: 1rem;
  flex: auto 0 1;
  overflow: scroll;

  @media ${device.tablet} {
    overflow: unset;
    flex: 1 0 calc(100vw - 33rem);
    padding: 2rem 4rem;
    box-shadow: ${(props) =>
      (props.isRootPath ? "none" : "7px 0px 7px #ccc inset")};
  }
`

const Layout = ({ location, title, children, mode = "default" }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  // console.log(location, location.pathname === rootPath)

  // let header
  //
  // if (isRootPath) {
  //   header = (
  //     <h1 className="main-heading">
  //       <Link to="/">{title}</Link>
  //     </h1>
  //   )
  // } else {
  //   header = (
  //     <Link className="header-link-home" to="/">
  //       {title}
  //     </Link>
  //   )
  // }

  return (
    <LayoutWrapper>
      {!isRootPath && (
        <Header>
          <div>
            <Link to="/">
              <Logo height="3rem" width="6rem" viewBox="0 0 272.854 47.379" />
            </Link>
            <p className="blurb">A project by TUM and Hochschule München.</p>
          </div>
        </Header>
      )}
      {mode === "default" && (
        <Content isRootPath={isRootPath}>
          <>{children}</>
        </Content>
      )}
      <NavStrip>
        <a href="/">About</a>
      </NavStrip>
      {mode === "prototype" && (
        <Content isRootPath={isRootPath}>
          <>{children}</>
        </Content>
      )}
      <NavStrip active={mode === "prototype" ? true : false}>
        <a href="/prototypes">Prototypes</a>
      </NavStrip>
      {mode === "expert" && (
        <Content isRootPath={isRootPath}>
          <>{children}</>
        </Content>
      )}
      <NavStrip active={mode === "expert" ? true : false}>
        <a href="/experts">Experts</a>
      </NavStrip>
    </LayoutWrapper>
  )
}

export default Layout
