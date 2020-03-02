import map from "lodash/fp/map";

import { createPromisedAction } from "/src/util/action.util";
import { invoke, invokeWith } from "/src/util/function.util";
import { encodeCardName } from "/src/util/card.util";

export const ADD = "CARD/ADD";

export const SET_CARD_DETAIL = "CARD/SET_CARD_DETAIL";
export const SET_CARD_NAMES = "CARD/SET_CARD_NAMES";
export const SET_CARD_SYMBOLS = "CARD/SET_CARD_SYMBOLS";

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

export const setCardDetail = createPromisedAction(
  SET_CARD_DETAIL,
  ["id", "name", ...CARD_DETAIL_ATTRIBUTES],
  invoke
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
