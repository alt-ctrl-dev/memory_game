import React from 'react'
import styled from 'styled-components'

const ScoreBlock = styled.p`
  font-size: 1.25em;
  text-align: center;
  margin: 10px auto;
`

function Score ({ score = 0 }) {
  return <ScoreBlock>Score {score}</ScoreBlock>
}

export default Score
