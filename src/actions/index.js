import createAction from "../helpers/actioncreator";
import { START_GAME, NEXT_LEVEL } from "../helpers/constants";

const start = createAction(START_GAME);
export const startGame = () => start();

const next = createAction(NEXT_LEVEL);
export const nextLevel = () => next();
// export const nextLevel = payload => next({});
