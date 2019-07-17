/* eslint-env jest */
import * as types from '../../src/helpers/constants'
import reducer from '../../src/reducers'
import { initialState } from '../../__fixtures__'

describe('player reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  })

  it('should handle START_GAME', () => {
    let next = 'red'
    let newState = reducer(undefined, {
      type: types.START_GAME,
      payload: { next }
    })
    let expectedState = Object.create(initialState)
    expectedState.player.ai.push(next)
    expect(newState.player).toMatchObject(expectedState.player)
  })

  it('should handle NEXT_LEVEL', () => {
    let nextID = 'red'
    let latestState = Object.create(initialState)
    latestState.player.ai.push(nextID)
    let newState = reducer(latestState, {
      type: types.NEXT_LEVEL,
      payload: { nextID }
    })
    latestState.player.ai.push(nextID)
    expect(newState.player.ai).toMatchObject(latestState.player.ai)
  })

  it('should handle GUESS_COLOR for unsucessful guess', () => {
    let id = 'red'
    let succeeded = false
    let newState = reducer(initialState, {
      type: types.GUESS_COLOR,
      payload: { id, succeeded }
    })

    let expectedState = Object.create(initialState)
    expectedState.player.guessed.push(id)
    expect(newState.player.guessed).toMatchObject(expectedState.player.guessed)
  })

  it('should handle GUESS_COLOR for sucessful guess', () => {
    let id = 'red'
    let succeeded = true
    let newState = reducer(initialState, {
      type: types.GUESS_COLOR,
      payload: { id, succeeded }
    })

    let expectedState = Object.create(initialState)
    expectedState.player.guessed.push(id)
    expect(newState.player.guessed).toMatchObject(expectedState.player.guessed)
  })
})
