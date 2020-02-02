import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
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

export const stackCardIds = createSelector(stackById, get("cardIds"));
