import React, { Fragment, useEffect } from 'react'
import styled from 'styled-components'
import Pad from './ui/Pad'
import { startAIMoves, makeGuess } from '../actions'
import { connect } from 'react-redux'
import sleep from '../helpers/sleep'
import { GAME_DELAY_TIME } from '../helpers/constants'

const BoardRow = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 50%;
  width: 100%;
`

function Board (props) {
  const { pads, startAIMoves } = props

  function onPadClick ({ id }) {
    const { ai, guessed, gameFinished, makeGuess } = props
    const tail = guessed.length
    const succeeded = ai[tail] === id
    if (!gameFinished) {
      makeGuess({ id, succeeded })
    }
  }

  useEffect(() => {
    sleep(GAME_DELAY_TIME).then(() => {
      startAIMoves()
    })
  }, [])

  return (
    <Fragment>
      <BoardRow>
        {pads.slice(0, 2).map((pad, i) => (
          <Pad
            key={i}
            active={pad.active}
            color={pad.id}
            url={pad.url}
            onClick={_ => onPadClick({ id: pad.id })}
          />
        ))}
      </BoardRow>
      <BoardRow>
        {pads.slice(2, 4).map((pad, i) => (
          <Pad
            key={i}
            active={pad.active}
            color={pad.id}
            url={pad.url}
            onClick={_ => onPadClick({ id: pad.id })}
          />
        ))}
      </BoardRow>
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    ...state.player,
    pads: state.game.pads,
    gameFinished: state.game.gameFinished
  }
}

export default connect(
  mapStateToProps,
  {
    startAIMoves,
    makeGuess
  }
)(Board)
