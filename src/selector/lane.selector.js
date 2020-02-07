import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import values from "lodash/fp/values";
import isEmpty from "lodash/fp/isEmpty";
import negate from "lodash/fp/negate";

import { fromProps } from "/src/util/selector.util";

import { lane as laneState } from "./root.selector";

export const hasLanes = createSelector(
  laneState,
  flow([get("allLanes"), values, negate(isEmpty)])
);

export const allLaneIds = createSelector(
  laneState,
  flow([get("allLanes"), values, map(get("id"))])
);

export const landById = createSelector(
  fromProps(get("laneId")),
  laneState,
  (laneId, state) => flow([get("allLanes"), get(laneId)])(state)
);

export const landLabel = createSelector(landById, get("label"));

export const laneStackIds = createSelector(
  landById,
  flow([get("stacks"), map(get("id"))])
);
