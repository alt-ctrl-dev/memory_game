import { START_GAME, GUESS_COLOR, NEXT_LEVEL } from '../helpers/constants'
// GUESS_COLOR, NEXT_LEVEL,
export const initialState = {
  player: [],
  ai: []
}

export default function player (state = initialState, { type, payload }) {
  switch (type) {
    case START_GAME:
      return {
        guessed: [],
        ai: [payload.next]
      }

    case GUESS_COLOR:
      return {
        ...state,
        guessed: payload.succeeded
          ? state.guessed.concat(payload.id)
          : state.guessed
      }

    case NEXT_LEVEL:
      const ai = [...state.ai, payload.nextID]
      return {
        ...state,
        ai,
        guessed: []
      }

    default:
      return state
  }
}
