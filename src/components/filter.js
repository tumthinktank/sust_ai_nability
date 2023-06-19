import React, { useState } from "react"
import styled from "styled-components"

const FilterWrapper = styled.div`
  position: relative;
  flex: 33% 0 0;
  flex-wrap: wrap;
  width: 100%;
`

const Button = styled.button`
  border-radius: 1.2rem;
  font-size: 0.8rem;
  padding: 0.2rem 1rem;
  line-height: 1rem;
  background: none;
  box-shadow: none;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ isActive }) =>
    isActive ? "var(--color-primary)" : "black"};

  span:first-child{
    height: 1rem;
    text-align: left;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

}
`

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  list-style: none;
  border: 1px solid black;
  border-radius: 4px;
  padding: 0.5rem;
  margin: 0;
  z-index: 1;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 0;

  li {
    margin: 0;
    div {
      font-size: 0.8rem;
      margin: 0;
      padding: 0.2rem 1rem;

      &.clear {
        opacity: 0.5;
        font-style: italic;
      }

      &.clear:hover {
        opacity: 1;
        font-style: italic;
        background: var(--color-primary);
      }

      &:hover {
        background: var(--color-light);
      }
    }
  }
`

const Icon = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid black;
  margin-left: 0.5rem;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.3s ease;
`

const Filter = ({
  children,
  label = "Please select",
  isActive,
  handleClick,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <FilterWrapper>
      <Button onClick={toggleDropdown} isActive={isActive}>
        <span>{label}</span>
        <Icon isOpen={isOpen} />
      </Button>
      {isOpen && (
        <DropdownList onClick={toggleDropdown} onKeyPress={toggleDropdown}>
          <Item onClick={() => handleClick(false)} clear>
            Clear selection
          </Item>
          {children}
        </DropdownList>
      )}
    </FilterWrapper>
  )
}

export default Filter

export const Item = ({ children, onClick, clear, tabindex }) => (
  <li>
    <div
      role="button"
      tabindex={0}
      className={clear && "clear"}
      onClick={onClick}
      onKeyPress={onClick}
    >
      {children}
    </div>
  </li>
)
