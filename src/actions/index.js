import createAction from "../helpers/actioncreator";
import {
  START_GAME,
  NEXT_LEVEL,
  FETCH_NAMES,
  GAME_DELAY_TIME,
  PAD_LIT,
  PAD_UNLIT,
  GUESS_COLOR,
  REDUCED_DELAY_TIME,
  NEXT_LEVEL_DELAY_TIME
} from "../helpers/constants";
import uiname from "../apis/uinames";
import sleep from "../helpers/sleep";

const start = createAction(START_GAME);

const next = createAction(NEXT_LEVEL);

const lightPad = createAction(PAD_LIT);
const unlightPad = createAction(PAD_UNLIT);

const guessColor = createAction(GUESS_COLOR);

const fetch = createAction(FETCH_NAMES);

export const startGame = next => start({ next });

export const nextLevel = nextID => next({ nextID });

export const fetchNames = () => async dispatch => {
  let response = {};
  try {
    response = await uiname.get("/?amount=4");
    response = response.data;
  } catch (error) {}
  dispatch(fetch(response));
};

export const startAIMoves = () => async (dispatch, getState) => {
  const state = getState();
  const { ai } = state.player;

  for (let i = 0; i <= ai.length - 1; i++) {
    const id = ai[i];
    dispatch(lightPad({ id }));
    await sleep(GAME_DELAY_TIME);
    dispatch(unlightPad());
    await sleep(GAME_DELAY_TIME);
  }
};

export const makeGuess = ({ succeeded, id }) => async (dispatch, getState) => {
  console.log("makeGuess", succeeded, id);
  dispatch(guessColor({ succeeded, id }));
  dispatch(lightPad({ id }));
  await sleep(REDUCED_DELAY_TIME);
  dispatch(unlightPad());
  await sleep(REDUCED_DELAY_TIME);

  const { player, game } = getState();
  const { ai, guessed } = player;
  const { pads } = game;
  const done = ai.length === guessed.length && succeeded;
  if (done) {
    console.log("Yup done!");
    const { id } = pads[Math.floor(Math.random() * pads.length)];
    dispatch(nextLevel(id));
    await sleep(NEXT_LEVEL_DELAY_TIME);
    dispatch(startAIMoves());
  }
  //   return new Promise(r => r({ done }));
};
