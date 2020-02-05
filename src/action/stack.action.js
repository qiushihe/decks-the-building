import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const CREATE = "STACK/CREATE";
export const ADD_CARDS = "STACK/ADD_CARDS";
export const TOGGLE_CARDS = "STACK/TOGGLE_CARDS";

export const create = createPromisedAction(
  CREATE,
  ["id", "laneId", "label"],
  invoke
);

export const addCards = createPromisedAction(
  ADD_CARDS,
  ["id", "cardIds"],
  invoke
);

export const toggleCards = createPromisedAction(
  TOGGLE_CARDS,
  ["id", "cardIndices"],
  invoke
);
