import React, { Fragment } from 'react'
import styled from 'styled-components'
import Pad from './ui/Pad'

const BoardRow = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 50%;
  width: 100%;
`

function Board () {
  return (
    <Fragment>
      <BoardRow>
        <Pad color='blue' />
        <Pad color='red' />
      </BoardRow>
      <BoardRow>
        <Pad color='green' />
        <Pad color='yellow' />
      </BoardRow>
    </Fragment>
  )
}

export default Board
