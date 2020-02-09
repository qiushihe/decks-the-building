import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import size from "lodash/fp/size";

import { fromProps } from "/src/util/selector.util";

import { stack as stackState } from "./root.selector";

export const stackById = createSelector(
  fromProps(get("stackId")),
  stackState,
  (stackId, state) => flow([get("allStacks"), get(stackId)])(state)
);

export const stackLabel = createSelector(stackById, get("label"));

export const stackCardIds = createSelector(
  stackById,
  flow([get("cards"), map(get("id"))])
);

// Note: This is NOT supposed to be unique card count,
//       and it's supposed to count just the number of
//       entries in the stack's `cards` array.
export const stackCardEntriesCount = createSelector(stackCardIds, size);

export const stackCardByCardIndex = createSelector(
  fromProps(get("cardIndex")),
  stackById,
  (cardIndex, stack) => get(`cards.${cardIndex}`)(stack)
);

export const stackCardCountByCardIndex = createSelector(
  stackCardByCardIndex,
  get("count")
);

export const stackCardCollapsedByCardIndex = createSelector(
  stackCardByCardIndex,
  get("collapsed")
);
