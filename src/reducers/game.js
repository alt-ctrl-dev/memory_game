import { START_GAME, NEXT_LEVEL, FETCH_NAMES } from "../helpers/constants";
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
  ],
  match: {
    guessed: [],
    all: []
  }
};

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

export default function game(state = initialState, { type, payload }) {
  console.log("type", type);
  console.log("payload", payload);
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
        }/${item.name}.svg?options[mood][]=happy`;
      });
      return {
        ...tempState
      };
    }

    default:
      return state;
  }
}
