import { START_GAME, GUESS_COLOR, NEXT_LEVEL } from "../helpers/constants";
// GUESS_COLOR, NEXT_LEVEL,
export const initialState = {
  player: [],
  ai: []
};

export default function player(state = initialState, { type, payload }) {
  switch (type) {
    case START_GAME:
      return {
        guessed: [],
        ai: [payload.next]
      };

    case GUESS_COLOR:
      return {
        ...state,
        guessed: payload.succeeded
          ? state.guessed.concat(payload.id)
          : state.guessed
      };

    case NEXT_LEVEL:
      const ai = [...state.ai, payload.nextID];
      return {
        ...state,
        ai,
        guessed: []
      };

    // case FETCH_NAMES: {
    //   let tempState = { ...state };

    //   payload.forEach((item, index) => {
    //     tempState.pads[index].name = `${item.name} from ${item.region}`;
    //     tempState.pads[index].url = `https://avatars.dicebear.com/v2/${
    //       item.gender
    //     }/${item.name}.svg?options[mood][]=happy`;
    //   });
    //   return {
    //     ...tempState
    //   };
    // }

    default:
      return state;
  }
}
