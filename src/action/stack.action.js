import { createPromisedAction } from "/src/util/action.util";
import { invoke, invokeWith } from "/src/util/function.util";

export const CREATE = "STACK/CREATE";
export const REMOVE = "STACK/REMOVE";
export const ADD_CARDS = "STACK/ADD_CARDS";
export const TOGGLE_CARDS = "STACK/TOGGLE_CARDS";
export const MOVE_CARD = "STACK/MOVE_CARD";
export const CHANGE_COPIES = "STACK/CHANGE_COPIES";

export const create = createPromisedAction(
  CREATE,
  ["id", "label", "cardIds"],
  invokeWith(({ id, label, cardIds }) => ({
    id,
    label,
    cardIds: cardIds || []
  }))
);

export const remove = createPromisedAction(REMOVE, ["ids"], invoke);

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

export const changeCopies = createPromisedAction(
  CHANGE_COPIES,
  ["id", "cardIndex", "change"],
  invoke
);
