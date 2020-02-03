import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const CREATE = "STACK/CREATE";
export const ADD_CARD = "STACK/ADD_CARD";
export const TOGGLE_CARD = "STACK/TOGGLE_CARD";

export const create = createPromisedAction(
  CREATE,
  ["id", "laneId", "label"],
  invoke
);

export const addCard = createPromisedAction(ADD_CARD, ["id", "cardId"], invoke);

export const toggleCard = createPromisedAction(
  TOGGLE_CARD,
  ["id", "cardId"],
  invoke
);
