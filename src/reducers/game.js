import {
  START_GAME,
  NEXT_LEVEL,
  FETCH_NAMES,
  PAD_LIT,
  PAD_UNLIT,
  GUESS_COLOR
} from "../helpers/constants";
// GUESS_COLOR, NEXT_LEVEL,
export const initialState = {
  gameFinished: false,
  gameStarted: false,
  score: 0,
  pads: [
    {
      id: "green",
      active: false,
      name: "",
      url: ""
    },
    {
      id: "red",
      active: false,
      name: "",
      url: ""
    },
    {
      id: "blue",
      active: false,
      name: "",
      url: ""
    },
    {
      id: "yellow",
      active: false,
      name: "",
      url: ""
    }
  ]
};

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

export default function game(state = initialState, { type, payload }) {
  console.log("GAME type", type);
  console.log("GAME payload", payload);
  console.log("GAME state", state);
  switch (type) {
    case START_GAME: {
      let tempState = { ...state };
      shuffle(tempState.pads);
      return {
        ...tempState,
        gameStarted: true,
        gameFinished: false,
        score: 0
      };
    }
    case NEXT_LEVEL:
      return {
        ...state,
        score: state.score + 1
      };

    case FETCH_NAMES: {
      let tempState = { ...state };

      payload.forEach((item, index) => {
        tempState.pads[index].name = `${item.name} from ${item.region}`;
        tempState.pads[index].url = `https://avatars.dicebear.com/v2/${
          item.gender
        }/${encodeURIComponent(item.name)}.svg?options[mood][]=happy`;
      });
      return {
        ...tempState
      };
    }

    case PAD_LIT: {
      const pads = state.pads.map(b => ({
        ...b,
        active: payload.id === b.id
      }));
      return { ...state, pads };
    }

    case PAD_UNLIT: {
      const pads = state.pads.map(b => ({
        ...b,
        active: false
      }));
      return { ...state, pads };
    }

    case GUESS_COLOR: {
      return {
        ...state,
        gameFinished: !payload.succeeded
      };
    }

    default:
      return state;
  }
}
