import flow from "lodash/fp/flow";
import toLower from "lodash/fp/toLower";
import trim from "lodash/fp/trim";

import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";
import { encode } from "/src/util/base64.util";

export const ADD = "CARD/ADD";
export const UPDATE = "CARD/UPDATE";
export const RESTORE = "CARD/RESTORE";

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

export const update = createPromisedAction(
  UPDATE,
  ["id", ...cardDetailAttrNames],
  invoke
);

export const restore = createPromisedAction(
  RESTORE,
  ["id", ...cardDetailAttrNames],
  invoke
);
