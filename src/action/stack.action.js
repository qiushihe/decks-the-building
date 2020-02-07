import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const CREATE = "STACK/CREATE";
export const ADD_CARDS = "STACK/ADD_CARDS";
export const TOGGLE_CARDS = "STACK/TOGGLE_CARDS";
export const MOVE_CARD = "STACK/MOVE_CARD";

export const create = createPromisedAction(
  CREATE,
  ["id", "label"],
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

export const moveCard = createPromisedAction(
  MOVE_CARD,
  ["fromId", "toId", "fromCardIndex", "toCardIndex"],
  invoke
);
