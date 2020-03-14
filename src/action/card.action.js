import map from "lodash/fp/map";

import { createPromisedAction } from "/src/util/action.util";
import { invoke, invokeWith, pickArray } from "/src/util/function.util";
import { encodeCardName } from "/src/util/card.util";

export const ADD = "CARD/ADD";

export const SET_CARD_NAMES = "CARD/SET_CARD_NAMES";
export const SET_CARD_SYMBOLS = "CARD/SET_CARD_SYMBOLS";
export const SET_CARDS_DETAIL = "CARD/SET_CARDS_DETAIL";

export const ADD_FAILED_CARD_IDS = "CARD/ADD_FAILED_CARD_IDS";

export const CARD_DETAIL_ATTRIBUTES = [
  "layout",
  "colorIdentity",
  "manaCost",
  "typeLine",
  "imageUrls"
];

export const add = createPromisedAction(
  ADD,
  ["names"],
  invokeWith(({ names }) => ({
    cards: map(name => ({
      id: encodeCardName(name),
      name
    }))(names)
  }))
);

export const setCardNames = createPromisedAction(
  SET_CARD_NAMES,
  ["names"],
  invoke
);

export const setCardSymbols = createPromisedAction(
  SET_CARD_SYMBOLS,
  ["symbols"],
  invoke
);

export const setCardsDetail = createPromisedAction(
  SET_CARDS_DETAIL,
  pickArray(["id", "name", ...CARD_DETAIL_ATTRIBUTES]),
  invoke
);

export const addFailedCardIds = createPromisedAction(
  ADD_FAILED_CARD_IDS,
  ["ids"],
  invoke
);
