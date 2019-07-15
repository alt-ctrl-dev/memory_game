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
        <Pad active={false} color='blue'>
          Blue
        </Pad>
        <Pad active={false} color='red'>
          Red
        </Pad>
      </BoardRow>
      <BoardRow>
        <Pad active={false} color='green'>
          Green
        </Pad>
        <Pad active={false} color='yellow'>
          Yellow
        </Pad>
      </BoardRow>
    </Fragment>
  )
}

export default Board
