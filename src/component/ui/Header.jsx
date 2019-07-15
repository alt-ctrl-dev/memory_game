import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #fff;
`

function Header ({ children }) {
  return <Title>{children}</Title>
}

export default Header
