/* eslint-env jest */
import * as types from '../../src/helpers/constants'
import reducer from '../../src/reducers'
import { initialState, randomNames } from '../../__fixtures__'

describe('game reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  })

  it('should handle START_GAME', () => {
    let next = 'red'
    let newState = reducer(undefined, {
      type: types.START_GAME,
      payload: { next }
    })
    expect(newState.game.gameStarted).toEqual(true)
    expect(newState.game.gameFinished).toEqual(false)
    expect(newState.game.score).toEqual(0)
  })

  it('should handle NEXT_LEVEL', () => {
    let expectedState = Object.create(initialState)
    expectedState.game.score = expectedState.game.score + 1
    expect(
      reducer(undefined, {
        type: types.NEXT_LEVEL,
        payload: {}
      })
    ).toMatchObject(expectedState)
  })

  it('should handle FETCH_NAMES', () => {
    let newState = reducer(initialState, {
      type: types.FETCH_NAMES,
      payload: randomNames
    })
    let expectedState = Object.create(initialState)
    randomNames.forEach((item, index) => {
      expectedState.game.pads[index].name = `${item.name} from ${item.region}`
      expectedState.game.pads[index].url = `https://avatars.dicebear.com/v2/${
        item.gender
      }/${encodeURIComponent(item.name)}.svg?options[mood][]=happy`
    })
    expect(newState.game.pads).toMatchObject(expectedState.game.pads)
  })

  it('should handle PAD_LIT and PAD_UNLIT', () => {
    const id = 'green'
    let newState = reducer(initialState, {
      type: types.PAD_LIT,
      payload: { id }
    })
    let expectedState = Object.create(initialState)
    expectedState.game.pads.forEach(pad => {
      if (pad.id === id) pad.active = true
    })

    expect(newState.game.pads).toMatchObject(expectedState.game.pads)

    newState = reducer(initialState, {
      type: types.PAD_UNLIT,
      payload: {}
    })
    expectedState.game.pads.forEach(pad => {
      if (pad.id === id) pad.active = false
    })
    expect(newState.game.pads).toMatchObject(expectedState.game.pads)
  })

  it('should handle GUESS_COLOR', () => {
    const succeeded = false
    let newState = reducer(initialState, {
      type: types.GUESS_COLOR,
      payload: { succeeded }
    })
    let expectedState = Object.create(initialState)
    expectedState.game.gameFinished = !succeeded

    expect(newState.game).toMatchObject(expectedState.game)
  })
})
