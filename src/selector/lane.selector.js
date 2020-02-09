import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import size from "lodash/fp/size";

import { fromProps } from "/src/util/selector.util";

import { lane as laneState } from "./root.selector";

export const laneById = createSelector(
  fromProps(get("laneId")),
  laneState,
  (laneId, state) => get(`allLanes.${laneId}`)(state)
);

export const laneLabel = createSelector(laneById, get("label"));

export const laneStackIds = createSelector(
  laneById,
  flow([get("stacks"), map(get("id"))])
);

export const laneStacksCount = createSelector(laneStackIds, size);
