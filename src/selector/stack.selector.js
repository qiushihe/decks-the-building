import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";
import map from "lodash/fp/map";
import size from "lodash/fp/size";
import sum from "lodash/fp/sum";
import filter from "lodash/fp/filter";
import includes from "lodash/fp/includes";
import flatten from "lodash/fp/flatten";

import { fromProps } from "/src/util/selector.util";

import { stack as stackState } from "./root.selector";

export const stackById = createSelector(
  fromProps(get("stackId")),
  stackState,
  (stackId, state) => flow([get("allStacks"), get(stackId)])(state)
);

export const stacksByIds = createSelector(
  fromProps(get("stackIds")),
  stackState,
  (stackIds, state) =>
    flow([get("allStacks"), filter(({ id }) => includes(id)(stackIds))])(state)
);

export const stackLabel = createSelector(stackById, get("label"));

export const stackCardIds = createSelector(
  stackById,
  flow([get("cards"), map(get("id"))])
);

export const stackCardsCount = createSelector(
  stackById,
  flow([get("cards"), map(getOr(0, "count")), sum])
);

export const stacksCardsCount = createSelector(
  stacksByIds,
  flow([map(get("cards")), flatten, map(getOr(0, "count")), sum])
);

// Note: This is NOT supposed to be unique, and it's
// supposed to count just the number of entries in the
// stack's `cards` array.
export const stackCardEntries = createSelector(stackById, get("cards"));

// Note: This is NOT supposed to be unique card count,
// and it's supposed to count just the number of entries
// in the stack's `cards` array.
export const stackCardEntriesCount = createSelector(stackCardEntries, size);

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

export const stackCardImageIndexByCardIndex = createSelector(
  stackCardByCardIndex,
  get("imageIndex")
);
