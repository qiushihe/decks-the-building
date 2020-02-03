import flow from "lodash/fp/flow";
import toLower from "lodash/fp/toLower";
import trim from "lodash/fp/trim";

import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";
import { encode } from "/src/util/base64.util";

export const ADD = "CARD/ADD";
export const RESTORE_FROM_CACHE = "CARD/RESTORE_FROM_CACHE";
export const RESTORE_FROM_S3 = "CARD/RESTORE_FROM_S3";
export const RESTORE_FROM_SCRYFALL = "CARD/RESTORE_FROM_SCRYFALL";

export const add = createPromisedAction(ADD, ["name"], (dispatchMe, { name }) =>
  dispatchMe({
    id: flow([trim, toLower, encode])(name)
  })
);

const cardDetailAttrNames = [
  "name",
  "manaCost",
  "convertedManaCost",
  "typeLine",
  "oracleText",
  "flavorText",
  "imageUrl"
];

export const restoreFromCache = createPromisedAction(
  RESTORE_FROM_CACHE,
  ["id", ...cardDetailAttrNames],
  invoke
);

export const restoreFromS3 = createPromisedAction(
  RESTORE_FROM_S3,
  ["id", ...cardDetailAttrNames],
  invoke
);

export const restoreFromScryfall = createPromisedAction(
  RESTORE_FROM_SCRYFALL,
  ["id", ...cardDetailAttrNames],
  invoke
);
