import createAction from '../helpers/actioncreator'
import { START_GAME, NEXT_LEVEL, FETCH_NAMES } from '../helpers/constants'
import uiname from '../apis/uinames'

const start = createAction(START_GAME)
export const startGame = () => start()

const next = createAction(NEXT_LEVEL)
export const nextLevel = () => next()

const fetch = createAction(FETCH_NAMES)
export const fetchNames = () => async dispatch => {
  let response = {}
  try {
    response = await uiname.get('/?amount=4')
    response = response.data
  } catch (error) {}
  dispatch(fetch(response))
}
// export const nextLevel = payload => next({});
