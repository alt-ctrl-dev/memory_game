import { START_GAME, NEXT_LEVEL } from "../helpers/constants";
//GUESS_COLOR, NEXT_LEVEL,
export const initialState = {
  gameFinished: false,
  gameStarted: false,
  score: 0
};

export default function game(state = initialState, action) {
  const { type, payload } = action;
  console.log("payload", payload);
  console.log("type", type);
  switch (type) {
    case START_GAME:
      return {
        ...state,
        gameStarted: true,
        gameFinished: false,
        score: 0
      };

    case NEXT_LEVEL:
      return {
        ...state,
        score: state.score + 1
      };

    default:
      return state;
  }
}
