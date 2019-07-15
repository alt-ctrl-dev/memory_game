import styled from 'styled-components'
import React from 'react'

const InnerButton = styled.button`
  padding: 0.25em 1em;
  cursor: pointer;
  transition: 0.3s;
  outline: none;
  text-decoration: none;
  background-color: "#e0e0e0"
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);
  padding: 6px 16px;
  font-size: 0.875rem;
  min-width: 64px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
`

const Button = ({ children, onClick }) => {
  return <InnerButton onClick={onClick}>{children}</InnerButton>
}

export default Button
