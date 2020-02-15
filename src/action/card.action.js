import map from "lodash/fp/map";

import { createPromisedAction } from "/src/util/action.util";
import { invoke, invokeWith } from "/src/util/function.util";
import { encodeCardName } from "/src/util/card.util";

export const ADD = "CARD/ADD";
export const RESTORE = "CARD/RESTORE";

export const RESTORE_CARD_NAMES = "CARD/RESTORE_CARD_NAMES";

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

export const restore = createPromisedAction(
  RESTORE,
  [
    "id",
    "name",
    "manaCost",
    "convertedManaCost",
    "typeLine",
    "oracleText",
    "flavorText",
    "imageUrl"
  ],
  invoke
);

export const restoreCardNames = createPromisedAction(
  RESTORE_CARD_NAMES,
  ["names"],
  invoke
);
