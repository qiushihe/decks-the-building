import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import values from "lodash/fp/values";

import { stack } from "./root.selector";

export const allStacks = createSelector(
  stack,
  flow([get("allStacks"), values])
);
