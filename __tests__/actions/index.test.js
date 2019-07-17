/* eslint-env jest */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as types from '../../src/helpers/constants'
import * as actions from '../../src/actions/index'
import reducer from '../../src/reducers'
import { randomNames } from '../../__fixtures__'
import moxios from 'moxios'
import axios from 'axios'

const createStore = configureMockStore([thunk])
const state = reducer({}, {})

describe('async actions', () => {
  let axiosInstance
  beforeEach(function () {
    // import and pass your custom axios instance to this method
    axiosInstance = axios.create()
    moxios.install()
  })

  afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall(axiosInstance)
  })
  it('fetches random names', done => {
    moxios.stubRequest('https://uinames.com/api/?amount=4', {
      status: 200,
      response: randomNames
    })

    const expectedActions = [{ type: types.FETCH_NAMES, payload: randomNames }]
    const store = createStore({})

    store
      .dispatch(actions.fetchNames())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
      .catch(e => console.error(`Error while testing fetchNames: ${e}`))
  })
})

describe('game actions', () => {
  it('should create an action to a start game', () => {
    const next = 'blue'
    const expectedAction = {
      type: types.START_GAME,
      payload: {
        next
      }
    }
    expect(actions.startGame(next)).toEqual(expectedAction)
  })

  it('should create an action for the next move', () => {
    const nextID = 'blue'
    const expectedAction = {
      type: types.NEXT_LEVEL,
      payload: {
        nextID
      }
    }
    expect(actions.nextLevel(nextID)).toEqual(expectedAction)
  })

  it('should create and dispatch action to start AI moves', done => {
    const id = 'red'
    const ai = [id]
    const { player } = state

    const store = createStore({
      ...state,
      player: {
        ...player,
        ai
      }
    })
    const expected = [
      { type: types.PAD_LIT, payload: { id } },
      { type: types.PAD_UNLIT, payload: {} }
    ]

    store
      .dispatch(actions.startAIMoves())
      .then(response => {
        expect(store.getActions()).toEqual(expected)
        done()
      })
      .catch(e => console.error(`Error while testing startAIMoves: ${e}`))
  })

  it('should create and dispatch action when making correct guesses', done => {
    const id = 'red'
    const succeeded = true
    const ai = [id]
    const guessed = [id]
    const { player } = state

    const store = createStore({
      ...state,
      player: {
        ...player,
        ai,
        guessed
      }
    })

    const expected = [
      {
        payload: {
          id,
          succeeded
        },
        type: types.GUESS_COLOR
      },
      {
        payload: {
          id
        },
        type: types.PAD_LIT
      },
      {
        payload: {},
        type: types.PAD_UNLIT
      },
      {
        payload: {
          nextID: 'yellow'
        },
        type: types.NEXT_LEVEL
      },
      {
        payload: {
          id
        },
        type: types.PAD_LIT
      }
    ]

    store
      .dispatch(actions.makeGuess({ succeeded, id }))
      .then(response => {
        store.getActions().forEach((action, index) => {
          if (action.type === types.NEXT_LEVEL) {
            expect(action.payload).toHaveProperty('nextID')
          } else expect(action).toEqual(expected[index])
        })

        done()
      })
      .catch(e => console.error(`Error while testing makeGuess: ${e}`))
  })

  it('should create and dispatch action when making incorrect guesses', done => {
    const id = 'red'
    const succeeded = false
    const ai = [id]
    const guessed = ['blue']
    const { player } = state

    const store = createStore({
      ...state,
      player: {
        ...player,
        ai,
        guessed
      }
    })
    const expected = [
      {
        payload: {
          id,
          succeeded
        },
        type: types.GUESS_COLOR
      },
      {
        payload: {
          id
        },
        type: types.PAD_LIT
      },
      {
        payload: {},
        type: types.PAD_UNLIT
      }
    ]

    store
      .dispatch(actions.makeGuess({ succeeded, id }))
      .then(response => {
        expect(store.getActions()).toEqual(expected)
        done()
      })
      .catch(e => console.error(`Error while testing makeGuess: ${e}`))
  })
})
