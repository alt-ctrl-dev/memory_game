import React from 'react'
import styled from 'styled-components'

const ScoreBlock = styled.p`
  font-size: 1.25em;
  text-align: center;
  margin: 0px;
  color: #fff;
`

function Score ({ score = 0 }) {
  return <ScoreBlock>Score {score}</ScoreBlock>
}

export default Score
