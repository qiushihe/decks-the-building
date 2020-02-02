import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import filter from "lodash/fp/filter";
import map from "lodash/fp/map";

import { stack as stackState } from "./root.selector";

export const allStackIdsByLaneId = createSelector(
  (_, { laneId }) => laneId,
  stackState,
  (laneId, state) =>
    flow([get("allStacks"), filter({ laneId }), map(get("id"))])(state)
);

export const stackById = createSelector(
  (_, { stackId }) => stackId,
  stackState,
  (stackId, state) => flow([get("allStacks"), get(stackId)])(state)
);

export const stackLabel = createSelector(stackById, get("label"));

export const stackCardIds = createSelector(stackById, get("cardIds"));
