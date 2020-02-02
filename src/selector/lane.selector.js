import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import values from "lodash/fp/values";
import uniq from "lodash/fp/uniq";
import compact from "lodash/fp/compact";
import reduce from "lodash/fp/reduce";
import includes from "lodash/fp/includes";

import { lane } from "./root.selector";
import { allStacks } from "./stack.selector";

export const allLanes = createSelector(lane, flow([get("allLanes"), values]));

export const allEmptyLanes = createSelector(
  allStacks,
  allLanes,
  (stacks, lanes) => {
    const stackLaneIds = flow([map(get("laneId")), uniq, compact])(stacks);

    return reduce((result, lane) => {
      const { id: laneId } = lane;
      return includes(laneId)(stackLaneIds) ? result : [...result, lane];
    }, [])(lanes);
  }
);
