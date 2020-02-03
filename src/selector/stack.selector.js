import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import find from "lodash/fp/find";
import filter from "lodash/fp/filter";
import map from "lodash/fp/map";

import { fromProps } from "/src/util/selector.util";

import { stack as stackState } from "./root.selector";

export const allStackIdsByLaneId = createSelector(
  fromProps(get("laneId")),
  stackState,
  (laneId, state) =>
    flow([get("allStacks"), filter({ laneId }), map(get("id"))])(state)
);

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

export const stackCardByCardId = createSelector(
  fromProps(get("cardId")),
  stackById,
  (cardId, stack) => flow([get("cards"), find({ id: cardId })])(stack)
);

export const stackCardCountByCardId = createSelector(
  stackCardByCardId,
  get("count")
);

export const stackCardCollapsedCardId = createSelector(
  stackCardByCardId,
  get("collapsed")
);
