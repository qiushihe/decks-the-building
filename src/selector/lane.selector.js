import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";

import { fromProps } from "/src/util/selector.util";

import { lane as laneState } from "./root.selector";

export const landById = createSelector(
  fromProps(get("laneId")),
  laneState,
  (laneId, state) => get(`allLanes.${laneId}`)(state)
);

export const landLabel = createSelector(landById, get("label"));

export const laneStackIds = createSelector(
  landById,
  flow([get("stacks"), map(get("id"))])
);
